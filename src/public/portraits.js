import React,{useState} from 'react';

import College from '../component/college.component';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const Portrait = () => {
    const [coe, setCOE] = useState([1,2,3,4,5,6,7]);
    const [cst, setCST] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);
    const [cmss, setCMSS] = useState([1,2,3,4,5,6,7,8]);
    const [clds, setCLDS] = useState([1,2,3,4,5]);

    const colleges = ['coe','cst','cmss','clds']
    function college(x){
        switch(x){
            case 'cst' : return cst.map((i) =>
           <College college= "CST: College of Science & Technology"/>
          );
            case 'cmss' : return cmss.map((i) =>
            <College college= "CMSS: College of Management & Social Sciences"/>
          );
            case 'clds' : return clds.map((i) =>
            <College college= "CLDS: College of Leadership & Developmental Studies"/>
          );
            default : return coe.map((i) =>
            <College college= "COE: College of Engineering"/>
          );
        }
    }

    return (
        <>

            <section className={'bg-white pt-24 py-12  w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                    <div className="py-24 max-w-7xl mx-auto flex justify-between">
                        <h4 className='font-extrabold text-3xl md:text-4xl'>
                            Handsome Gentlemen & Beautiful Ladies.
                        </h4>
                        <span className=""><FontAwesomeIcon icon={faSearch}
                         className={'text-l text-gray-600'}/></span>
                    </div>

                <div id={colleges[0]} className="max-w-7xl mx-auto">
                    <h1 className={'text-2xl lg:text-4xl mb-8'}>College of Engineering</h1>

                    <div className="w-full grid  gap-10 my-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                        {college()}
                    </div>
                </div>
            </section>
            <section className={'bg-white py-24 my-5  w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                <div id={colleges[1]} className="max-w-7xl mx-auto">
                <h1 className={'text-2xl lg:text-4xl mb-8'}>College of Science & Technology</h1>


                    <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {college(colleges[1])}
                    </div>
                </div>
            </section>
            <section className={'bg-white py-24 my-5 w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                <div id={colleges[2]} className="max-w-7xl mx-auto">
                <h1 className={'text-2xl lg:text-4xl mb-8'}>College of Management & Social Sciences.</h1>

                    <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                       {college(colleges[2])}
                    </div>
                </div>
            </section>
            <section className={'bg-white py-24 my-5 w-full relative px-16 justify-center overflow-auto'} style={{maxHeight: "100vh"}}>
                <div id={colleges[3]} className="max-w-7xl mx-auto">
                <h1 className={'text-2xl lg:text-4xl mb-8'}>College of Leadership & Developmental Studies.</h1>

                    <div className="w-full grid  gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                       {college(colleges[3])}
                    </div>
                </div>
            </section>

        
        </>
    )
}

export default Portrait