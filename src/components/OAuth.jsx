import {FcGoogle} from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';


const OAuth = () => {
    const navigate = useNavigate();
    const googleSubmit= async ()=>{

        try{
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
             

            // // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;

           // The signed-in user info.
           const user = result.user;
           const docRef= doc(db, 'users', user.uid);
           const docSnap = await getDoc(docRef)
           if(!docSnap.exists()){
                await setDoc(docRef, {
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                });
           }
          navigate('/profile');
        }
        catch(error){
            toast.error('Could not authenticate with Google');
        }
    }

    return ( 
        <button type='button' onClick={googleSubmit} className="flex justify-center items-center text-base text-center mt-2 px-6 rounded-lg transition ease-in-out py-3 border-none bg-red-700 text-white hover:bg-red-400 w-full uppercase shadow-sm hover:shadow-md active:bg-red-800 shadow-gray-500">
            <FcGoogle className='mx-1 text-2xl bg-white rounded-md'/>
              Continue with Google
        </button>
     );
}
 
export default OAuth;