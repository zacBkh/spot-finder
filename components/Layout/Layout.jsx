import Navigation from "./Navbar"


const Layout = (props) => {


    return (
        <>
            <Navigation />
            <main>{props.children}</main>

        </>
    )
}

export default Layout 