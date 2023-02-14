import PageTitle from "../components/PageTitle";
import UserProfile from "../components/UserProfile";

const Profile = () => {

   //const UserProfile = lazy(()=>import('../components/UserProfile'))

    return ( 
        <section>
               <PageTitle title='User Profile' subtitle={`Welcome Home Dennis!`}/>
               <UserProfile/> 
        </section>
     );
}
 
export default Profile;