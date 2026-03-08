import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Users, BookOpen, Shield, BarChart3, UserPlus, UserMinus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRoles } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UserWithRole {
  id: string;
  user_id: string;
  display_name: string;
  username: string | null;
  avatar_url: string | null;
  is_verified_scholar: boolean;
  scholar_title: string | null;
  created_at: string;
  roles: string[];
}

function useAdminUsers(search: string) {
  return useQuery({
    queryKey: ['admin-users', search],
    queryFn: async () => {
      let query = supabase.from('profiles').select('*').order('created_at', { ascending: false });

      if (search) {
        query = query.or(`display_name.ilike.%${search}%,username.ilike.%${search}%`);
      }

      const { data: profiles, error } = await query;
      if (error) throw error;

      const userIds = profiles.map((p) => p.user_id);
      const { data: roles } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .in('user_id', userIds);

      const roleMap = new Map<string, string[]>();
      roles?.forEach((r) => {
        const existing = roleMap.get(r.user_id) || [];
        existing.push(r.role);
        roleMap.set(r.user_id, existing);
      });

      return profiles.map((p) => ({
        ...p,
        roles: roleMap.get(p.user_id) || ['user'],
      })) as UserWithRole[];
    },
  });
}

function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [usersRes, scholarsRes, questionsRes, answersRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('user_roles').select('id', { count: 'exact', head: true }).eq('role', 'scholar'),
        supabase.from('questions').select('id', { count: 'exact', head: true }),
        supabase.from('answers').select('id', { count: 'exact', head: true }),
      ]);
      return {
        users: usersRes.count ?? 0,
        scholars: scholarsRes.count ?? 0,
        questions: questionsRes.count ?? 0,
        answers: answersRes.count ?? 0,
      };
    },
  });
}

function useToggleScholar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, action }: { userId: string; action: 'add' | 'remove' }) => {
      if (action === 'add') {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'scholar' as any });
        if (roleError) throw roleError;

        const { error: profileError } = await supabase
          .from('profiles')
          .update({ is_verified_scholar: true })
          .eq('user_id', userId);
        if (profileError) throw profileError;
      } else {
        const { error: roleError } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'scholar' as any);
        if (roleError) throw roleError;

        const { error: profileError } = await supabase
          .from('profiles')
          .update({ is_verified_scholar: false, scholar_title: null, scholar_specialization: null })
          .eq('user_id', userId);
        if (profileError) throw profileError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: roles, isLoading: rolesLoading } = useUserRoles();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { data: users, isLoading: usersLoading } = useAdminUsers(debouncedSearch);
  const { data: stats } = useAdminStats();
  const toggleScholar = useToggleScholar();
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; userId: string; action: 'add' | 'remove'; name: string }>({
    open: false, userId: '', action: 'add', name: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const isAdmin = roles?.includes('admin');

  if (rolesLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AppLayout>
    );
  }

  if (!isAdmin) {
    return (
      <AppLayout>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <Shield className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground text-sm mb-6">You don&apos;t have admin privileges.</p>
          <Button onClick={() => navigate('/')} className="rounded-xl">{t('home')}</Button>
        </div>
      </AppLayout>
    );
  }

  const handleToggleScholar = (userId: string, action: 'add' | 'remove', name: string) => {
    setConfirmDialog({ open: true, userId, action, name });
  };

  const confirmToggle = async () => {
    try {
      await toggleScholar.mutateAsync({ userId: confirmDialog.userId, action: confirmDialog.action });
      toast.success(confirmDialog.action === 'add' ? t('scholarAdded') : t('scholarRemoved'));
    } catch {
      toast.error('Failed to update user role');
    }
    setConfirmDialog({ open: false, userId: '', action: 'add', name: '' });
  };

  const scholarUsers = users?.filter((u) => u.roles.includes('scholar')) || [];
  const regularUsers = users?.filter((u) => !u.roles.includes('scholar') && !u.roles.includes('admin')) || [];

  const statCards = [
    { label: t('totalUsers'), value: stats?.users ?? '—', icon: Users, color: 'text-primary' },
    { label: t('totalScholars'), value: stats?.scholars ?? '—', icon: BookOpen, color: 'text-scholar' },
    { label: t('totalQuestions'), value: stats?.questions ?? '—', icon: BarChart3, color: 'text-accent' },
    { label: t('totalAnswers'), value: stats?.answers ?? '—', icon: CheckCircle2, color: 'text-primary' },
  ];

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">{t('adminPanel')}</h1>
            <p className="text-xs text-muted-foreground">{t('manageScholars')}</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchUsers')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl h-11"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="scholars" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl">
            <TabsTrigger value="scholars" className="rounded-lg text-sm">
              {t('scholars')} ({scholarUsers.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg text-sm">
              {t('users')} ({regularUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scholars" className="mt-4 space-y-2">
            {usersLoading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
            ) : scholarUsers.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">{t('noUsersFound')}</p>
              </div>
            ) : (
              scholarUsers.map((u) => (
                <UserCard
                  key={u.id}
                  user={u}
                  onToggle={() => handleToggleScholar(u.user_id, 'remove', u.display_name)}
                  isScholar
                  t={t}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="users" className="mt-4 space-y-2">
            {usersLoading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
            ) : regularUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">{t('noUsersFound')}</p>
              </div>
            ) : (
              regularUsers.map((u) => (
                <UserCard
                  key={u.id}
                  user={u}
                  onToggle={() => handleToggleScholar(u.user_id, 'add', u.display_name)}
                  isScholar={false}
                  t={t}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog((p) => ({ ...p, open }))}>
        <AlertDialogContent className="rounded-2xl max-w-[90vw]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmAction')}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.action === 'add'
                ? `Make "${confirmDialog.name}" a verified scholar? They will be able to answer questions.`
                : `Remove scholar role from "${confirmDialog.name}"? They will no longer be able to answer questions.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle} className="rounded-xl">
              {confirmDialog.action === 'add' ? t('makeScholar') : t('removeScholarRole')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}

function UserCard({
  user,
  onToggle,
  isScholar,
  t,
}: {
  user: UserWithRole;
  onToggle: () => void;
  isScholar: boolean;
  t: (key: string) => string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
      <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
        {user.avatar_url ? (
          <img src={user.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
        ) : (
          user.display_name?.[0] ?? 'U'
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium truncate">{user.display_name}</p>
          {user.is_verified_scholar && <CheckCircle2 className="h-4 w-4 text-scholar shrink-0" />}
        </div>
        {user.username && <p className="text-xs text-muted-foreground">@{user.username}</p>}
        {user.scholar_title && <p className="text-xs text-muted-foreground">{user.scholar_title}</p>}
        <div className="flex gap-1 mt-1">
          {user.roles.map((role) => (
            <Badge key={role} variant="secondary" className="text-[10px] capitalize py-0 h-5">
              {role}
            </Badge>
          ))}
        </div>
      </div>
      <Button
        variant={isScholar ? 'destructive' : 'default'}
        size="sm"
        className="rounded-lg shrink-0 text-xs h-8"
        onClick={onToggle}
      >
        {isScholar ? <UserMinus className="h-3.5 w-3.5 mr-1" /> : <UserPlus className="h-3.5 w-3.5 mr-1" />}
        {isScholar ? t('removeScholar') : t('addScholar')}
      </Button>
    </div>
  );
}
