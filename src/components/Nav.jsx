import { Link, useLocation } from "react-router-dom";
//import logo from '../assets/logo.svg';
import land from '../assets/logo.png';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {GiExitDoor} from "react-icons/gi";
import {FaUserCircle} from "react-icons/fa";

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
     const activeNavLink="text-black text-base border-b-4 sm:py-4 border-b-red-700";

    return ( 
        <div className="border-b-2 shadow-sm">
        <div className="sm:flex sm:justify-between px-3 sm:px-10 items-center sm:max-w-6xl sm:mx-auto py-2 bg-white border-b-2  sticky top-0 z-30" >
            <header className=" flex justify-between items-center">
                <GiExitDoor className="sm:hidden text-3xl cursor-pointer hover:text-red-700 transition ease-in-out text-red-900"/>

                {/* Logo Goes Here! */}
                <Link to='/'><img src={land} alt="Logo" className="h-10 sm:h-12 transition ease-in-out duration-150"/>
                </Link>
                
                {/* User Profile */}
                <Link to='/profile'>
                    <FaUserCircle className="sm:hidden text-3xl cursor-pointer hover:text-red-700 transition ease-in-out text-red-900"/>
                </Link>
            </header>
            <nav className="hidden sm:inline-flex">
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