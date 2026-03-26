import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Plus, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import AppLayout from '@/components/layout/AppLayout';
import { useCommunities, useCreateCommunity } from '@/hooks/useCommunity';
import { useUserRoles } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export default function CommunityListPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: communities, isLoading } = useCommunities();
  const { data: roles } = useUserRoles();
  const isAdmin = roles?.includes('admin');
  const createCommunity = useCreateCommunity();

  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🕌');

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createCommunity.mutateAsync({ name: name.trim(), name_ar: nameAr.trim() || undefined, description: description.trim() || undefined, icon });
      toast.success(t('communityCreated'));
      setShowCreate(false);
      setName(''); setNameAr(''); setDescription(''); setIcon('🕌');
    } catch {
      toast.error(t('communityCreateFailed'));
    }
  };

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{t('community')}</h1>
              <p className="text-xs text-muted-foreground">{t('communityTagline')}</p>
            </div>
          </div>
          {isAdmin && (
            <Button size="sm" className="rounded-xl gap-1.5" onClick={() => setShowCreate(true)}>
              <Plus className="h-4 w-4" />
              {t('createCommunity')}
            </Button>
          )}
        </div>
      </header>

      <div className="px-4 py-4 space-y-3 pb-24">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)
        ) : !communities?.length ? (
          <div className="text-center py-16">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">{t('noCommunities')}</p>
          </div>
        ) : (
          communities.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/community/${c.id}`)}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors text-left"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: `${c.color}15` }}
              >
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{c.name}</p>
                {c.description && (
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{c.description}</p>
                )}
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>{c.post_count ?? 0} {t('posts')}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Create Community Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="rounded-2xl max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>{t('createCommunity')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder={t('communityName')} value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" />
            <Input placeholder={t('communityNameAr')} value={nameAr} onChange={(e) => setNameAr(e.target.value)} className="rounded-xl" dir="rtl" />
            <Textarea placeholder={t('communityDescription')} value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl" rows={3} />
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">{t('communityIcon')}</label>
              <div className="flex gap-2 flex-wrap">
                {['🕌', '📖', '🤲', '💬', '🌙', '⭐', '🎓', '❤️'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setIcon(emoji)}
                    className={`h-10 w-10 rounded-lg text-xl flex items-center justify-center border transition-colors ${icon === emoji ? 'border-primary bg-primary/10' : 'border-border'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreate(false)} className="rounded-xl">{t('cancel')}</Button>
            <Button onClick={handleCreate} disabled={!name.trim() || createCommunity.isPending} className="rounded-xl">
              {t('createCommunity')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
