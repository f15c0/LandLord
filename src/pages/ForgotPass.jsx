import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import PageTitle from "../components/PageTitle";

const ForgotPass = () => {

const [formData, setFormData]=useState({
    email:""
});

//function to handleSubmit
const handleSubmit= async (e)=>{
        e.preventDefault();
        const {email} = formData;
        try{
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);

            toast.success('Reset Link sent successfully');
        }catch(error){
            toast.error('Could not send reset link.');
        }
}

    return (
        <section>
          <PageTitle title="Forgot your keys?" subtitle="Let's Get you in"/>
           <div className="flex justify-center flex-wrap items-center px-6 py-12 mx-auto max-w-7xl">
                <div className="w-full md:w-[70%] lg:w-[50%]">
                        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="Key"
                        className=" rounded-2xl"
                        />

                    
                </div>

                <div className="w-full md:w-[70%] lg:w-[50%] ">
                    {/* Form Here */}
                    <form onSubmit={handleSubmit} className="mt-6" >
                        <input type="email" 
                            placeholder="Email" 
                            className="w-full form-input px-4 py-3 rounded-lg"
                            required
                            name="email"
                            value={formData.email}
                            onChange={e=>setFormData((prevState)=>({...prevState, email:e.target.value}))}
                            />
                            
                       
                       <div className="flex justify-between mt-3">
                            <p> <span className="font-normal">Don't have an account? </span>{' '} 
                                <Link to='/sign-up' className="text-red-700">Register</Link>
                            </p>
                            <p><Link to='/sign-in' className="text-blue-700 transition duration-200 ease-in-out">Sign in instead</Link></p>
                       </div>
                        
                        <button type="submit" className="text-base text-center mt-6 px-6 rounded-lg transition ease-in-out py-3 border-none bg-blue-700 text-white hover:bg-blue-400 w-full uppercase shadow-sm hover:shadow-md active:bg-blue-800 shadow-gray-500">Send Reset Email</button>

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
 
export default ForgotPass;