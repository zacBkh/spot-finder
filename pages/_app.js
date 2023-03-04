import '../styles/globals.css'

import Layout from '../components/Layout/layout'
import { ToastContainer } from 'react-toastify'

import { SessionProvider } from 'next-auth/react'

// For loading bar
import { useState, useEffect } from 'react'
import NProgress from 'nprogress'
import '../styles/nprogress.css'

import AppContext from '../context/AppContext'
import Toaster from '../components/toaster-wrapper'

const MyApp = ({ Component, pageProps: { session, ...pageProps }, router }) => {
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
                    <Toaster />
                    <Component {...pageProps} />
                </Layout>
            </AppContext.Provider>
        </SessionProvider>
    )
}

export default MyApp
