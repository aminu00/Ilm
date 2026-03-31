import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Question } from './useQuestions';

export interface Bookmark {
  id: string;
  user_id: string;
  question_id: string;
  created_at: string;
  questions: Question;
}

export function useBookmarks() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['bookmarks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          *,
          questions(
            *,
            profiles!questions_user_id_fkey(display_name, avatar_url, is_verified_scholar),
            categories(name, name_ar, icon, color)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as Bookmark[];
    },
    enabled: !!user,
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (questionId: string) => {
      if (!user) throw new Error('Not authenticated');

      const { data: existing } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('question_id', questionId)
        .single();

      if (existing) {
        await supabase.from('bookmarks').delete().eq('id', existing.id);
        return false;
      } else {
        await supabase.from('bookmarks').insert({ user_id: user.id, question_id: questionId });
        return true;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
}
