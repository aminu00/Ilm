import { MessageCircle, ArrowUp, Clock, CheckCircle2, MoreVertical, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Question } from '@/hooks/useQuestions';
import { useDeleteQuestion } from '@/hooks/useQuestions';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useProfile';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteQuestion = useDeleteQuestion();
  const profile = question.profiles;
  const category = question.categories;
  const isOwner = user?.id === question.user_id;
  const canDelete = isOwner || isAdmin;
  const canEdit = isOwner;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/ask?edit=${question.id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteQuestion.mutateAsync({
        questionId: question.id,
        questionTitle: question.title,
        userId: question.user_id,
        isAdminDelete: isAdmin && !isOwner,
      });
      toast.success('Question deleted successfully');
      setShowDeleteDialog(false);
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error?.message || 'Failed to delete question');
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  return (
    <div className="w-full p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all animate-fade-in group">
      <button
        onClick={() => navigate(`/question/${question.id}`)}
        className="w-full text-left"
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

      {(canEdit || canDelete) && (
        <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
              >
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canEdit && (
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              )}
              {canDelete && (
                <DropdownMenuItem onClick={handleDeleteClick} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete {isAdmin && !isOwner && '(Admin)'}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question</AlertDialogTitle>
            <AlertDialogDescription>
              {isAdmin && !isOwner 
                ? 'You are deleting this question as an admin. This action cannot be undone.'
                : 'Are you sure you want to delete this question? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteQuestion.isPending}
            >
              {deleteQuestion.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
