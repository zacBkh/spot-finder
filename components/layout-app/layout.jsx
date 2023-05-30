import NavigationBar from './navbar/navigation-bar'
import Footer from './footer.jsx'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main className="mt-1 lg:mt-3 2xl:mt-4">{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout
