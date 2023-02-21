// import { useState } from 'react';
import {RiHomeSmileLine} from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Box from '../components/Box';


const Home = () => {


    // const [load, setLoad]= useState(false);
    
    const welcome= "Welcome | Akwaaba! | WoéZɔr!";
    return ( 
        <section>

            <h1 className="flex text-md font-extrabold mb-6 text-gray-500 text-center sm:text-3xl mt-20 justify-center items-center">
                {welcome}
               <span className='px-1 mx-1'>{<RiHomeSmileLine/>||<Skeleton borderRadius={50}/>}</span>
            </h1>
                     {/* Horizontal ScrollBar */}
                     <div className='scroll-container flex px-2 space-x-2 overflow-x-auto'>
                            <Box/>
                            <Box/>
                            <Box/>
                            <Box/>
                     </div>
                  
        </section>
     );
}
 
export default Home;