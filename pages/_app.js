import '../styles/globals.css'

import Layout from '../components/Layout/layout'

import { SessionProvider } from 'next-auth/react'

// For loading bar
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NProgress from 'nprogress'
import '../styles/nprogress.css'

import AppContext from '../context/AppContext'

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

    // State manaegement for context
    const [searchQuery, setSearchQuery] = useState('')

    // Holder of all global data we want to put into context
    const searchBarContext = {
        value: searchQuery,
        addSearch: query => {
            setSearchQuery(query)
        },
    }

    return (
        <SessionProvider session={session}>
            <AppContext.Provider value={searchBarContext}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppContext.Provider>
        </SessionProvider>
    )
}

export default MyApp
