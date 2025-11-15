import Link from 'next/link'

export default function Home(){
  return (
    <div style={{padding:16}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{color:'#c89b2a'}}>MineX</h1>
        <div>
          <Link href='/signup'><a style={{background:'#c89b2a',padding:8,borderRadius:6,color:'#000'}}>Sign up</a></Link>
          &nbsp;
          <Link href='/login'><a style={{background:'#c89b2a',padding:8,borderRadius:6,color:'#000'}}>Sign in</a></Link>
        </div>
      </header>

      <main style={{marginTop:20}}>
        <div style={{padding:12,background:'#0f0f10',borderRadius:8}}>
          <h3>App pages</h3>
          <ul>
            <li><Link href='/feed'><a>Feed</a></Link></li>
            <li><Link href='/create-post'><a>Create Post</a></Link></li>
            <li><Link href='/chat'><a>Chat</a></Link></li>
            <li><Link href='/profile/replace-id'><a>Profile (replace id)</a></Link></li>
          </ul>
        </div>
      </main>
    </div>
  )
}


---
