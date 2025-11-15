import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { postId, userId } = req.body
  const { data: post } = await supabase.from('posts').select('author_id').eq('id', postId).maybeSingle()
  if (!post) return res.status(404).json({ error:'not found' })
  if (post.author_id !== userId) return res.status(403).json({ error:'not allowed' })
  await supabase.from('posts').delete().eq('id', postId)
  res.json({ success:true })
}
