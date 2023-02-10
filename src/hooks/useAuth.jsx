import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
        
    //Setting state to check if user is logged in.
    const [loggedIn, setLoggedIn] = useState(false);

    //setting state to check user
    const [checkStatus, setCheckStatus]= useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedIn(true);
            }
            setCheckStatus(false);
           
        })
        
    }, [])
    
    return {loggedIn, checkStatus};
}
 
export default useAuth;