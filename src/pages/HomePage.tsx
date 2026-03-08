import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/components/layout/AppLayout';
import QuestionCard from '@/components/questions/QuestionCard';
import DailyReminder from '@/components/home/DailyReminder';
import CategoryChip from '@/components/questions/CategoryChip';
import { useQuestions } from '@/hooks/useQuestions';
import { useCategories } from '@/hooks/useCategories';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { data: questions, isLoading: questionsLoading } = useQuestions(selectedCategory);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-2xl font-display font-bold text-primary">{t('appName')}</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">{t('appTagline')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="px-4 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                !selectedCategory
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary/40'
              }`}
            >
              {t('all')}
            </button>
            {categoriesLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))
              : categories?.map((cat) => (
                  <CategoryChip
                    key={cat.id}
                    category={cat}
                    isSelected={selectedCategory === cat.id}
                    onSelect={setSelectedCategory}
                  />
                ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </header>

      <DailyReminder />

      <div className="px-4 py-3 space-y-3">
        {questionsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 bg-card rounded-xl border border-border space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))
        ) : questions?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-1">{t('noQuestionsYet')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('beFirstToAsk')}</p>
            <Button onClick={() => navigate('/ask')} className="rounded-full">
              {t('askAQuestion')}
            </Button>
          </div>
        ) : (
          questions?.map((q) => <QuestionCard key={q.id} question={q} />)
        )}
      </div>
    </AppLayout>
  );
}
