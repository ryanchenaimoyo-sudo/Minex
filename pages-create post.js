import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function CreatePost(){
  const [user, setUser] = useState(null)
  const [title,setTitle] = useState('')
  const [body,setBody] = useState('')
  const [file,setFile] = useState(null)
  const router = useRouter()

  useEffect(()=> {
    supabase.auth.getUser().then(r => setUser(r.data.user || null))
    const { data } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user ?? null))
    return ()=> data?.subscription?.unsubscribe?.()
  },[])

  async function uploadFile(file){
    if(!file) return null
    const name = `${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage.from('public').upload(name, file)
    if(error) { console.error(error); return null }
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`
  }

  async function handleCreate(){
    if(!user) return alert('Sign in to post')
    let image_url = null
    if(file) {
      image_url = await uploadFile(file)
      if(!image_url) return alert('Upload failed')
    }
    const { error } = await supabase.from('posts').insert({
      author_id: user.id, title, body, image_url, created_at: new Date()
    })
    if(error) return alert(error.message)
    alert('Posted!')
    router.push('/')
  }

  return (
    <div style={{padding:16}}>
      <h2>Create post</h2>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /><br/>
      <textarea placeholder="Write..." value={body} onChange={e=>setBody(e.target.value)} /><br/>
      <input type="file" onChange={e=>setFile(e.target.files[0] || null)} /><br/>
      <button onClick={handleCreate}>Post</button>
    </div>
  )
}