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
        <button type='button' onClick={googleSubmit} className=" transition ease-in-out  border-none  text-white b shadow-sm hover:shadow-md  shadow-gray-500">
            <FcGoogle className='text-3xl  rounded-full'/>
        </button>
     );
}
 
export default OAuth;