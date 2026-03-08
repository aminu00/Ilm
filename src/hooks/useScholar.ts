import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useScholarProfile(userId: string) {
  return useQuery({
    queryKey: ['scholar-profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useScholarAnswers(scholarId: string) {
  return useQuery({
    queryKey: ['scholar-answers', scholarId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('answers')
        .select('*, questions(id, title, status)')
        .eq('scholar_id', scholarId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!scholarId,
  });
}

export function useScholarStats(scholarId: string) {
  return useQuery({
    queryKey: ['scholar-stats', scholarId],
    queryFn: async () => {
      const [answersRes, followersRes] = await Promise.all([
        supabase.from('answers').select('id', { count: 'exact', head: true }).eq('scholar_id', scholarId),
        supabase.from('follows').select('id', { count: 'exact', head: true }).eq('scholar_id', scholarId),
      ]);
      return {
        answers: answersRes.count ?? 0,
        followers: followersRes.count ?? 0,
      };
    },
    enabled: !!scholarId,
  });
}

export function useIsFollowing(scholarId: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['is-following', scholarId, user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', user.id)
        .eq('scholar_id', scholarId)
        .maybeSingle();
      return !!data;
    },
    enabled: !!user && !!scholarId,
  });
}

export function useToggleFollow() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ scholarId, isFollowing }: { scholarId: string; isFollowing: boolean }) => {
      if (!user) throw new Error('Not authenticated');
      if (isFollowing) {
        await supabase.from('follows').delete().eq('follower_id', user.id).eq('scholar_id', scholarId);
      } else {
        await supabase.from('follows').insert({ follower_id: user.id, scholar_id: scholarId });
      }
    },
    onSuccess: (_, { scholarId }) => {
      queryClient.invalidateQueries({ queryKey: ['is-following', scholarId] });
      queryClient.invalidateQueries({ queryKey: ['scholar-stats', scholarId] });
    },
  });
}
