import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
// import Spinner from "../components/Spinner";
import ListingSkeleton from "../components/ListingSkeleton";

const ListingView = () => {
    const {catName, listingId} =useParams();
    const [listing, setListing]= useState(null);
    const [loading, setLoading]= useState(true);
    useEffect(()=>{

            const fetchListing = async ()=>{
               const docRef = doc(db, "listings", listingId);
               const docSnap = await getDoc(docRef);
               if (docSnap.exists()) {
                    setListing(docSnap.data());
                    setLoading(false);
               }
            };

            fetchListing();
    }, [listingId]);

    // if (loading) {
    //     return <Spinner/>
    // }
    return ( 
        <>
             {loading && <ListingSkeleton/>}
             <div>{listing?.name}</div>
        </>
     );
}
 
export default ListingView;