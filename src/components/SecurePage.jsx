import { Navigate, Outlet  } from "react-router-dom";
import useAuth from '../hooks/useAuth';
const SecurePage = () => {

    //Using Custom hook 'UseAuth' to check if the user is Logged In!...........
        const {loggedIn, checkStatus}= useAuth();
         if(checkStatus){
            return <h2>Loading...</h2>
         }

        //Return SecurePage if the User is Logged in OR Validates to True! Else Return Sign in Page
    return loggedIn ? 
                <Outlet/>
                            : 
                 <Navigate to='/sign-in' />
}
 
export default SecurePage;