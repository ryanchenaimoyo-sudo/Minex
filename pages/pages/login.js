import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login(){
  const [email,setEmail] = useState('')
  const [pw,setPw] = useState('')
  const router = useRouter()

  async function handleLogin(){
    if(!email || !pw) return alert('Enter email and password')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
    if(error) return alert(error.message)
    // ensure profile exists
    const { data } = await supabase.auth.getUser()
    const user = data.user
    if(user){
      const { data: profile } = await supabase.from('profiles').select('id').eq('user_id', user.id).maybeSingle()
      if(!profile) {
        await supabase.from('profiles').insert({ user_id: user.id, email: user.email, name: user.user_metadata?.full_name || '', created_at: new Date() })
      }
    }
    router.push('/feed')
  }

  return (
    <div style={{padding:16}}>
      <h2>Sign in</h2>
      <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input type='password' placeholder='Password' value={pw} onChange={e=>setPw(e.target.value)} /><br/>
      <button onClick={handleLogin}>Sign in</button>
    </div>
  )
}