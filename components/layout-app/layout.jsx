import NavigationBar from './navbar/navigation-bar'
import Footer from './footer.jsx'

import { useSession } from 'next-auth/react'

const Layout = props => {
    const session = useSession()
    return (
        <>
            <NavigationBar userSession={session} />
            <main
                className="mt-1 lg:mt-2 2xl:mt-4
                min-h-[40vh] md:min-h-[60vh]"
            >
                {props.children}
            </main>
            <Footer userSession={session} />
        </>
    )
}

export default Layout
