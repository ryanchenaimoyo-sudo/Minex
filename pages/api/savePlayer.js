import { supabase } from '../../lib/supabaseClient'
export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { playerId } = req.body
  const { data } = await supabase.auth.getUser()
  const user = data.user
  if (!user) return res.status(401).json({ error:'not signed in' })
  await supabase.from('profiles').update({ onesignal_id: playerId }).eq('user_id', user.id)
  res.json({ success:true })
}
