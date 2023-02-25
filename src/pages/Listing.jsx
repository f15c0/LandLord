import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
// import Spinner from "../components/Spinner";
import ListingSkeleton from "../components/ListingSkeleton";
//Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, {EffectFade, Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';

const ListingView = () => {

SwiperCore.use([Autoplay, Pagination, Navigation])
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
        <main>
             {/* {loading && <ListingSkeleton/>} */}

             <Swiper 
                    slidesPerView={1} 
                    navigation 
                    pagination={{type:'progressbar'}} 
                    effect="fade"
                    modules={[EffectFade]}
                    autoplay={{delay:3000}}
                    >
                    {listing?.imgUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                        <div className="relative w-full sm:h-[300px] h-[200px] overflow-hidden" 
                        style={{ background: `url(${listing.imgUrls[index]}) center no-repeat`, 
                                    backgroundSize:"cover" }} />
                        </SwiperSlide>
                    ))}
            </Swiper>


        </main>
     );
}
 
export default ListingView;