import NavigationBar from './navbar/navigation-bar'
import Footer from './footer.jsx'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main
                className="mt-1 lg:mt-2 2xl:mt-4
            min-h-[40vh] md:min-h-[60vh]"
            >
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
