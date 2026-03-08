import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUp, Bookmark, CheckCircle2, Clock, Send, Mic, Video, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/components/layout/AppLayout';
import { useQuestion, useAnswers, useCreateAnswer } from '@/hooks/useQuestions';
import { useUserRoles } from '@/hooks/useProfile';
import { useToggleBookmark } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function QuestionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { data: question, isLoading } = useQuestion(id!);
  const { data: answers, isLoading: answersLoading } = useAnswers(id!);
  const { data: roles } = useUserRoles();
  const createAnswer = useCreateAnswer();
  const toggleBookmark = useToggleBookmark();
  const [answerBody, setAnswerBody] = useState('');

  const isScholar = roles?.includes('scholar') || roles?.includes('admin');

  const handleSubmitAnswer = async () => {
    if (!answerBody.trim()) return;
    try {
      await createAnswer.mutateAsync({ question_id: id!, body: answerBody.trim() });
      setAnswerBody('');
      toast.success('Answer posted!');
    } catch {
      toast.error('Failed to post answer. Only scholars can answer.');
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-4 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </AppLayout>
    );
  }

  if (!question) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Question not found</p>
        </div>
      </AppLayout>
    );
  }

  const profile = question.profiles;
  const category = question.categories;

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-sm font-medium">{t('question')}</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => toggleBookmark.mutate(id!)}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {question.is_anonymous ? '?' : (profile?.display_name?.[0] ?? 'U')}
            </div>
            <div>
              <p className="text-sm font-medium">
                {question.is_anonymous ? t('anonymous') : (profile?.display_name ?? 'User')}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
              </p>
            </div>
            {category && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {category.name}
              </Badge>
            )}
          </div>

          <h2 className="text-xl font-display font-bold leading-snug">{question.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{question.body}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4" /> {question.upvote_count} {t('upvotes')}
            </span>
            <span>{question.view_count} {t('views')}</span>
            {question.status === 'answered' && (
              <Badge className="bg-primary/10 text-primary border-0 text-xs ml-auto">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {t('answered')}
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">
            {t('answers')} ({answers?.length ?? 0})
          </h3>

          {answersLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))
          ) : answers?.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground text-sm">{t('noAnswersYet')}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('scholarWillAnswer')}</p>
            </div>
          ) : (
            answers?.map((answer: any) => (
              <div key={answer.id} className="p-4 bg-card rounded-xl border border-primary/20 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-scholar/10 flex items-center justify-center text-scholar font-semibold">
                    {answer.profiles?.display_name?.[0] ?? 'S'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">{answer.profiles?.display_name ?? 'Scholar'}</span>
                      {answer.profiles?.is_verified_scholar && (
                        <CheckCircle2 className="h-4 w-4 text-scholar" />
                      )}
                    </div>
                    {answer.profiles?.scholar_title && (
                      <p className="text-xs text-muted-foreground">{answer.profiles.scholar_title}</p>
                    )}
                  </div>
                  <Badge className="ml-auto bg-scholar/10 text-scholar border-0 text-xs">{t('scholars')}</Badge>
                </div>

                <p className="text-sm leading-relaxed whitespace-pre-wrap">{answer.body}</p>

                {answer.audio_url && (
                  <audio controls className="w-full" src={answer.audio_url}>
                    Your browser does not support audio.
                  </audio>
                )}
                {answer.video_url && (
                  <video controls className="w-full rounded-lg" src={answer.video_url}>
                    Your browser does not support video.
                  </video>
                )}

                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(answer.created_at), { addSuffix: true })}
                </p>
              </div>
            ))
          )}
        </div>

        {isScholar && user && (
          <div className="space-y-3 p-4 bg-card rounded-xl border border-primary/30">
            <p className="text-sm font-medium text-primary">{t('respondAsScholar')}</p>
            <Textarea
              placeholder={t('writeYourAnswer')}
              value={answerBody}
              onChange={(e) => setAnswerBody(e.target.value)}
              className="rounded-xl min-h-[120px] resize-none"
              maxLength={5000}
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full" disabled>
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" disabled>
                <Video className="h-4 w-4" />
              </Button>
              <Button
                className="ml-auto rounded-full"
                onClick={handleSubmitAnswer}
                disabled={createAnswer.isPending || !answerBody.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                {createAnswer.isPending ? t('posting') : t('postAnswer')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
