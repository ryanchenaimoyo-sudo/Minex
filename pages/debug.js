// pages/debug.js
export default function Debug() {
  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h2>MineX Debug</h2>
      <p>Open <code>/api/health</code> for environment & Supabase test.</p>
      <p>Check Vercel build logs if your pages 404 or show blank.</p>
    </div>
  )
}