import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function PostCard({ post, mutate }) {
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(false)

  async function like() {
    setLoading(true)
    const user = (await supabase.auth.getUser()).data.user
    if (!user) { alert('Sign in to like'); setLoading(false); return }
    await fetch('/api/like', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ postId: post.id, userId: user.id })})
    mutate()
    setLoading(false)
  }

  async function comment() {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Sign in to comment')
    if (!commentText) return
    setLoading(true)
    await fetch('/api/comment', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ postId: post.id, userId: user.id, body: commentText })})
    setCommentText(''); mutate(); setLoading(false)
  }

  async function del(){
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Sign in')
    if (user.id !== post.author_id) return alert('Not allowed')
    if (!confirm('Delete post?')) return
    setLoading(true)
    await fetch('/api/deletePost', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ postId: post.id, userId: user.id })})
    mutate()
    setLoading(false)
  }

  return (
    <article style={{
      background:'#0f0f10',
      border:'1px solid #1f1f1f',
      padding:14,
      borderRadius:12,
      marginBottom:14,
      boxShadow:'0 6px 18px rgba(0,0,0,0.4)'
    }}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontWeight:800, fontSize:16}}>{post.title || 'Untitled'}</div>
          <div style={{fontSize:12, color:'#9aa', marginTop:4}}>{post.author_name || post.author_id} • {new Date(post.created_at).toLocaleString()}</div>
        </div>

        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <button onClick={like} disabled={loading} style={actionBtn}>❤ {post.likes || 0}</button>
          <button onClick={del} style={{...actionBtn, background:'#2b2b2b'}}>Delete</button>
        </div>
      </header>

      <section style={{marginTop:12, color:'#ddd'}}>
        <p style={{margin:0, lineHeight:1.5}}>{post.body}</p>
        {post.image_url && <img src={post.image_url} alt="post" style={{width:'100%', marginTop:12, borderRadius:8}} />}
      </section>

      <footer style={{marginTop:12}}>
        <div style={{display:'flex', gap:8}}>
          <input placeholder="Write a comment..." value={commentText} onChange={e=>setCommentText(e.target.value)} style={commentInput} />
          <button onClick={comment} disabled={loading} style={{...actionBtn, background:'#c89b2a', color:'#000'}}>Send</button>
        </div>
      </footer>
    </article>
  )
}

const actionBtn = {
  background:'#171717',
  border:'1px solid #222',
  padding:'8px 10px',
  color:'#c89b2a',
  borderRadius:8,
  cursor:'pointer',
  fontWeight:700
}

const commentInput = {
  flex:1,
  padding:10,
  borderRadius:8,
  border:'1px solid #222',
  background:'#0b0b0b',
  color:'#fff'
}
