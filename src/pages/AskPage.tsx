import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/components/layout/AppLayout';
import { useCategories } from '@/hooks/useCategories';
import { useCreateQuestion } from '@/hooks/useQuestions';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export default function AskPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { data: categories } = useCategories();
  const createQuestion = useCreateQuestion();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createQuestion.mutateAsync({
        title: title.trim(),
        body: body.trim(),
        category_id: categoryId || null,
        is_anonymous: isAnonymous,
      });
      toast.success('Question posted!');
      navigate('/');
    } catch {
      toast.error('Failed to post question');
    }
  };

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">{t('askQuestion')}</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="category">{t('category')}</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="rounded-xl h-12">
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name} {cat.name_ar && `(${cat.name_ar})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">{t('title')}</Label>
          <Input
            id="title"
            placeholder={t('whatsYourQuestion')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl h-12"
            maxLength={200}
            required
          />
          <p className="text-xs text-muted-foreground text-right">{title.length}/200</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">{t('details')}</Label>
          <Textarea
            id="body"
            placeholder={t('explainQuestion')}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="rounded-xl min-h-[160px] resize-none"
            maxLength={2000}
            required
          />
          <p className="text-xs text-muted-foreground text-right">{body.length}/2000</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
          <div>
            <p className="text-sm font-medium">{t('askAnonymously')}</p>
            <p className="text-xs text-muted-foreground">{t('nameNotShown')}</p>
          </div>
          <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl"
          disabled={createQuestion.isPending || !title.trim() || !body.trim()}
        >
          <Send className="h-4 w-4 mr-2" />
          {createQuestion.isPending ? t('posting') : t('postQuestion')}
        </Button>
      </form>
    </AppLayout>
  );
}
