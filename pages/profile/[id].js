import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function ProfilePage(){
  const router = useRouter()
  const { id } = router.query
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    if(!id) return
    async function load(){
      const { data: p } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle()
      setProfile(p)
      const { data: ps } = await supabase.from('posts').select('*').eq('author_id', p?.user_id).order('created_at',{ascending:false}).limit(100)
      setPosts(ps || [])
    }
    load()
  },[id])

  if(!profile) return <div style={{padding:16}}>Loading...</div>

  return (
    <div style={{padding:16}}>
      <h2>{profile.name || 'Profile'}</h2>
      <div>Email: {profile.email}</div>
      <div>Role: {profile.role || 'N/A'}</div>
      <div>Verified: {profile.verified ? 'Yes' : 'No'}</div>

      <h3>Posts</h3>
      {posts.length===0 && <div>No posts</div>}
      {posts.map(p=>(
        <div key={p.id} style={{border:'1px solid #222',padding:8,marginTop:8}}>
          <strong>{p.title}</strong>
          <div>{p.body}</div>
        </div>
      ))}
    </div>
  )
}