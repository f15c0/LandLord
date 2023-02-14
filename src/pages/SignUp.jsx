import { useState } from "react";
import {VscEyeClosed,VscEye } from 'react-icons/vsc';
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from '../firebase';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import PageTitle from "../components/PageTitle";



const SignUp = () => {

const navigate= useNavigate();
const [formData, setFormData]=useState({
    name:"",
    email:"",
    password:""
});


//State of showing password
const [showPass, setShowPass]=useState(false);

//function to handleSubmit
const  handleSubmit= async (e)=>{
        e.preventDefault();
    const {name, email, password}=formData;
        try{
            const auth = getAuth();
            const userCredentials= await createUserWithEmailAndPassword(auth, email, password);
          
           updateProfile(auth.currentUser, {displayName:name});
           const user = userCredentials.user;
           const userDetails = {...formData};
           delete userDetails.password;
           userDetails.timestamp = serverTimestamp();

          await setDoc(doc(db, 'users', user.uid), userDetails);
                //toast.success('Account Created Successfully!')
            //Redirect the user to home
                navigate('/')
        } catch (error){
                toast.error('Something Went Wrong!')
        }
       
}

    return (
        <section>
                <PageTitle title="SIGN UP"/>
           <div className="flex justify-center flex-wrap items-center px-6 py-3 mx-auto max-w-7xl">
                <div className="w-full md:w-[70%] lg:w-[50%]">
                        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="Key"
                        className=" rounded-2xl"
                        />

                    
                </div>

                <div className="w-full md:w-[70%] lg:w-[50%] ">
                    {/* Form Here */}
                    <form onSubmit={handleSubmit} className="mt-6" >
                    <input type="text" 
                            placeholder="Full name" 
                            className="w-full form-input px-4 py-3 rounded-lg mb-4"
                            required
                            name="name"
                            value={formData.name}
                            onChange={e=>setFormData((prevState)=>({...prevState, name:e.target.value}))}
                            />
                        <input type="email" 
                            placeholder="Email" 
                            className="w-full form-input px-4 py-3 rounded-lg"
                            required
                            name="email"
                            value={formData.email}
                            onChange={e=>setFormData((prevState)=>({...prevState, email:e.target.value}))}
                            />
                            <div className="relative">
                            <input 
                            type={showPass?'text':'password'} 
                            placeholder="Password" 
                            className="w-full form-input mt-4 px-4 py-3 rounded-md"
                            required
                            name="password"
                            value={formData.password}
                            onChange={e=>setFormData((prevState)=>({...prevState, password:e.target.value}))}
                        />
                                 {showPass ? <VscEye className="absolute right-3 top-[50%] cursor-pointer hover:text-red-700 hover:text-xl" onClick={()=>{setShowPass(false)}}/>:<VscEyeClosed className="absolute right-3 top-[50%] cursor-pointer hover:text-red-700 hover:text-xl" onClick={()=>{setShowPass(true)}}/>}
                            </div>
                       
                       <div className="flex justify-between mt-3">
                            <p> <span className="font-normal">Have an account? </span>{' '} 
                                <Link to='/sign-in' className="text-red-700">Log in</Link>
                            </p>
                            <p><Link to='/forgot-password' className="text-blue-700 transition duration-200 ease-in-out">Forgot Password?</Link></p>
                       </div>
                        
                        <button type="submit" className="text-base text-center mt-6 px-6 rounded-lg transition ease-in-out py-3 border-none bg-blue-700 text-white hover:bg-blue-400 w-full uppercase shadow-sm hover:shadow-md active:bg-blue-800 shadow-gray-500">Sign Up</button>

                        <div className="my-6 flex items-center before:border-t before:flex-1  before:border-gray-300  after:border-t after:flex-1  after:border-gray-300">
                        <p className="text-center mx-4 font-semibold">OR</p>
                    </div>
                    <OAuth/>
                    </form>
                    
                </div>
           </div>
        </section>
    );
}
 
export default SignUp;