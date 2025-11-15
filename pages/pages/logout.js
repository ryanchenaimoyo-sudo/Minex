import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Logout(){
  const router = useRouter()
  useEffect(()=> {
    supabase.auth.signOut().then(()=> router.push('/'))
  },[])
  return <div style={{padding:16}}>Signing out...</div>
}
