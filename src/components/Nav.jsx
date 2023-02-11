import { Link, useLocation } from "react-router-dom";
//import logo from '../assets/logo.svg';
import land from '../assets/logo.png';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
    const [profile, setProfile]= useState('Sign-In');
    const auth = getAuth()

    //Checking if user is authenticated in the header
    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setProfile(auth.currentUser.displayName);
            }else { setProfile('Sign-In')}
        })
    }, [auth]);

    const location = useLocation();
    
    //function to check the Nav link that is selected
    const activeNav = (path)=>{
        if(path===location.pathname){
            return true;
        }
    }  
    //Active Navbar Link color
     const activeNavLink="text-black text-base border-b-4 py-4 border-b-red-700";

    return ( 
        <div className="border-b-2 shadow-sm">
        <div className="flex  justify-between px-10 items-center max-w-6xl mx-auto py-2 bg-white border-b-2  sticky top-0 z-30" >
            <header>
                <Link to='/'><img src={land} alt="Logo" className="border-b-red-700 h-7 sm:h-12 transition ease-in-out duration-150"/>
                </Link>
            </header>
            <nav>
                <ul className="flex space-x-10 text-sm text-slate-500 font-semibold">
                    <li><Link to="/" className={activeNav('/')?activeNavLink:null}>Home</Link></li> 
                    <li><Link to="/offers" className={activeNav('/offers')?activeNavLink:null}>Offers</Link></li>
                    <li><Link to="/profile" className={activeNav('/sign-in')?activeNavLink:null}>
                             {profile}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
     );
}
 
export default Navbar;