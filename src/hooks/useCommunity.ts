import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Community {
  id: string;
  name: string;
  name_ar: string | null;
  description: string | null;
  icon: string;
  color: string;
  created_by: string;
  is_active: boolean;
  created_at: string;
  post_count?: number;
}

export interface CommunityPost {
  id: string;
  community_id: string;
  user_id: string;
  body: string;
  created_at: string;
  profile?: {
    display_name: string;
    avatar_url: string | null;
    is_verified_scholar: boolean;
  };
  like_count: number;
  is_liked: boolean;
}

export function useCommunities() {
  return useQuery({
    queryKey: ['communities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;

      // Get post counts
      const ids = data.map((c: any) => c.id);
      const { data: posts } = await supabase
        .from('community_posts')
        .select('community_id')
        .in('community_id', ids);

      const countMap = new Map<string, number>();
      posts?.forEach((p: any) => {
        countMap.set(p.community_id, (countMap.get(p.community_id) || 0) + 1);
      });

      return data.map((c: any) => ({ ...c, post_count: countMap.get(c.id) || 0 })) as Community[];
    },
  });
}

export function useCommunityPosts(communityId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['community-posts', communityId],
    queryFn: async () => {
      const { data: posts, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('community_id', communityId)
        .order('created_at', { ascending: false });
      if (error) throw error;

      if (!posts?.length) return [];

      // Fetch profiles
      const userIds = [...new Set(posts.map((p: any) => p.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url, is_verified_scholar')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);

      // Fetch like counts
      const postIds = posts.map((p: any) => p.id);
      const { data: likes } = await supabase
        .from('community_post_likes')
        .select('post_id, user_id')
        .in('post_id', postIds);

      const likeCountMap = new Map<string, number>();
      const userLikeSet = new Set<string>();
      likes?.forEach((l: any) => {
        likeCountMap.set(l.post_id, (likeCountMap.get(l.post_id) || 0) + 1);
        if (l.user_id === user?.id) userLikeSet.add(l.post_id);
      });

      return posts.map((p: any) => ({
        ...p,
        profile: profileMap.get(p.user_id),
        like_count: likeCountMap.get(p.id) || 0,
        is_liked: userLikeSet.has(p.id),
      })) as CommunityPost[];
    },
    enabled: !!communityId,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ communityId, body }: { communityId: string; body: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('community_posts')
        .insert({ community_id: communityId, user_id: user.id, body } as any);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['community-posts', vars.communityId] });
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    },
  });
}

export function useTogglePostLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, communityId, isLiked }: { postId: string; communityId: string; isLiked: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (isLiked) {
        await supabase.from('community_post_likes').delete().eq('post_id', postId).eq('user_id', user.id);
      } else {
        await supabase.from('community_post_likes').insert({ post_id: postId, user_id: user.id } as any);
      }
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['community-posts', vars.communityId] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      const { error } = await supabase.from('community_posts').delete().eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    },
  });
}

export function useCreateCommunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (community: { name: string; name_ar?: string; description?: string; icon?: string; color?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('communities')
        .insert({ ...community, created_by: user.id } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    },
  });
}

export function useCreateReport() {
  return useMutation({
    mutationFn: async ({ postId, userId, reason, details }: { postId?: string; userId?: string; reason: string; details?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('reports')
        .insert({
          reporter_id: user.id,
          reported_post_id: postId || null,
          reported_user_id: userId || null,
          reason,
          details,
        } as any);
      if (error) throw error;
    },
  });
}

export function useReports() {
  return useQuery({
    queryKey: ['admin-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;

      if (!data?.length) return [];

      // Get reporter profiles
      const reporterIds = [...new Set(data.map((r: any) => r.reporter_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name')
        .in('user_id', reporterIds);
      const profileMap = new Map(profiles?.map((p) => [p.user_id, p.display_name]) || []);

      // Get post bodies for reported posts
      const postIds = data.filter((r: any) => r.reported_post_id).map((r: any) => r.reported_post_id);
      const { data: posts } = postIds.length
        ? await supabase.from('community_posts').select('id, body').in('id', postIds)
        : { data: [] };
      const postMap = new Map<string, string>(posts?.map((p: any) => [p.id, p.body] as [string, string]) || []);

      return data.map((r: any) => ({
        ...r,
        reporter_name: profileMap.get(r.reporter_id) || 'Unknown',
        post_body: r.reported_post_id ? postMap.get(r.reported_post_id) : null,
      }));
    },
  });
}

export function useResolveReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportId, action }: { reportId: string; action: 'resolved' | 'dismissed' }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('reports')
        .update({ status: action, resolved_by: user.id, resolved_at: new Date().toISOString() } as any)
        .eq('id', reportId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
    },
  });
}
