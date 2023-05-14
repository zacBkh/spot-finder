import NavigationBar from './navbar/navigation-bar'
import Footer from './footer.jsx'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main className="mt-2 lg:mt-4 px-1 sm:px-4 2xl:px-8">{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout
