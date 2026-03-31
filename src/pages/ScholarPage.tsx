import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, UserPlus, UserMinus, MessageCircle, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/components/layout/AppLayout';
import { useScholarProfile, useScholarAnswers, useScholarStats, useIsFollowing, useToggleFollow } from '@/hooks/useScholar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDistanceToNow } from 'date-fns';

export default function ScholarPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { data: profile, isLoading } = useScholarProfile(userId!);
  const { data: answers, isLoading: answersLoading } = useScholarAnswers(userId!);
  const { data: stats } = useScholarStats(userId!);
  const { data: isFollowing } = useIsFollowing(userId!);
  const toggleFollow = useToggleFollow();

  const isOwnProfile = user?.id === userId;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-4 space-y-4">
          <Skeleton className="h-24 w-24 rounded-full mx-auto" />
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-32 w-full" />
        </div>
      </AppLayout>
    );
  }

  if (!profile) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">{t('noResults')}</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-sm font-medium">{t('scholarProfile')}</h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="h-24 w-24 rounded-full object-cover border-4 border-primary/20"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold border-4 border-primary/20">
                {profile.display_name?.[0] ?? 'S'}
              </div>
            )}
            {profile.is_verified_scholar && (
              <CheckCircle2 className="absolute bottom-0 right-0 h-7 w-7 text-primary bg-background rounded-full p-0.5" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-display font-bold flex items-center justify-center gap-1.5">
              {profile.display_name}
            </h2>
            {profile.scholar_title && (
              <p className="text-sm text-muted-foreground mt-0.5">{profile.scholar_title}</p>
            )}
            {profile.scholar_specialization && (
              <Badge variant="secondary" className="mt-2 text-xs">
                {profile.scholar_specialization}
              </Badge>
            )}
          </div>

          {profile.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">{profile.bio}</p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-2">
            <div className="text-center">
              <p className="text-lg font-bold">{stats?.answers ?? 0}</p>
              <p className="text-xs text-muted-foreground">{t('answers')}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{stats?.followers ?? 0}</p>
              <p className="text-xs text-muted-foreground">{t('followers')}</p>
            </div>
          </div>

          {/* Follow Button */}
          {!isOwnProfile && user && (
            <Button
              variant={isFollowing ? 'outline' : 'default'}
              className="rounded-full px-6"
              onClick={() => toggleFollow.mutate({ scholarId: userId!, isFollowing: !!isFollowing })}
              disabled={toggleFollow.isPending}
            >
              {isFollowing ? (
                <>
                  <UserMinus className="h-4 w-4 mr-2" />
                  {t('unfollow')}
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t('follow')}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Answer History */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            {t('answerHistory')} ({answers?.length ?? 0})
          </h3>

          {answersLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          ) : answers?.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground text-sm">{t('noAnswersYet')}</p>
            </div>
          ) : (
            answers?.map((answer) => (
              <button
                key={answer.id}
                onClick={() => navigate(`/question/${answer.question_id}`)}
                className="w-full text-left p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all space-y-2"
              >
                <p className="text-sm font-medium line-clamp-2">
                  {answer.questions?.title ?? t('question')}
                </p>
                {answer.body && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{answer.body}</p>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(answer.created_at), { addSuffix: true })}
                  </span>
                  {answer.questions?.status === 'answered' && (
                    <Badge className="bg-primary/10 text-primary border-0 text-[10px] px-1.5 py-0">
                      <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                      {t('answered')}
                    </Badge>
                  )}
                  {answer.audio_url && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">🎙️</Badge>}
                  {answer.video_url && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">🎥</Badge>}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
