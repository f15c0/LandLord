import ball from '../assets/ball.svg'
const Spinner = () => {
    return ( 
        <div className='bg-black bg-opacity-10 flex items-center justify-center fixed right-0 left-0 bottom-0 top-0 z-50'>
            <div >
                 <img src={ball} alt="Loading Svg" className='h-24'/>
            </div>
        </div>
     );
}
 
export default Spinner;