import NavigationBar from './navbar/navigation-bar'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main className="mt-2 lg:mt-4 xl:mt-6">{props.children}</main>
        </>
    )
}

export default Layout
