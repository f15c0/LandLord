import { useEffect, useState } from "react";
import {AiFillCar} from 'react-icons/ai';
import {MdLocationOn} from 'react-icons/md';
import PageTitle from "../components/PageTitle";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import {doc, getDoc, serverTimestamp, updateDoc} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";


const EditListing = () => {
//Getting auth
const auth = getAuth();

//setting Geolocation State
const [geoLocationEnabled, setGeoLocationEnabled]=useState(true);

//Navigate
const navigate= useNavigate();

//Onchange function to handle input form data
const onChange =(e)=>{
        const{id, value, type, checked, files}=e.target;
            
            //Checking input type is a file
            if (type==="file") {
                // const reader = new FileReader();
                //     reader.onload =(e)=>{
                //         setFormData((prevState)=>({
                //             ...prevState, 
                            
                //             images:[...prevState.images, {
                //                     name: files[0].name,
                //                     data: e.target.result
                //                  },
                //              ]
                //         }));
                //     };
                    // reader.readAsDataURL(files[0]);
                    setFormData((prevState)=>({
                        ...prevState, images:files
                    }))
            } else{
                setFormData((prevState)=>({
                    ...prevState,
                    [id]:type==='checkbox'? checked:value
                }));
            } 

    };

    //Setting Loader State
const [loading, setLoading]= useState(false);

//setting Listing state
const [listing, setListing]= useState(null);

const onSubmit=async (e)=>{
         e.preventDefault();
            setLoading(true);

            //Image Upload
        const storeImage= async (image)=>{

            return new Promise((resolve, reject)=>{
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

                const storageRef=ref(storage, filename);
                
                const uploadTask= uploadBytesResumable(storageRef, image);
                    uploadTask.on('state_changed', 
                            (snapshot) => {
                                // Observe state change events such as progress, pause, and resume
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                                default:
                                    
                                }
                            }, 
                        (error) => {
                            // Handle unsuccessful uploads
                             reject(error);
                        }, 
                        () => {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL);
                            });
                        }
                        );
            })
           

            
        }
        const imgUrls = await Promise.all(
            [...formData.images].map((image)=>storeImage(image)
                )).catch((error)=>{
                        setLoading(false);
                        toast.error("image not uploaded");
                        return;
                    });


                    //fisco: Sieve out data before submitting
        const formDataCopy ={
            ...formData,
                imgUrls,
                timestamp:serverTimestamp(),
                userRef: auth.currentUser.uid,
                author: auth.currentUser.displayName
        };

        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discount;
        const docRef = doc(db, "listings", listingId);
        await updateDoc(docRef, formDataCopy); 
        
            setLoading(false);
             toast.success("Edited successfully");
             navigate(`/category/${formDataCopy.type}/${docRef.id}`)
        
};

        //Getting Params
        const {listingId} = useParams();
        

    const [formData, setFormData] = useState({
        type:'rent', name:'', bedroom:1, bathroom:1, carPark:false, furnished:false, address:'',
        description:'', offer:false, price:0, discount:0, images:{},
        longitude:0, latitude:0
    })

    useEffect(()=>{
        setLoading(true);
        const fetchDetails =async ()=>{

            const docRef = doc(db, "listings", listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setFormData({...docSnap.data()});
                setLoading(false)
            }else{
                navigate('/');
                toast.error("Listing does not exist");
            }

        }
        fetchDetails();
    }, [listingId, navigate]);

    useEffect(()=>{
        if (listing && listing.userRef !== auth.currentUser.uid) {
            toast.error('action not allowed!');
            navigate('/');
            
        }
    }, [auth.currentUser.uid, listing, navigate]);

        //Form Label textStyle
    const formLabel="font-semibold sm:text-sm text-xs";

     if(loading){
        return <Spinner/>
     }
     
    return ( 
        <div className="max-w-md px-2 mx-auto">
                <PageTitle title='Edit Listing' subtitle="Let's get you updated"/>
                <form onSubmit={onSubmit} className="pb-4 mx-4">
                    <p className={formLabel}>Sell / Rent</p>
                    <div className="mt-1 space-x-6 flex justify-between items-center">
                        <button id="type" value='sell' type="button" 
                            className={`font-medium
                            bg-white px-4   py-2 shadow-md uppercase 
                            hover:shadow-lg hover:bg-slate-50 w-full text-sm rounded
                            transition ease-in-out   hover:border-1 focus:shadow-lg active:shadow-lg 
                            
                            ${formData.type==='sell' ? ('bg-slate-50 border-b-4 shadow-xl border-b-emerald-600 hover:text-black') :'bg-white '
                            }`}
                            onClick={onChange}
                        >
                            Sell
                        </button>


                        <button id="type" value='rent' type="button" 
                            className={`font-medium
                            bg-white px-4  py-2 shadow-md uppercase 
                            hover:shadow-lg hover:bg-slate-50 w-full text-sm rounded
                            transition ease-in-out   hover:border-1 focus:shadow-lg active:shadow-lg ${
                                formData.type==='rent' ? ('bg-slate-50 border-b-4 shadow-xl border-b-emerald-600 hover:text-black') :'bg-white '
                                
                            }`}
                            onClick={onChange}
                        >
                            Rent
                        </button>
                    </div>



                        <p className={`py-1 mt-4 ${formLabel}`}>Name</p>
                        <div className="">
                            <input type="text" 
                                id="name" 
                                value={formData.name}
                                onChange={onChange}
                                className="w-full sm:text-sm text-xs mb-4 rounded-md transition duration-150 ease-in-out" placeholder="Property Name" maxLength={64} minLength={6} required/>
                        </div>

                        <div className="flex justify-around space-x-4">
                             <div className="w-full">
                                <p className={formLabel}>Beds:
                                     <span className="text-xs text-emerald-600"> 
                                        {`  ${formData.bedroom} bedroom`} 
                                    </span>
                                </p>
                                    <input type="number" 
                                    id="bedroom"
                                    value={formData.bedroom}
                                    onChange={onChange}
                                    className="w-full sm:text-sm text-xs rounded-md transition duration-150 ease-in-out" 
                                    min={0}
                                    max={50}
                                    required/>
                             </div>

                             <div className="w-full">
                                <p className={formLabel}>Bath: 
                                          {/* Number of Bathrooms */}
                                    <span className="text-xs text-emerald-600"> 
                                        {`  ${formData.bathroom} bathroom`} 
                                    </span>
                                    </p>
                                    <input type="number" 
                                        id="bathroom"
                                        value={formData.bathroom}
                                        onChange={onChange}
                                        className="w-full sm:text-sm text-xs rounded-md transition duration-150 ease-in-out" 
                                        min={0}
                                        max={50}
                                        required
                                        />
                             </div>
                        </div>

                    <div className="flex justify-between"> 
                        <div className="pt-2 mt-2 font-semibold">
                            
                            <p className={`${formLabel} flex justify-center items-center`}>
                            <span className="pr-1">
                                Parking Lot / Spot
                            </span>
                            <AiFillCar className="text-lg text-primary"/> 
                            </p>
                            <label className="mt-2 relative inline-flex items-center cursor-pointer">
                            <input 
                                    type="checkbox" 
                                    id="carPark"
                                    className="sr-only peer"
                                    onChange={onChange}
                                    checked={formData.carPark}
                                    />
                            <div  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">

                            </div>
                            <span className="ml-3 sm:text-sm text-xs font-medium text-gray-900 dark:text-gray-300 uppercase">
                            {formData.carPark ?'Yes':'No'}
                            </span>
                            </label>
                        </div>


                        <div className="pt-2 mt-2 font-semibold">
                            <p className={formLabel}>Furnished</p>
                            <label className="mt-2 relative inline-flex items-center cursor-pointer">
                            <input 
                                    type="checkbox" 
                                    id="furnished"
                                    className="sr-only peer"
                                    onChange={onChange}
                                    checked={formData.furnished}
                                    />
                            <div  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">

                            </div>
                            <span className="ml-3 sm:text-sm text-xs font-medium text-black dark:text-gray-300 uppercase">
                                {formData.furnished ?'Yes':'No'}
                            </span>
                            </label>
                        </div>
                    </div>  

                                {/* Address Form Field  */}
                        <div>
                        <p className={`py-2 mt-1 flex  items-center ${formLabel}`}>
                            <span>
                                 Address / Location
                            </span>
                            <MdLocationOn className="text-lg text-primary"/> 
                            
                        </p>
                        <div className="">
                            <textarea type="text" 
                                id="address" 
                                value={formData.address}
                                onChange={onChange}
                                className="w-full mb-1 text-xs sm:text-sm rounded-md transition duration-150 ease-in-out" 
                                placeholder="TrapCity Pub Taifa" 
                                required/>
                        </div>
                        </div>

                        {/* GeoLocation ---- Latitude and Longitude */}

                        {/* Conditionally Rendering the Geolocation Fields */}

                            {!geoLocationEnabled && (
                            <div className="flex justify-between space-x-4">
                            <div className="w-[35%]">
                                    <p className={formLabel}>Latitude</p>
                                        <input type="number" 
                                            id="latitude"
                                            value={formData.latitude}
                                            onChange={onChange}
                                            className="w-full text-xs sm:text-sm rounded-md transition duration-150 ease-in-out" 
                                            required
                                            />
                             </div>

                             <div className="w-[35%]">
                                <p className={formLabel}>Longitude</p>
                                    <input type="number" 
                                        id="longitude"
                                        value={formData.longitude}
                                        onChange={onChange}
                                        className="w-full text-xs sm:text-sm rounded-md transition duration-150 ease-in-out" 
                                        />
                             </div>
                        </div>
                        
                        )} {/* End of Conditional Rendering the Geolocation */}
                        



                                {/* Description Form field */}
                    <div>        
                        <p className={`py-2 mt-1 ${formLabel}`}>Description</p>
                        <div className="">
                            <textarea type="text" 
                                id="description" 
                                value={formData.description}
                                onChange={onChange}
                                className="w-full  text-xs sm:text-sm  rounded-md transition duration-150 ease-in-out" 
                                placeholder="Huge condo, Gated, Close proximity to roadside and wi-fi Available" 
                                required/>
                        </div>
                    </div> 

                                {/* offer form field */}
                    <div className="pt-2 mt-1 font-semibold">
                            <p className={formLabel}>Offer</p>
                            <label className="mt-2 relative inline-flex items-center cursor-pointer">
                            <input 
                                    type="checkbox" 
                                    id="offer"
                                    className="sr-only peer"
                                    onChange={onChange}
    
                                    />
                            <div  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">

                            </div>
                            <span className="ml-3 sm:text-sm text-xs font-medium text-gray-900 dark:text-gray-300 uppercase">
                            {formData.offer ?'Yes':'No'}
                            </span>
                            </label>
                        </div>
                            
                            {/* Pricing form field */}
                        <div className="flex justify-between space-x-4">
                            <div className="w-[50%] flex justify-center items-center space-x-2">
                                <span>
                                    <p className={formLabel}>Price:</p>
                                        <input type="number" 
                                            id="price"
                                            value={formData.price}
                                            onChange={onChange}
                                            className="w-full text-xs sm:text-sm rounded-md transition duration-150 ease-in-out" 
                                            min={0}
                                            required
                                            />
                                </span>
                                
                                        <span className="text-sm pt-2">
                                            Gh¢/month
                                        </span>
                             </div>

                             <div className="w-[35%]">
                                <p className={formLabel}>Discount Price: Gh¢</p>
                                    <input type="number" 
                                        id="discount"
                                        value={formData.discount}
                                        onChange={onChange}
                                        className="w-full text-xs sm:text-sm rounded-md transition duration-150 ease-in-out" 
                                        min={0}
                                        />
                             </div>
                        </div>

                        {/* Image Upload Field */}
                        <div className="py-2 mt-3">
                            <label className="block mb-1 text-sm text-center font-medium text-gray-900 dark:text-primary" htmlFor="image">
                                Upload image
                            </label>
                                    {/* helping text */}
                            
                            <input 
                                className="block shadow-xl shadow-slate-300 w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 transition duration-150 ease-in-out" 
                                id="images" 
                                type="file" 
                                onChange={onChange}
                                accept=".jpg,.jpeg,.png"
                                required
                                multiple/>
                                <h6 className=" pt-1 block text-xs text-center font-medium text-gray-400 dark:text-gray-500" htmlFor="image">
                                Make a splash with your first photo, it'll be the cover! 
                                <span className="text-primary"> (6 max)</span>
                            </h6>
                    </div>

                    <button type="submit" 
                        className="text-xs sm:text-sm text-white text-center mt-2 px-6 rounded transition ease-in-out pt-3 border-b-8 border-b-primary font-semibold bg-blue-500  hover:bg-blue-400 hover:text-white w-full uppercase  hover:shadow-md active:bg-blue-800">Update
                    </button>
                </form>
        </div>
   
     );
}
 
export default EditListing;
