import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Moment from 'react-moment';
import {ImLocation2} from "react-icons/im";
import { useState } from "react";


const ListingCard = ({listing, id, title}) => {

    const [loading, setLoading] =useState(false);
    // function Box({ children }) {
    //     return (
    //         <div
    //             style={{
    //                 border: '1px solid #ccc',
    //                 display: 'block',
    //                 lineHeight: 2,
    //                 padding: '1rem',
    //                 marginBottom: '0.5rem',
    //                 width: 100,
    //             }}
    //         >
    //             {children}
    //         </div>
    //     )
    // }

    
    return ( 

        <li className="relative bg-white flex flex-col py-2 my-2 justify-between items-center shadow-md hover:shadow-xl rounded-lg transition-shadow duration-150 overflow-hidden m-[10px]">
            <Link className="contents" to={`/category/${listing.type}/${id}`}>
                {/* <h1>{title || <Skeleton />}</h1> */}
              {( <img src={listing.imgUrls[0]} className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in-out"
                    loading="lazy"
                    alt={listing.name}/>) || <Skeleton height={170}/>}
                
                   
                
                <Moment fromNow className="absolute top-2 left-2 uppercase text-xs font-semibold bg-blue-800 text-white px-2 py-1 shadow-lg border-0">{listing.timestamp?.toDate()}</Moment>
                <div className="w-full p-[10px]">
                    <div className="flex items-center space-x-1">
                        <ImLocation2 className="text-emerald-700 sm:h-5 sm:w-5 mb-[2px]"/>
                        <span className="text-sm truncate text-gray-600 font-medium">Address:{listing.address}</span>
                    </div>

                    <h2 className="text-xl mt-0 text-dark font-semibold">{listing.name}</h2>
                    <p className="text-[#457b9d] text-sm mt-0 font-medium">
                    Gh¢ {parseInt(listing.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type ==="rent" && " / month"}
                    </p>
                    <div>
                        <div className="flex items-center text-sm mt-1 font-medium space-x-3">
                                <p className="text-xs">{listing.bedrooms > 1 ? `${listing.bedrooms} Beds`: "1 Bed"}</p>
                                <p className="text-xs">{listing.bathrooms > 1 ? `${listing.bathrooms} Baths`: "1 Bath"}</p>
                        </div>
                    </div>
                </div>
               
               
            </Link>
        </li>
     );
}
 
export default ListingCard;