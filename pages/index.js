import Link from 'next/link'

export default function Home() {
  return (
    <div style={{padding:16, fontFamily:'Arial, sans-serif', background:'#070707', color:'#eee', minHeight:'100vh'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center', marginBottom:20}}>
        <h1 style={{color:'#c89b2a'}}>MineX</h1>
        <div>
          <Link href="/signup"><a style={button}>Sign up</a></Link>
          <Link href="/login"><a style={{...button, marginLeft:8}}>Sign in</a></Link>
        </div>
      </header>

      <section style={{display:'grid',gap:12}}>
        <div style={card}>
          <h3>App pages (tap to open)</h3>
          <ul>
            <li><Link href="/create-post"><a style={link}>Create Post</a></Link></li>
            <li><Link href="/profile/replace-with-profile-id"><a style={link}>Profile (replace id)</a></Link></li>
            <li><Link href="/chat"><a style={link}>Chat</a></Link></li>
          </ul>
        </div>

        <div style={card}>
          <h3>Quick checks</h3>
          <ol>
            <li>Make sure <b>lib/supabaseClient.js</b> exists and env vars are set in Vercel.</li>
            <li>Go to Supabase SQL and confirm tables exist.</li>
            <li>If you just pushed files, wait a minute for Vercel to rebuild and then refresh the page.</li>
          </ol>
        </div>

        <div style={card}>
          <h3>Need help?</h3>
          <div>Send me the Vercel deployment log error text (if any). Or say "check logs" and I'll tell you where to tap.</div>
        </div>
      </section>
    </div>
  )
}

const button = {
  background: '#c89b2a',
  color: '#000',
  padding: '8px 10px',
  borderRadius: 8,
  textDecoration: 'none',
  fontWeight: 700
}

const card = {
  background: '#0f0f10',
  padding: 12,
  borderRadius: 8,
  border: '1px solid #222'
}

const link = {
  color: '#c89b2a',
  textDecoration: 'underline'
}