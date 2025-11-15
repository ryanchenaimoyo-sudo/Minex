import useSWR from 'swr'
import PostCard from '../components/PostCard'

const fetcher = url => fetch(url).then(r=>r.json())

export default function Feed(){
  const { data, mutate } = useSWR('/api/listPosts', fetcher, { refreshInterval: 3000 })
  const posts = data?.posts || []

  return (
    <div style={{padding:16}}>
      <h2 style={{color:'#c89b2a'}}>Feed</h2>
      {posts.length===0 && <div>No posts yet</div>}
      {posts.map(p => <PostCard key={p.id} post={p} mutate={mutate} />)}
    </div>
  )
}
