-- Update RLS policy for community_posts to allow admins to delete any post
DROP POLICY IF EXISTS "Users can delete own posts" ON public.community_posts;

-- Create new policy that allows owners and admins to delete posts
CREATE POLICY "Users can delete their own posts or admins can delete any" ON public.community_posts FOR DELETE TO authenticated USING (
  auth.uid() = user_id OR public.has_role(auth.uid(), 'admin')
);
