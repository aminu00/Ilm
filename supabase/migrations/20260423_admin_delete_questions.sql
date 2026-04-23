-- Drop the old delete policy and create a new one that allows owners and admins
DROP POLICY IF EXISTS "Users can delete their own questions" ON public.questions;
DROP POLICY IF EXISTS "Admins can delete any questions" ON public.questions;

-- New policy that allows both owners and admins to delete questions
CREATE POLICY "Users can delete their own questions or admins can delete any" ON public.questions FOR DELETE TO authenticated USING (
  auth.uid() = user_id OR public.has_role(auth.uid(), 'admin')
);

