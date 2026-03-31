import { useState, useMemo } from 'react';
import { Search, TrendingUp, ArrowUp, Clock, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AppLayout from '@/components/layout/AppLayout';
import QuestionCard from '@/components/questions/QuestionCard';
import { useQuestions } from '@/hooks/useQuestions';
import { useCategories } from '@/hooks/useCategories';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';

type SortTab = 'recent' | 'trending' | 'upvoted' | 'answered';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<SortTab>('recent');
  const { data: questions, isLoading } = useQuestions(selectedCategory);
  const { data: categories } = useCategories();
  const { t } = useLanguage();

  const sorted = useMemo(() => {
    if (!questions) return [];

    const filtered = questions.filter(
      (q) =>
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.body.toLowerCase().includes(search.toLowerCase())
    );

    switch (activeTab) {
      case 'trending':
        return [...filtered].sort((a, b) => {
          const scoreA = a.upvote_count * 2 + a.view_count + a.answer_count * 3;
          const scoreB = b.upvote_count * 2 + b.view_count + b.answer_count * 3;
          return scoreB - scoreA;
        });
      case 'upvoted':
        return [...filtered].sort((a, b) => b.upvote_count - a.upvote_count);
      case 'answered':
        return filtered.filter((q) => q.status === 'answered');
      case 'recent':
      default:
        return filtered;
    }
  }, [questions, search, activeTab]);

  const tabs: { key: SortTab; label: string; icon: React.ReactNode }[] = [
    { key: 'recent', label: t('recent'), icon: <Clock className="h-3.5 w-3.5" /> },
    { key: 'trending', label: t('trending'), icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { key: 'upvoted', label: t('mostUpvoted'), icon: <ArrowUp className="h-3.5 w-3.5" /> },
    { key: 'answered', label: t('answeredTab'), icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  ];

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="px-4 py-3 space-y-3">
          <h1 className="text-lg font-semibold">{t('explore')}</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('searchQuestions')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl h-11"
            />
          </div>

          {/* Sort Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {!search && activeTab === 'recent' && (
        <div className="px-4 py-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">{t('categories')}</h2>
          <div className="grid grid-cols-2 gap-2">
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? undefined : cat.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedCategory === cat.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <p className="font-medium text-sm">{cat.name}</p>
                {cat.name_ar && <p className="text-xs text-muted-foreground font-display mt-0.5">{cat.name_ar}</p>}
                {cat.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{cat.description}</p>}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-2 space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
        ) : sorted.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground text-sm">{t('noQuestionsFound')}</p>
        ) : (
          sorted.map((q) => <QuestionCard key={q.id} question={q} />)
        )}
      </div>
    </AppLayout>
  );
}
