import '../styles/globals.css'
import Layout from '../components/Layout/Layout'

import { SessionProvider } from "next-auth/react"


// For loading bar
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import '../styles/nprogress.css'




const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {



  const router = useRouter()

  // nProgress Bar
  useEffect(() => {
    // Tells NProgress to start/stop depending on the router state
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())


    // // Clean up fx ?
    return () => {
      router.events.off('routeChangeStart', NProgress.start())
      router.events.off('routeChangeComplete', NProgress.done())
      router.events.off('routeChangeError', NProgress.done())
    }

  }, [router])




  return (
    <SessionProvider session={session}>

      <Layout>
        <Component {...pageProps} />
      </Layout>

    </SessionProvider>
  )
}

export default MyApp


