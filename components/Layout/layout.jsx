import NavigationBar from './navbar/navigation-bar'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main className="mt-6 lg:mt-12 xl:mt-14 2xl:mt-16">{props.children}</main>
        </>
    )
}

export default Layout
