import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Question {
  id: string;
  user_id: string;
  category_id: string | null;
  title: string;
  body: string;
  is_anonymous: boolean;
  status: string;
  upvote_count: number;
  view_count: number;
  answer_count: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string;
    avatar_url: string | null;
    is_verified_scholar: boolean;
  } | null;
  categories?: {
    name: string;
    name_ar: string | null;
    icon: string | null;
    color: string | null;
  } | null;
}

export interface Answer {
  id: string;
  question_id: string;
  scholar_id: string;
  body: string | null;
  audio_url: string | null;
  video_url: string | null;
  created_at: string;
  profiles?: {
    display_name: string;
    avatar_url: string | null;
    is_verified_scholar: boolean;
    scholar_title: string | null;
  } | null;
  questions?: {
    title: string;
    status: string;
  } | null;
}

export function useQuestions(categoryId?: string) {
  return useQuery({
    queryKey: ['questions', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('questions')
        .select(`
          *,
          categories(name, name_ar, icon, color)
        `)
        .order('created_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Fetch profiles for question authors
      const userIds = [...new Set(data.map((q) => q.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url, is_verified_scholar')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]));

      return data.map((q) => ({
        ...q,
        profiles: profileMap.get(q.user_id) || null,
      })) as Question[];
    },
  });
}

export function useQuestion(id: string) {
  return useQuery({
    queryKey: ['question', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          categories(name, name_ar, icon, color)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;

      const { data: profile } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url, is_verified_scholar')
        .eq('user_id', data.user_id)
        .single();

      return { ...data, profiles: profile } as Question;
    },
    enabled: !!id,
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: { title: string; body: string; category_id: string | null; is_anonymous: boolean }) => {
      if (!user) throw new Error('Not authenticated');
      const { data: question, error } = await supabase
        .from('questions')
        .insert({ ...data, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return question;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}

export function useAnswers(questionId: string) {
  return useQuery({
    queryKey: ['answers', questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('answers')
        .select('*')
        .eq('question_id', questionId)
        .order('created_at', { ascending: true });
      if (error) throw error;

      // Fetch scholar profiles
      const scholarIds = [...new Set(data.map((a) => a.scholar_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url, is_verified_scholar, scholar_title')
        .in('user_id', scholarIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]));

      return data.map((a) => ({
        ...a,
        profiles: profileMap.get(a.scholar_id) || null,
      })) as Answer[];
    },
    enabled: !!questionId,
  });
}

export function useCreateAnswer() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: { question_id: string; body: string; audio_url?: string; video_url?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data: answer, error } = await supabase
        .from('answers')
        .insert({ ...data, scholar_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return answer;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['answers', variables.question_id] });
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}
