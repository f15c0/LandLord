import {RiHomeSmileLine} from 'react-icons/ri'
const Home = () => {
    return ( 
        <section>
            <h1 className="flex text-md font-extrabold text-gray-500 text-center sm:text-3xl mt-20 justify-center items-center">
               Welcome | Akwaaba! | WoéZɔr!
               <span className='px-1 mx-1'><RiHomeSmileLine/></span>
            </h1>
        </section>
     );
}
 
export default Home;