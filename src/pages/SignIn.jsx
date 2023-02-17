import { useState } from "react";
import {VscEyeClosed,VscEye } from 'react-icons/vsc';
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import PageTitle from "../components/PageTitle";
import landman from "../assets/landman.png";
import OTest from "../components/OTest";

const SignIn = () => {
const navigate = useNavigate();
const [formData, setFormData]=useState({
    email:"",
    password:""
});

//State of showing password
const [showPass, setShowPass]=useState(false);

//function to handleSubmit
const handleSubmit= async (e)=>{
        e.preventDefault();
        const {email, password}= formData;

        try{
            const auth = getAuth();
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            if(userCredentials.user){
                navigate('/profile'); 
            }
        }catch(error){
            toast.error('Invalid User credentials')
        }
}

    return (
        <section>
            <PageTitle title="SIGN IN"/>
                <div className="flex justify-center flex-wrap items-center px-6 pt-1 mx-auto max-w-7xl">
                        <div className="w-full md:w-[70%] lg:w-[50%]">
                                <img src={landman} alt="Sign-in"
                                className=" rounded-2xl"
                                />
                        </div>

                <div className="w-full md:w-[70%] lg:w-[50%]">
                    {/* Form Here */}
                    <form onSubmit={handleSubmit} className="mt-3" >
                        <input type="email" 
                            placeholder="Email" 
                            className="w-full form-input px-4 pb-3 text-sm sm:text-base rounded-lg"
                            required
                            name="email"
                            value={formData.email}
                            onChange={e=>setFormData((prevState)=>({...prevState, email:e.target.value}))}
                            />
                            <div className="relative">
                            <input 
                            type={showPass?'text':'password'} 
                            placeholder="Password" 
                            className="w-full form-input mt-4 px-4 py-3 text-sm sm:text-base rounded-md"
                            required
                            name="password"
                            value={formData.password}
                            onChange={e=>setFormData((prevState)=>({...prevState, password:e.target.value}))}
                        />
                                 {showPass ? <VscEye className="absolute right-3 top-[50%] cursor-pointer hover:text-red-700 hover:text-xl" onClick={()=>{setShowPass(false)}}/>:<VscEyeClosed className="absolute right-3 top-[50%] cursor-pointer hover:text-red-700 hover:text-xl" onClick={()=>{setShowPass(true)}}/>}
                            </div>
                       
                       <div className="flex justify-between mt-3">
                            <p> <span className="font-normal text-sm sm:text-base">Don't have an account? </span>{' '} 
                                <Link to='/sign-up' className="text-red-700 text-sm sm:text-base">Register</Link>
                            </p>
                            <p><Link to='/forgot-password' className="text-blue-700 transition duration-200 ease-in-out text-sm sm:text-base">Forgot Password?</Link></p>
                       </div>
                        
                        <button type="submit" className="text-center mt-6 px-6 rounded-lg transition ease-in-out py-2 border-none bg-blue-700 text-white hover:bg-blue-400 w-full uppercase shadow-sm hover:shadow-md active:bg-blue-800 shadow-gray-500 text-sm sm:text-base">Sign in</button>

                        <div className="mt-5 mb-3 flex items-center before:border-t before:flex-1  before:border-gray-300  after:border-t after:flex-1  after:border-gray-300">
                        <p className="text-center mx-4 font-semibold">OR</p>
                    </div> 
                        <div className="flex justify-center items-center space-x-6 mb-4">
                            <OAuth/>
                            <OTest/>
                        </div>
                       
                    </form>
                </div>
           </div>
        </section>
    );
}
 
export default SignIn;