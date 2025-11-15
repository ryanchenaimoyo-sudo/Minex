import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { postId, userId, body } = req.body
  const { error } = await supabase.from('comments').insert({ post_id: postId, author_id: userId, body, created_at: new Date() })
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success:true })
}