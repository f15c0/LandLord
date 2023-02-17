import {MdFacebook} from 'react-icons/md';
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';
//import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult,} from "firebase/auth";

import { getAuth, FacebookAuthProvider, signInWithPopup} from 'firebase/auth';


const OTest = () => {
    const navigate = useNavigate();
    
    //Handle the Submit
    const facebookSubmit= async ()=>{
        try{
            const auth = getAuth();
            const provider = new FacebookAuthProvider();
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
            toast.error("there is an error");
        }
    }

    return ( 
        <button type='button'  className='hover:cursor-pointer transition ease-in-out shadow-sm hover:shadow-md'>
            <MdFacebook onClick={facebookSubmit} className='rounded-3xl text-blue-700 text-3xl shadow-md border-0'/>
        </button>
     );
}
 
export default OTest;