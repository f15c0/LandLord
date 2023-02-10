import { useState } from "react";
import {getAuth} from "firebase/auth";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
    const navigate = useNavigate();
    //Getting User Details from Authentication
    const auth = getAuth();

    //Setting User State
    const [formData, setFormData]=useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email
    });
     const {name, email}= formData;

     const logOut = ()=>{
        auth.signOut();
        navigate('/');
     }
    return ( 
            <div> 
                <form className="md:w-[50%] mx-auto px-4 flex flex-col justify-center">
                          <input type="text" 
                                    value={name} 
                                    className="w-full form-input px-4 py-3 rounded-b-2xl font-semibold border-l-4 border-l-blue-700 text-base text-gray-400 border-1 border-gray-300"
                                    name="name"
                                    disabled
                            />
                            <input type="email" 
                                    value={email} 
                                    className="w-full form-input border-l-4 border-l-blue-700 px-4 py-3 my-4 rounded-b-2xl font-semibold text-base text-gray-400 border-1 border-gray-300"
                                    name="email"
                                    disabled    
                            />
                            <div className="sm:text-lg md:text-base text-sm flex justify-between content-center items-center whitespace-nowrap">
                                <p className="flex items-center ">Do you want to change your name? 
                                    <span className="xs:text-xs text-red-700 ml-1 cursor-pointer transition ease-in-out duration-200 hover:text-red-800">Edit</span></p>
                                <p className="text-blue-700 cursor-pointer hover:text-blue-800 transition ease-in-out duration-200" onClick={logOut}>Sign Out</p>
                            </div>
                </form>
           </div>
     );
}
 
export default UserProfile;