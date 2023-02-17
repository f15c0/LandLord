import { useEffect, useRef, useState } from "react";
import {getAuth, updateProfile} from "firebase/auth";
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {IoMdHome} from 'react-icons/io';
import ListingCard from "../components/ListingItem";


  //Defining Styles
  const editStyle="xs:text-xs text-primary ml-1 cursor-pointer transition ease-in-out duration-200 hover:text-red-800" ;

  const applyStyle="xs:text-xs text-blue-700 ml-1 cursor-pointer transition ease-in-out duration-200 hover:text-blue-800";

const UserProfile = () => {

    const [listings, setListings]= useState(null);
    const navigate = useNavigate();
    //Getting User Details from Authentication

    const auth = getAuth();

    //Setting User State
    const [formData, setFormData]=useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email
    });
     const {name, email}= formData;

     const [edit, setEdit]= useState(false)

     const logOut = ()=>{
        auth.signOut();
        navigate('/');
     }

     const onSubmit = async()=>{
            try {
                if (auth.currentUser.displayName !== name) {
                    //Updating User Name to Firebase
                    await updateProfile(auth.currentUser, {
                        displayName:name
                    });

                    //Updating firestore storage
                    const docRef = doc(db, 'users', auth.currentUser.uid);
                    await updateDoc(docRef, {
                        name
                    });

                    toast.success("Profile Updated!")

                }else{
                    toast.warn("No Changes")
                }

            } catch (error) {
                toast.error("could not update user")
            }
    }
     const editRef = useRef();

     //UseEffect to get Listings from Db
     useEffect(() => {
        const fetchListings= async ()=>{
            const listingRef = collection(db, "listings");
           
            //Making a query.
            const q = query(
                    listingRef, 
                    where("userRef", "==", auth.currentUser.uid), 
                    orderBy("timestamp", "desc"));

            const querySnap = await getDocs(q);
            let listings = [];

            querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            });
            setListings(listings);
        };
        fetchListings();
     }, [auth.currentUser.uid])



    return (  
        <main className="h-screen">
            <section className="md:w-[50%] mx-auto px-4 flex flex-col justify-center">         
                <form >
                          <input    
                                    type="text" 
                                    ref={editRef}
                                    value={name} 
                                    className={edit ? "w-full focus:border-l-4 focus:ring-0 focus:border-2 focus:border-red-700 bg-white form-input px-4 py-3 rounded-b-2xl font-semibold border-l-4 border-l-red-700 text-sm   sm:text-base text-black border-1 border-red-800" :
                                            
                                    // Changes Styles
                                    `w-full form-input  px-4 py-3 rounded-b-2xl font-semibold border-l-4 bg-gray-50 border-l-blue-800 text-sm sm:text-base text-gray-500 border-1 border-gray-300`}
                                    onChange={e=>setFormData({...formData, name:e.target.value})}
                                    name="name"
                                    disabled={!edit}
                                    required
                            /> 
                            <input type="email" 
                                    value={email} 
                                    className="w-full form-input border-l-4 border-l-blue-800 px-4 py-3 my-4 rounded-b-2xl bg-gray-50 font-semibold text-base text-gray-500 border-1 border-gray-300"
                                    name="email"
                                    disabled    
                            />
                            <div className="sm:text-lg md:text-base text-xs flex justify-between content-center items-center whitespace-nowrap mb-4" >
                                <p className="flex items-center ">Do you want to change your name? 
                                    <span onClick={()=>
                                        {   edit && onSubmit();
                                            editRef.current.focus();
                                            setEdit((prevState)=>!prevState)}
                                        }>
                                       {edit ? (<span className={applyStyle}>Apply Changes</span>): <span className={editStyle}>Edit</span>} 
                                    </span></p>
                                <p className="text-blue-700 cursor-pointer hover:text-blue-800 transition ease-in-out duration-200 text-xs sm:text-base" onClick={logOut}>Sign Out</p>
                            </div>
                </form>
                
                <Link to="./create-listing">
                    <button className="flex justify-center items-center text-sm text-center my-8 mt-2 px-6 rounded-lg transition ease-in-out py-3 border-0 bg-blue-700 text-white hover:bg-blue-600 w-full uppercase  hover:shadow-md active:bg-blue-800 shadow-gray-500">
                        <span  className="flex justify-center items-center">
                                <IoMdHome className=" text-blue-800 text-lg sm:text-2xl shadow-lg bg-white rounded-full border-0"/>
                                <span className="mx-1 text-xs sm:text-sm font-medium"> Sell or Rent Your Home</span>
                                
                        </span>
                    </button>
                </Link>   
           </section>

           <div className="max-w-6xl mt-2 mx-auto">
                    {listings && listings.length > 0 && (
                        <div>
                            <h1 className="text-center font-bold text-base sm:text-2xl">My Listings</h1>
                                
                            <ul className="sm:grid sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4 s my-6 ">
                                {listings.map((listing)=>(
                                    
                                    <ListingCard 
                                        listing={listing.data} 
                                        key={listing.id} 
                                        id={listing.id}/>
                                ))}
                            </ul>
                        </div>
                    )}
           </div>
         </main>
     );
}
 
export default UserProfile;