import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface CommentSectionProps {
  answerId: string;
}

export default function CommentSection({ answerId }: CommentSectionProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [body, setBody] = useState('');
  const [expanded, setExpanded] = useState(false);

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', answerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('answer_id', answerId)
        .order('created_at', { ascending: true });
      if (error) throw error;

      const userIds = [...new Set(data.map((c) => c.user_id))];
      if (userIds.length === 0) return [];

      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]));
      return data.map((c) => ({ ...c, profile: profileMap.get(c.user_id) }));
    },
    enabled: expanded,
  });

  const createComment = useMutation({
    mutationFn: async (commentBody: string) => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('comments')
        .insert({ answer_id: answerId, user_id: user.id, body: commentBody });
      if (error) throw error;
    },
    onSuccess: () => {
      setBody('');
      queryClient.invalidateQueries({ queryKey: ['comments', answerId] });
      toast.success(t('commentPosted'));
    },
    onError: () => toast.error(t('commentFailed')),
  });

  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', answerId] });
    },
  });

  const handleSubmit = () => {
    if (!body.trim()) return;
    createComment.mutate(body.trim());
  };

  return (
    <div className="mt-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        {expanded ? t('hideComments') : t('showComments')}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 pl-3 border-l-2 border-border">
          {isLoading ? (
            <p className="text-xs text-muted-foreground">{t('loading')}</p>
          ) : comments?.length === 0 ? (
            <p className="text-xs text-muted-foreground">{t('noComments')}</p>
          ) : (
            comments?.map((comment) => (
              <div key={comment.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                      {comment.profile?.display_name?.[0] ?? 'U'}
                    </div>
                    <span className="text-xs font-medium">{comment.profile?.display_name ?? 'User'}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  {user?.id === comment.user_id && (
                    <button
                      onClick={() => deleteComment.mutate(comment.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-foreground leading-relaxed break-words overflow-hidden">{comment.body}</p>
              </div>
            ))
          )}

          {user && (
            <div className="flex gap-2">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={t('writeComment')}
                className="min-h-[60px] text-xs rounded-lg resize-none"
                maxLength={1000}
              />
              <Button
                size="icon"
                className="h-8 w-8 rounded-full shrink-0 self-end"
                onClick={handleSubmit}
                disabled={createComment.isPending || !body.trim()}
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
