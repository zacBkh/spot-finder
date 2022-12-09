import Navigation from "./Navbar"


const Layout = (props) => {


    return (
        <>
            <Navigation />
            <main
                className="mt-24 px-3 mx-auto">{props.children}
            </main>
        </>
    )
}

export default Layout 