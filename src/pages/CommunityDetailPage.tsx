import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Heart, Trash2, Flag, CheckCircle2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Textarea as DialogTextarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/components/layout/AppLayout';
import { useCommunities, useCommunityPosts, useCreatePost, useTogglePostLike, useDeletePost, useCreateReport } from '@/hooks/useCommunity';
import { useUserRoles } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { data: communities } = useCommunities();
  const community = communities?.find((c) => c.id === id);
  const { data: posts, isLoading } = useCommunityPosts(id!);
  const { data: roles } = useUserRoles();
  const isAdmin = roles?.includes('admin');
  const createPost = useCreatePost();
  const toggleLike = useTogglePostLike();
  const deletePost = useDeletePost();
  const createReport = useCreateReport();

  const [body, setBody] = useState('');
  const [reportDialog, setReportDialog] = useState<{ open: boolean; postId: string; userId: string }>({ open: false, postId: '', userId: '' });
  const [reportReason, setReportReason] = useState('spam');
  const [reportDetails, setReportDetails] = useState('');

  const handlePost = async () => {
    if (!body.trim() || !id) return;
    try {
      await createPost.mutateAsync({ communityId: id, body: body.trim() });
      setBody('');
      toast.success(t('postCreated'));
    } catch {
      toast.error(t('postFailed'));
    }
  };

  const handleReport = async () => {
    try {
      await createReport.mutateAsync({
        postId: reportDialog.postId,
        userId: reportDialog.userId,
        reason: reportReason,
        details: reportDetails.trim() || undefined,
      });
      toast.success(t('reportSubmitted'));
      setReportDialog({ open: false, postId: '', userId: '' });
      setReportReason('spam');
      setReportDetails('');
    } catch {
      toast.error(t('reportFailed'));
    }
  };

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/community')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            {community && <span className="text-xl">{community.icon}</span>}
            <div>
              <h1 className="text-lg font-semibold">{community?.name || t('loading')}</h1>
              {community?.description && (
                <p className="text-xs text-muted-foreground line-clamp-1">{community.description}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4 pb-24">
        {/* Post composer */}
        <div className="bg-card rounded-xl border border-border p-3 space-y-3">
          <Textarea
            placeholder={t('writePost')}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="rounded-xl min-h-[80px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0"
            maxLength={2000}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{body.length}/2000</span>
            <Button
              size="sm"
              className="rounded-xl gap-1.5"
              disabled={!body.trim() || createPost.isPending}
              onClick={handlePost}
            >
              <Send className="h-3.5 w-3.5" />
              {t('post')}
            </Button>
          </div>
        </div>

        {/* Posts */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : !posts?.length ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">{t('noPosts')}</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-card rounded-xl border border-border p-4 space-y-3">
              {/* Post header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                    {post.profile?.avatar_url ? (
                      <img src={post.profile.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      post.profile?.display_name?.[0] ?? 'U'
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{post.profile?.display_name ?? t('anonymous')}</span>
                      {post.profile?.is_verified_scholar && <CheckCircle2 className="h-3.5 w-3.5 text-scholar" />}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem
                      onClick={() => setReportDialog({ open: true, postId: post.id, userId: post.user_id })}
                      className="text-destructive gap-2"
                    >
                      <Flag className="h-4 w-4" />
                      {t('reportPost')}
                    </DropdownMenuItem>
                    {(post.user_id === user?.id || isAdmin) && (
                      <DropdownMenuItem
                        onClick={async () => {
                          await deletePost.mutateAsync({ postId: post.id });
                          toast.success(t('postDeleted'));
                        }}
                        className="text-destructive gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        {t('delete')}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Post body */}
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{post.body}</p>

              {/* Post actions */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={() => toggleLike.mutate({ postId: post.id, communityId: id!, isLiked: post.is_liked })}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${post.is_liked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
                >
                  <Heart className={`h-4 w-4 ${post.is_liked ? 'fill-current' : ''}`} />
                  <span>{post.like_count}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report Dialog */}
      <Dialog open={reportDialog.open} onOpenChange={(open) => setReportDialog((p) => ({ ...p, open }))}>
        <DialogContent className="rounded-2xl max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>{t('reportPost')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Select value={reportReason} onValueChange={setReportReason}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spam">{t('reportSpam')}</SelectItem>
                <SelectItem value="inappropriate">{t('reportInappropriate')}</SelectItem>
                <SelectItem value="harassment">{t('reportHarassment')}</SelectItem>
                <SelectItem value="other">{t('reportOther')}</SelectItem>
              </SelectContent>
            </Select>
            <DialogTextarea
              placeholder={t('reportDetailsPlaceholder')}
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              className="rounded-xl"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReportDialog({ open: false, postId: '', userId: '' })} className="rounded-xl">{t('cancel')}</Button>
            <Button variant="destructive" onClick={handleReport} disabled={createReport.isPending} className="rounded-xl">
              {t('submitReport')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
