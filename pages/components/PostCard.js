import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function PostCard({ post, mutate }) {
  const [commentText, setCommentText] = useState('')

  async function like() {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Sign in to like')
    await fetch('/api/like', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ postId: post.id, userId: user.id })})
    mutate()
  }

  async function comment() {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Sign in to comment')
    if (!commentText) return
    await fetch('/api/comment', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ postId: post.id, userId: user.id, body: commentText })})
    setCommentText('')
    mutate()
  }

  async function del(){
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Sign in')
    if (user.id !== post.author_id) return alert('Not allowed')
    if (!confirm('Delete post?')) return
    await fetch('/api/deletePost', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ postId: post.id, userId: user.id })})
    mutate()
  }

  return (
    <div style={{background:'#111', padding:12, borderRadius:8, marginBottom:12}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <strong>{post.title || 'Untitled'}</strong>
          <div style={{fontSize:12,color:'#999'}}>{post.author_name || post.author_id}</div>
        </div>
        <div>
          <button onClick={del} style={{background:'#b33',color:'#fff',border:'none',padding:6,borderRadius:6}}>Delete</button>
        </div>
      </div>

      <div style={{marginTop:8}}>{post.body}</div>
      {post.image_url && <img src={post.image_url} style={{width:'100%',marginTop:8,borderRadius:6}} alt="post" />}

      <div style={{marginTop:10, display:'flex', gap:8, alignItems:'center'}}>
        <button onClick={like} style={{background:'#c89b2a', border:'none', padding:'8px 10px', borderRadius:6}}>Like</button>
        <div>{post.likes || 0} likes</div>
      </div>

      <div style={{marginTop:8}}>
        <input placeholder="Write a comment" value={commentText} onChange={e=>setCommentText(e.target.value)} />
        <button onClick={comment} style={{marginLeft:8}}>Comment</button>
      </div>
    </div>
  )
}
