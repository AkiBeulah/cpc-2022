import React,{useState} from 'react';
import College from '../component/college.component';


const Portrait = () => {
    const [coe, setCOE] = useState([1,2,3,4,5,6,7]);
    const [cst, setCST] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);
    const [cmss, setCMSS] = useState([1,2,3,4,5,6,7,8]);
    const [clds, setCLDS] = useState([1,2,3,4,5]);

    function college(x){
        switch(x){
            case 'cst' : return cst.map((i) =>
           <College/>
          );;
            case 'cmss' : return cmss.map((i) =>
            <College/>
          );
            case 'clds' : return clds.map((i) =>
            <College/>
          );
            default : return coe.map((i) =>
            <College/>
          );
        }
    }

    return (
        <>
            <section
                className="pt-32 pb-11 max-w-7xl mx-10 lg:mx-auto  w-full bg-white  relative flex flex-row ">
                    <div className="">
                        <h4 className='font-extrabold text-3xl md:text-4xl'>
                            Handsome Gentlemen & Beautiful Ladies.
                        </h4>
                    </div>
               
            </section>

            <section className={'bg-white py-12  w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                <div className="max-w-7xl mx-auto">
                    <h1 className={'text-2xl lg:text-4xl mb-8'}>College of Engineering</h1>

                    <div className="w-full grid  gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                        {college()}
                    </div>
                </div>
            </section>
            <section className={'bg-white py-10 my-5  w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                <div className="max-w-7xl mx-auto">
                <h1 className={'text-2xl lg:text-4xl mb-8'}>College of Science & Technology</h1>


                    <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {college('cst')}
                    </div>
                </div>
            </section>
            <section className={'bg-white py-12 my-5 w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                <div className="max-w-7xl mx-auto">
                <h1 className={'text-2xl lg:text-4xl mb-8'}>College of Management & Social Sciences.</h1>

                    <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                       {college('cmss')}
                    </div>
                </div>
            </section>
            <section className={'bg-white py-12 my-5 w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                <div className="max-w-7xl mx-auto">
                <h1 className={'text-2xl lg:text-4xl mb-8'}>College of Leadership & Developmental Studies.</h1>

                    <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                       {college('clds')}
                    </div>
                </div>
            </section>

           
        </>
    )
}

export default Portrait