import React,{useState} from 'react';
import InfoCard from '../component/infoCard.component';
import Input from '../component/input.component';



const Souvenirs = () => {
    const [email,setEmail] = useState(false);
    const [verified,setVerified] = useState(false);
    return (
        <section className=' h-screen '>

            <section className="pt-40 ml-[102px]">
                <div className=" pb-10">
                    <h1 className=' text-4xl font-bold text-[#4F1CB3]'>The Goodies are here</h1>
                </div>
                {
                    email?

                <div className=" ">
                    <Input title = {"Verification code"} placeholder = {"Enter the 5-digit code"} />
                </div> 
                
                : 

                 <div className=" ">
                 <Input title = {"Email address"} placeholder = {"Enter your student email"} />
                 </div>
                }

                {
                    verified &&
                    <div className=' grid grid-cols-1 grid-row-2 gap-[70px] justify-items-start w-auto h-96 justify-center'>
                <InfoCard className=" flex bg-white w-[500px] h-[130px] border-[0.5px] rounded-[10px] border-[#4F1CB3]">
                            <div className='flex-row flex-auto pl-6 pt-5 '>
                                <div className=' mb-4'>
                                 <p className=' text-[#4F1CB3]'>Student Name</p>
                                </div>
                                <div>
                                 <p className=' text-[#CD3C3C]'>Student Matric Number</p>
                                 <p>College</p>
                                </div>
                            </div>

                            <div className=' flex flex-[1.5px] justify-center pt-[7%]'>
                                <div className=' h-12 w-5 bg-black'>

                                </div>
                            </div>
                </InfoCard>

                <InfoCard className=" flex bg-white w-[1000px] h-[260px] border-[0.5px] rounded-[10px] border-[#4F1CB3]">
                            <div className='flex-row flex-auto pl-6 pt-5 justify-items-stretch'>
                                <div className=' mb-4'>
                                 <p className=' text-[#4F1CB3]'>Student Name</p>
                                </div>
                                <div>
                                 <p className=' text-[#CD3C3C]'>Student Matric Number</p>
                                 <p>College</p>
                                </div>
                            </div>

                            <div className=' flex flex-[1.5px] justify-center pt-[7%]'>
                                <div className=' h-12 w-5 bg-black'>

                                </div>
                            </div>
                </InfoCard>
                </div>
                }
            </section>

          
            {
                    !verified &&
            <section className="  py-12 flex justify-center">
                <div className="  ">
                   
                   <div className='w-80 h-80  bg-slate-500'>
                        
                    </div>
                </div>
            </section>
            }

        
        </section>
    )
}

export default Souvenirs;