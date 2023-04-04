import '../styles/globals.css'

import Layout from '../components/Layout/layout'

import { SessionProvider } from 'next-auth/react'

// For loading bar
import { useState, useEffect } from 'react'
import NProgress from 'nprogress'
import '../styles/nprogress.css'

import { SearchBarContext, ModalsContext } from '../context/AppContext'
import Toaster from '../components/toaster-wrapper.jsx'

import DeleteAccountConfirmationModal from '../components/modals/delete-account-confirmation'

const MyApp = ({ Component, pageProps: { session, ...pageProps }, router }) => {
    // nProgress Bar
    useEffect(() => {
        // Tells NProgress to start/stop depending on the router stateG
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

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasUserConfirmed, setHasUserConfirmed] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)

    // Holds modals state context
    const modalsContext = {
        confirmAccountDeletion: {
            isActive: isModalOpen,
            toggleModalState: () => {
                setIsModalOpen(prev => !prev)
            },

            confirmedDeletionHandler: () => {
                setHasUserConfirmed(true)
            },
            hasUserConfirmed: hasUserConfirmed,

            newUserToDeleteHandler: user => {
                setUserToDelete(user)
            },
            userToDelete: userToDelete,
        },
    }

    return (
        <SessionProvider session={session}>
            <ModalsContext.Provider value={modalsContext}>
                <DeleteAccountConfirmationModal
                    modalContextAccountDeletion={modalsContext.confirmAccountDeletion}
                >
                    <SearchBarContext.Provider value={searchBarContext}>
                        <Layout>
                            <Toaster />
                            <Component {...pageProps} />
                        </Layout>
                    </SearchBarContext.Provider>
                </DeleteAccountConfirmationModal>
            </ModalsContext.Provider>
        </SessionProvider>
    )
}

export default MyApp
