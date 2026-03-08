import { MessageCircle, ArrowUp, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Question } from '@/hooks/useQuestions';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const navigate = useNavigate();
  const profile = question.profiles;
  const category = question.categories;

  return (
    <button
      onClick={() => navigate(`/question/${question.id}`)}
      className="w-full text-left p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
          {question.is_anonymous ? '?' : (profile?.display_name?.[0] ?? 'U')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium truncate">
              {question.is_anonymous ? 'Anonymous' : (profile?.display_name ?? 'User')}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
            </span>
          </div>

          <h3 className="font-semibold text-foreground leading-snug mb-1.5 line-clamp-2">
            {question.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {question.body}
          </p>

          <div className="flex items-center gap-3">
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            )}
            {question.status === 'answered' && (
              <Badge className="bg-primary/10 text-primary border-0 text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Answered
              </Badge>
            )}
            <div className="flex items-center gap-3 ml-auto text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ArrowUp className="h-3.5 w-3.5" />
                {question.upvote_count}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                {question.answer_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
