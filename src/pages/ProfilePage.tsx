import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, CheckCircle2, BookOpen, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, useUserRoles } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/i18n/translations';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const { data: roles } = useUserRoles();
  const { t, language, setLanguage, languages } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">{t('profile')}</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-display font-bold">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
            ) : (
              profile?.display_name?.[0] ?? 'U'
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold break-words overflow-hidden">{profile?.display_name || 'User'}</h2>
              {profile?.is_verified_scholar && (
                <CheckCircle2 className="h-5 w-5 text-scholar" />
              )}
            </div>
            {profile?.username && (
              <p className="text-sm text-muted-foreground break-words overflow-hidden">@{profile.username}</p>
            )}
            <p className="text-xs text-muted-foreground break-words overflow-hidden">{user.email}</p>
            <div className="flex gap-1.5 mt-1.5">
              {roles?.map((role: string) => (
                <Badge key={role} variant="secondary" className="text-xs capitalize">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {profile?.bio && (
          <p className="text-sm text-muted-foreground break-words overflow-hidden">{profile.bio}</p>
        )}

        {profile?.is_verified_scholar && (
          <div className="p-4 bg-scholar/5 rounded-xl border border-scholar/20">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-scholar" />
              <span className="text-sm font-medium text-scholar">{t('scholarProfile')}</span>
            </div>
            {profile.scholar_title && (
              <p className="text-sm font-medium break-words overflow-hidden">{profile.scholar_title}</p>
            )}
            {profile.scholar_specialization && (
              <p className="text-xs text-muted-foreground break-words overflow-hidden">{profile.scholar_specialization}</p>
            )}
          </div>
        )}

        {/* Language Selector */}
        <div className="p-4 bg-card rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{t('language')}</span>
          </div>
          <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
            <SelectTrigger className="rounded-xl h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languages).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start rounded-xl h-12" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-3" />
            {t('signOut')}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
