import Navigation from "./Navbar";
import NavigationBar from "./navbar-final";

const Layout = (props) => {
  return (
    <>
      <Navigation />
      {/* <NavigationBar /> */}
      <main className="mt-24 px-3 mx-auto">{props.children}</main>
    </>
  );
};

export default Layout;
