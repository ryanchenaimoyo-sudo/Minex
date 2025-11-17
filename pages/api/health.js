// pages/api/health.js
import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY
  }

  // quick Supabase test: try a small select from profiles (if table exists)
  let dbTest = { ok: false, message: 'not tested' }
  try {
    const { data, error } = await supabase.from('profiles').select('id').limit(1)
    if (error) {
      dbTest = { ok: false, message: error.message }
    } else {
      dbTest = { ok: true, rows: data?.length ?? 0 }
    }
  } catch (e) {
    dbTest = { ok: false, message: e.message }
  }

  res.json({ env, dbTest })
}
