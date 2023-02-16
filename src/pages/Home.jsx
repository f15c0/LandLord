// import { useState } from 'react';
import {RiHomeSmileLine} from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const Home = () => {

    // const [load, setLoad]= useState(false);
    
    const welcome= "Welcome | Akwaaba! | WoéZɔr!";
    return ( 
        <section>

            <h1 className="flex text-md font-extrabold text-gray-500 text-center sm:text-3xl mt-20 justify-center items-center">
                {welcome}
               <span className='px-1 mx-1'>{<RiHomeSmileLine/>||<Skeleton borderRadius={50}/>}</span>
            </h1>
            
        </section>
     );
}
 
export default Home;