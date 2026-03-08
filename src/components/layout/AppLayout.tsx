import { ReactNode } from 'react';
import MobileNav from './MobileNav';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
