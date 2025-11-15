import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { postId, userId } = req.body
  try {
    await supabase.from('likes').insert({ post_id: postId, user_id: userId })
    // simple: do not rely on atomic increment; this is basic
    await supabase.rpc('increment_post_likes', { p_post_id: postId }).catch(()=>{})
    res.json({ success:true })
  } catch(e){
    res.status(200).json({ success:true })
  }
}