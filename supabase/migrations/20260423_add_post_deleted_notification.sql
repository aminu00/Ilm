-- Update notifications table to include post_deleted type
ALTER TABLE public.notifications DROP CONSTRAINT notifications_type_check;
ALTER TABLE public.notifications ADD CONSTRAINT notifications_type_check CHECK (type IN ('question_deleted', 'question_answered', 'answer_accepted', 'post_deleted'));
