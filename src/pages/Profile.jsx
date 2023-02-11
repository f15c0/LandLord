
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";

const Profile = () => {

   //const UserProfile = lazy(()=>import('../components/UserProfile'))

    return ( 
        <section>
               <Header title='User Profile' subtitle={`Welcome Home Dennis!`}/>
               <UserProfile/> 
        </section>
     );
}
 
export default Profile;