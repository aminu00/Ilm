import { Home, Search, PlusCircle, Bookmark, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Explore', path: '/explore' },
  { icon: PlusCircle, label: 'Ask', path: '/ask' },
  { icon: Bookmark, label: 'Saved', path: '/bookmarks' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 text-xs transition-colors rounded-lg',
                isActive
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', item.path === '/ask' && 'h-6 w-6')} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
