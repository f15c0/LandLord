import bugger from '../assets/404/bugger.png';
import oops from "../assets/404/404.png";
import {RiHomeGearFill} from 'react-icons/ri';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return ( 
        <div className="text-center flex items-center justify-center pt-20 mt-10 flex-col ">
            <img src={oops} alt='Not Found' className='sm:h-96 h-64 '/>
            
            <h1 className='font-bold text-2xl mt-2'>Page Not Found!</h1>
            <p className='text-gray-400'>Please Go Back Home</p>
            <Link to='/'>
            <RiHomeGearFill className='text-2xl text-teal-500 cursor-pointer hover:shadow-sm 
            duration-150 transition
            '/>
            </Link>
            
        </div>
     );
}
 
export default NotFound;