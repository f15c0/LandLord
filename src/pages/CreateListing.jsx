import { useState } from "react";
import Header from "../components/Header";
import {AiFillCar} from 'react-icons/ai';
import {MdLocationOn} from 'react-icons/md'

const Listing = () => {

const onChange =(e)=>{
        const{id, value, checked}=e.target;
        setFormData({...formData,  [id]:e.target.type==='checkbox'? checked:value});
    }

const onSubmit=(e)=>{
         e.preventDefault();
        console.log(formData)
}    

    const [formData, setFormData] = useState({
        type:'rent', name:'', bedroom:1, bathroom:1, carPark:false, furnished:false, address:'',
        description:'', offer:false, price:0, discount:0, image:''
    })

     const formLabel="font-semibold sm:text-sm text-xs";
     
    return ( 
        <main className="max-w-md px-2 mx-auto">
                <Header title='Create Listing' subtitle="Let's get you started"/>
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
                        <div className="py-2 mt-3">
                            <label className="block mb-1 text-sm text-center font-medium text-gray-900 dark:text-primary" htmlFor="image">
                                Upload image
                            </label>
                                    {/* helping text */}
                            
                            <input 
                                className="block shadow-xl shadow-slate-300 w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-primary dark:border-gray-600 dark:placeholder-gray-400 transition duration-150 ease-in-out" 
                                id="image" 
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
                        className="text-xs sm:text-sm text-primary text-center mt-2 px-6 rounded transition ease-in-out pt-3 border-b-8 border-b-primary font-semibold bg-transparent  hover:bg-blue-400 hover:text-white w-full uppercase  hover:shadow-md active:bg-blue-800">Create
                    </button>
                </form>
        </main>
     );
}
 
export default Listing;
