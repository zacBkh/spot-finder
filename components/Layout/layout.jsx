import NavigationBar from './navbar/navigation-bar'

const Layout = props => {
    return (
        <>
            <NavigationBar />
            <main className="mt-2 lg:mt-4 xl:mt-6 pl-2 pr-8 2xl:pl-4 2xl:pr-10">
                {props.children}
            </main>
        </>
    )
}

export default Layout
