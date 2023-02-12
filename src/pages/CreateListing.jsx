import { useState } from "react";
import Header from "../components/Header";

const Listing = () => {

const onChange =(e)=>{
        
        const{id, value}=e.target
        setFormData({...formData, [id]:value});
        console.log(id)
    }

    const [formData, setFormData] = useState({
        type:'rent',
        name:'',
        bedroom:1,
        bathroom:1,
    })

    
    return ( 
        <main className="max-w-md px-2 mx-auto">
                <Header title='Create Listing' subtitle="Let's get you started"/>

                <form>
                   
                    <p className="font-semibold text-lg">Sell / Rent</p>
                    <div className="mt-2 space-x-6 flex justify-between items-center">
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



                    <p className="font-semibold text-lg py-1 mt-4">Name</p>
                        <div className="">
                            <input type="text" 
                                id="name" 
                                value={formData.name}
                                onChange={onChange}
                                className="w-full mb-4 rounded-md transition duration-150 ease-in-out" placeholder="Property Name" maxLength={64} minLength={6} required/>
                        </div>
                        <div className="flex justify-between items-center">
                             <div className="">
                                <p>Beds:
                                     <span className="text-xs text-emerald-600"> 
                                        {`  ${formData.bedroom} bedrooms`} 
                                    </span>
                                </p>
                                    <input type="number" 
                                    id="bedroom"
                                    value={formData.bedroom}
                                    onChange={onChange}
                                    className="w-full  rounded-md transition duration-150 ease-in-out" 
                                    min={0}
                                    required/>
                             </div>
                             <div className="">
                                <p>Bath: 
                                          {/* Number of Bathrooms */}
                                    <span className="text-xs text-emerald-600"> 
                                        {`  ${formData.bathroom} bathrooms`} 
                                    </span>
                                    </p>
                                    <input type="number" 
                                        id="bathroom"
                                        value={formData.bathroom}
                                        onChange={onChange}
                                        className="w-full  rounded-md transition duration-150 ease-in-out" 
                                        min={0}
                                        required
                                        />
                             </div>
                        </div>
                </form>
        </main>
     );
}
 
export default Listing;
