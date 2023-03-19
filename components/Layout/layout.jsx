import NavigationBar from './navbar/navigation-bar'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main className="mt-1 lg:mt-2 xl:mt-3">{props.children}</main>
        </>
    )
}

export default Layout
