
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Signup(){
  const [email,setEmail] = useState('')
  const [pw,setPw] = useState('')
  const [name,setName] = useState('')
  const router = useRouter()

  async function handleSignup(){
    if(!email || !pw) return alert('Enter email and password')
    const { error } = await supabase.auth.signUp({ email, password: pw }, { data: { full_name: name } })
    if(error) return alert(error.message)
    // create profile after sign-up will be created on first login to be safe
    alert('Check your email to verify. After verify, sign in.')
    router.push('/login')
  }

  return (
    <div style={{padding:16}}>
      <h2>Sign up</h2>
      <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} /><br/>
      <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input type='password' placeholder='Password' value={pw} onChange={e=>setPw(e.target.value)} /><br/>
      <button onClick={handleSignup}>Sign up</button>
    </div>
  )
}
