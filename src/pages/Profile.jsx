import { Suspense, lazy } from "react";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";

const Profile = () => {

   //const UserProfile = lazy(()=>import('../components/UserProfile'))

    return ( 
        <section>
               <Header title='User Profile' subtitle={`Welcome Back Dennis!`}/>
               <UserProfile/>
            
               
               
                  
                
        </section>
     );
}
 
export default Profile;