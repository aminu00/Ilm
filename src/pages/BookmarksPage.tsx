import { Bookmark } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import QuestionCard from '@/components/questions/QuestionCard';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookmarksPage() {
  const { data: bookmarks, isLoading } = useBookmarks();
  const { t } = useLanguage();

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold">{t('savedQuestions')}</h1>
        </div>
      </header>

      <div className="px-4 py-3 space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : bookmarks?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-1">{t('noSavedQuestions')}</h3>
            <p className="text-sm text-muted-foreground">{t('bookmarkToFind')}</p>
          </div>
        ) : (
          bookmarks?.map((b: any) => b.questions && <QuestionCard key={b.id} question={b.questions} />)
        )}
      </div>
    </AppLayout>
  );
}
