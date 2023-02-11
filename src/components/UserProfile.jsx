import { useRef, useState } from "react";
import {getAuth, updateProfile} from "firebase/auth";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
  //Defining Styles
  const editStyle="xs:text-xs text-red-700 ml-1 cursor-pointer transition ease-in-out duration-200 hover:text-red-800" ;

  const applyStyle="xs:text-xs text-blue-700 ml-1 cursor-pointer transition ease-in-out duration-200 hover:text-blue-800";

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
    return ( 
            <div>         
                <form  className="md:w-[50%] mx-auto px-4 flex flex-col justify-center">
                   
                          <input    type="text" 
                                    ref={editRef}
                                    value={name} 
                                    className={edit ? "w-full focus:border-l-4 focus:ring-0 focus:border-2 focus:border-red-700 bg-white form-input px-4 py-3 rounded-b-2xl font-semibold border-l-4 border-l-red-700 text-base text-black border-1 border-red-800" :`w-full form-input px-4 py-3 rounded-b-2xl font-semibold border-l-4 bg-gray-50 border-l-blue-700 text-base text-gray-400 border-1 border-gray-300`}
                                    onChange={e=>setFormData({...formData, name:e.target.value})}
                                    name="name"
                                    disabled={!edit}
                                    required
                            />
                            <input type="email" 
                                    value={email} 
                                    className="w-full form-input border-l-4 border-l-blue-700 px-4 py-3 my-4 rounded-b-2xl bg-gray-50 font-semibold text-base text-gray-400 border-1 border-gray-300"
                                    name="email"
                                    disabled    
                            />
                            <div className="sm:text-lg md:text-base text-sm flex justify-between content-center items-center whitespace-nowrap">
                                <p className="flex items-center ">Do you want to change your name? 
                                    <span onClick={()=>
                                        {   edit && onSubmit();
                                            editRef.current.focus();
                                            setEdit((prevState)=>!prevState)}
                                        }>
                                       {edit ? (<span className={applyStyle}>Apply Changes</span>): <span className={editStyle}>Edit</span>} 
                                    </span></p>
                                <p className="text-blue-700 cursor-pointer hover:text-blue-800 transition ease-in-out duration-200" onClick={logOut}>Sign Out</p>
                            </div>
                </form>
           </div>
     );
}
 
export default UserProfile;