import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const ListingSkeleton = ({cards}) => {
    return ( 
        
       
        <div  className='mx-2 py-2'>
            <div className=''>
                <Skeleton className='h-[195px] mt-4'/>
            </div>
            <div>
                <Skeleton className='h-2 ' width={170}/>
                <Skeleton className='h-4 p-0  ' width={190}/>
                <Skeleton className='h-2 ' width={160}/>
                <Skeleton className='h-1 ' width={140}/>
            </div>
        </div>
        
     );
}
 
export default ListingSkeleton;