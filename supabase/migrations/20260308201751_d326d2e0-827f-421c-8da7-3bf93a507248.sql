
-- Comments table for discussions on answers
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  answer_id UUID NOT NULL REFERENCES public.answers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Comments are viewable by everyone"
  ON public.comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON public.comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
