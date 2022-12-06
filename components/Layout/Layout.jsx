import Navigation from "./Navbar"


const Layout = (props) => {


    return (
        <>
            <Navigation />
            <main className="mt-24">{props.children}</main>

        </>
    )
}

export default Layout 