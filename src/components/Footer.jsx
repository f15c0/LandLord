import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Logo2 from '../assets/white.png';

const Footer = () => {
    return ( 
<footer className="w-full left-0 right-0 bottom-0  bg-slate-50  shadow md:px-6 md:py-4 dark:bg-slate-500">
    <div className="sm:flex sm:items-center sm:justify-between">
        <Link to='/' className="flex items-center mx-2 mt-2 pt-2 mb-2 sm:mb-0">
            <img src={Logo} 
                className={`h-8 mr-3 `} 
                data-dark-src={Logo2}
                alt="LandLord Logo" />
        </Link>
        <ul className="flex flex-wrap items-center mb-2 px-3 sm:text-sm text-xs  dark:text-white sm:mb-0 text-gray-500">
            <li>
                <Link to="#" className="mr-4 hover:underline md:mr-6 ">About</Link>
            </li>
            <li>
                <Link to="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
            </li>
            <li>
                <Link to="#" className="mr-4 hover:underline md:mr-6 ">Licensing</Link>
            </li>
            <li>
                <Link to="#" className="hover:underline">Contact</Link>
            </li>
        </ul>
    </div>
    <hr className="mt-2 mb-4  border-gray-300 sm:mx-auto dark:border-slate-200 opacity-80 lg:my-8" />

    <span className="block sm:text-sm text-xs pb-2 mx-2 text-gray-500 sm:text-center dark:text-slate-200">
        © 2023 <Link to={'/'} className="hover:underline">LandLord™</Link>. All Rights Reserved.
    </span>
</footer>

     );
}
 
export default Footer;