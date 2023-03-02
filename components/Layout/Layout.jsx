import NavigationBar from './navigation-bar'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main className="mt-10 px-3 mx-auto">{props.children}</main>
        </>
    )
}

export default Layout
