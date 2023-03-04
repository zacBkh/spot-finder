import NavigationBar from './navbar/navigation-bar'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main className="mt-3 mx-auto">{props.children}</main>
        </>
    )
}

export default Layout
