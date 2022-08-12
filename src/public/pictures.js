import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import Polariod from '../component/polariod.component';


const Pictures = () => {
    const [coursePictures, setCoursePictures] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
    let params = useParams()
    return (
        <>
            <section
            id='#College-Name'
                className="pt-32 pb-11 pl:32 max-w-7xl mx-10 lg:mx-auto  w-full bg-white  relative flex flex-row ">
                    <div className="">
                        <h4 className='font-extrabold text-5xl md:text-4xl'>
                            {params.collegeName}
                        </h4>
                    </div>
               
            </section>

            <section className={'bg-white py-12  w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
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