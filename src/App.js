import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Offer from './pages/Offer';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';

import ForgotPass from './pages/ForgotPass';
import SignUp from './pages/SignUp';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SecurePage from './components/SecurePage';
import Listing from './pages/CreateListing';
import NotFound from './pages/404';
import Layout from './Layout';
import { SkeletonTheme } from 'react-loading-skeleton';
import EditListing from './pages/EditListing';
import ListingView from './pages/Listing';

function App() {
  return (
    <>
    <SkeletonTheme>
     <BrowserRouter>
     <Layout>
          <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/offers' element={<Offer/>}/>
      
            {/* Secure Route */}
            <Route path='/profile' element={<SecurePage/>}>
               <Route path='/profile' element={<Profile/>}/>
               <Route path='/profile/create-listing' element={<Listing/>}/>
             </Route>
              <Route path='/sign-in' element={<SignIn/>}/>
              <Route path='/sign-up' element={<SignUp/>}/>
              <Route exact={true} path='/forgot-password' element={<ForgotPass/>}/>
              <Route path='/profile' element={<SecurePage/>}>
               <Route path='/profile/edit-listing/:listingId' element={<EditListing/>}/>
             </Route>
             <Route path='*' element={<NotFound/>}></Route>
             <Route path='/category/:catName/:listingId' element={<ListingView/>}/>
        </Routes>
      </Layout>
      </BrowserRouter>
      </SkeletonTheme>
      
      {/* Toast goes here */}
      <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme="light"
        />
         
    </>
  );
}

export default App;
