import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout = (props) => {
    return ( 
        <div className="flex flex-col min-h-screen">
            <Header/>
                 <main className="flex-1 px-8 py-2">{props.children}</main>
            <Footer/>
        </div>
     );
}
 
export default Layout;