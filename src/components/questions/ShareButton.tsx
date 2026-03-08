import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShareButtonProps {
  questionId: string;
  questionTitle: string;
}

export default function ShareButton({ questionId, questionTitle }: ShareButtonProps) {
  const { t } = useLanguage();
  const url = `${window.location.origin}/question/${questionId}`;
  const text = `${questionTitle} — ${t('appName')}`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('linkCopied'));
    } catch {
      toast.error('Failed to copy');
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: questionTitle, text, url });
      } catch { /* user cancelled */ }
    }
  };

  // Use native share on mobile if available
  if (navigator.share) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={nativeShare}>
        <Share2 className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={shareWhatsApp}>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareTwitter}>
          Twitter / X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>
          {t('copyLink')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
