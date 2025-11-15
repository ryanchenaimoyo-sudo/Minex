import '../styles/globals.css'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }){
  useEffect(()=>{
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(()=>{})
    }
  },[])
  return <Component {...pageProps} />
}
