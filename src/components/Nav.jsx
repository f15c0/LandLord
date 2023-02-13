import { Link, useLocation } from "react-router-dom";
//import logo from '../assets/logo.svg';
import land from '../assets/logo.png';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {GiExitDoor, GiEntryDoor} from "react-icons/gi";
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
     const activeNavLink="text-black text-base border-l-2 border-l-primary border-rounded sm:border-b-4 sm:py-4 sm:border-l-0 px-1 sm:border-b-primary";

     //Setting toggle state for navBar
     const [isOpen, setIsOpen] =useState(false);


    return ( 
        <div className="border-b-2 shadow-sm">
        <div className="sm:flex sm:justify-between px-3 sm:px-10 items-center sm:max-w-6xl sm:mx-auto py-2 bg-white border-b-2  sticky top-0 z-30" >
            <header className=" flex justify-between items-center">
                <span onClick={()=>setIsOpen(!isOpen)} className="sm:hidden  text-3xl cursor-pointer hover:text-red-800 transition ease-in-out text-primary">
                    {isOpen?<GiEntryDoor/>:<GiExitDoor />}
                </span>
                

                {/* Logo Goes Here! */}
                <Link to='/'><img src={land} alt="Logo" className="h-10 sm:h-12 transition ease-in-out duration-150"/>
                </Link>
                
                {/* User Profile */}
                <Link to='/profile'>
                    <FaUserCircle className="sm:hidden text-3xl cursor-pointer hover:text-red-700 transition ease-in-out text-primary"/>
                </Link>
            </header>
            <nav className={`${isOpen ?'block':'hidden'} sm:inline-flex`}>
                <ul className="flex   sm:space-y-0  flex-col sm:flex-row sm:space-x-10 text-sm text-slate-500 font-semibold">
                        <Link to="/">
                        <li className=" py-2 mt-1 px-2 sm:py-0 hover:bg-slate-50 sm:hover:bg-transparent"><span  className={activeNav('/')?activeNavLink:null}>Home</span></li>
                        </Link>

                         <Link to="/offers">
                            <li className="py-2 mt-1 px-2 sm:py-0 hover:bg-slate-50 sm:hover:bg-transparent">
                                <span className={activeNav('/offers')?activeNavLink:null}>Offers</span>
                            </li>
                         </Link>
                        

                        <Link to="/profile">
                            <li className="py-2 mt-1 px-2 sm:py-0 hover:bg-slate-50 sm:hover:bg-transparent"><span  className={activeNav('/sign-in')?activeNavLink:null}>
                                    {profile}
                                </span>
                            </li>
                        </Link>   
                </ul>
            </nav>
        </div>
        </div>
     );
}
 
export default Navbar;