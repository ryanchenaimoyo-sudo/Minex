import Link from 'next/link'

export default function Home(){
  return (
    <div style={{minHeight:'100vh', background:'#070707', color:'#eee', fontFamily:'Inter, Arial, sans-serif'}}>
      <header style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:16, borderBottom:'1px solid #121212', background:'#080808'
      }}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{
            width:46, height:46, borderRadius:10, background:'#c89b2a',
            display:'flex',alignItems:'center',justifyContent:'center', fontWeight:800, color:'#000'
          }}>MX</div>
          <h1 style={{margin:0, fontSize:20}}>MineX</h1>
        </div>

        <nav style={{display:'flex', gap:10, alignItems:'center'}}>
          <Link href="/feed"><a style={navBtn}>Feed</a></Link>
          <Link href="/create-post"><a style={navBtn}>Create</a></Link>
          <Link href="/chat"><a style={navBtn}>Chat</a></Link>
          <Link href="/profile/replace-id"><a style={navBtn}>Profile</a></Link>
          <Link href="/login"><a style={{...navBtn, background:'#111', color:'#c89b2a'}}>Login</a></Link>
        </nav>
      </header>

      <main style={{maxWidth:980, margin:'28px auto', padding:'0 16px'}}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 320px',
          gap:18,
          alignItems:'start'
        }}>
          <section style={{minHeight:400}}>
            <h2 style={{color:'#c89b2a', marginTop:0}}>Welcome to MineX</h2>
            <p style={{color:'#bbb'}}>Connect with miners, dealers and brokers. Post deals, chat, and grow your network.</p>
            <div style={{marginTop:12}}>
              <Link href="/feed"><a style={cta}>Open Feed</a></Link>
            </div>
          </section>

          <aside style={{position:'sticky', top:20}}>
            <div style={{background:'#0f0f10', padding:12, borderRadius:10, border:'1px solid #222'}}>
              <h4 style={{margin:'0 0 8px 0'}}>Tips</h4>
              <ul style={{margin:0, paddingLeft:18, color:'#bbb'}}>
                <li>Use clear titles for posts</li>
                <li>Upload one image per post</li>
                <li>Verify profile to enable contact details</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

const navBtn = {
  background: '#0f0f10',
  color: '#c89b2a',
  padding: '8px 10px',
  borderRadius: 8,
  textDecoration: 'none',
  border: '1px solid #222',
  fontWeight:700
}

const cta = {
  display:'inline-block', padding:'10px 14px', borderRadius:10,
  background:'#c89b2a', color:'#000', fontWeight:800, textDecoration:'none'
}
