import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Polariod from '../component/polariod.component';


const Pictures = () => {
    const [coursePictures, setCoursePictures] = useState([]);
    let params = useParams()
    useEffect(()=>{
        //window.scrollTo(0,0);
        setCoursePictures([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])
    },[])
    return (
        <>
            <section className={'bg-white pt-32 py-12  w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                <div className=" py-12 max-w-7xl mx-auto">
                        <h4 className='block font-extrabold text-3xl md:text-4xl '>
                            {params.collegeName}
                        </h4>
                    </div>
                <div className="max-w-7xl mx-auto">
                    <div className="w-full grid  gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                        {coursePictures.map((i) => <Polariod/>)}
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default Pictures