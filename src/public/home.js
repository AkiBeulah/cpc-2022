import React from 'react'

import backdrop from '../assets/images/backdrop.webp'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {


    return (
        <>
            <section
                className="py-24 max-w-7xl mx-auto px-16 lg:px-8 w-full bg-white h-screen relative flex flex-col justify-center">
                <div className="relative z-10">
                    <div className="">
                        <h1 className={'text-base lg:text-2xl mb-8 text-purple-600'}>
                            #The17thSet.
                        </h1>

                        <h1 className='font-extrabold text-2xl lg:text-4xl mb-8'>
                            Graduation is here.
                            <br/>
                            <br/>
                            Welcome to the digital <br/>
                            view of convocation.
                        </h1>
                    </div>

                    <div className="">
                        <div className="h-20 w-3/4 mb-12 relative">
                            <input type="text" value={""} onClick={() => props.setOp(true)} onChange={() => props.setOp(true)} className={"w-full h-20 px-4 py-2 rounded-lg outline-none border border-gray-600"} />
                            <span className="absolute text-5xl top-1/2 transform -translate-y-1/2 right-6 text-gray-600"><FontAwesomeIcon icon={faSearch} /></span>
                        </div>
                        <div className="bg-gray-200 h-20 w-2/4"/>
                    </div>
                </div>
                <div
                    className="absolute w-11/12 lg:w-2/4 top-1/2 right-1/2 lg:right-8 transform translate-x-1/2 lg:translate-x-0 -translate-y-1/2 z-0">
                    <img src={backdrop} className={'w-full lg:w-2/3 lg:ml-auto'} alt={'Backdrop image'}/>
                </div>
            </section>

            <section className={'bg-gray-200 py-12 px-4 w-full bg-white relative px-16'} style={{maxHeight: "100vh"}}>
                <div className="max-w-7xl mx-auto">
                    <h1 className={'font-extrabold text-2xl lg:text-4xl mb-8'}>The Lineup of Events</h1>

                    <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-12">
                        <div className="w-full bg-gray-600 h-72 lg:h-96 col-span-4 pr-12">

                        </div>

                        <div className="my-8 md:my-0 overflow-y-scroll h-full py-4 md:py-0 col-span-8 no-scrollbar"
                             style={{maxHeight: "560px"}}>
                            <div className="bg-black w-full h-12 lg:h-24 mb-2"/>
                            <div className="bg-black w-full h-12 lg:h-24 mb-2"/>
                            <div className="bg-black w-full h-12 lg:h-24 mb-2"/>
                            <div className="bg-black w-full h-12 lg:h-24 mb-2"/>
                            <div className="bg-black w-full h-12 lg:h-24 mb-2"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-white py-24 px-8 lg:px-16 max-w-7xl mx-auto'>
                <div className="grid mb-12 grid-cols-1 lg:grid-cols-2 lg:gap-8">
                    <div className="grid grid-cols-2 mb-5 lg:mb-0 gap-2">
                        <div className="flex flex-col">
                            <div className="w-full h-36 lg:h-52 mb-4 lg:mb-2 bg-gray-200"/>
                            <div className="w-10/12 h-32 lg:h-44 ml-auto bg-gray-200"/>
                        </div>
                        <div className="">
                            <div className="w-full h-72 lg:h-96 bg-gray-200"/>
                        </div>
                    </div>


                    <div className="lg:flex flex-col justify-center">
                        <h1 className={'text-base lg:text-2xl mb-8'}>
                            #17&18MatricNo
                        </h1>

                        <h1 className='font-extrabold text-2xl lg:text-5xl mb-8'>
                           <span className="hidden lg:block">
                                Celebrating <br/>
                            Our Exit <br/>
                            Out Of Hebron.
                           </span>
                            <span className="block lg:hidden">
                                Celebrating Our Exit <br/>
                                Out Of Hebron.
                            </span>
                        </h1>
                    </div>
                </div>

                <div className='my-12 lg:my-24 text-center'>
                    <h1 className='text-xl font-bold mb-4'>The MANTRA Remains</h1>

                    <h3>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at autem culpa
                        exercitationem, fugiat in magnam maiores nam officia possimus quas, quisquam rerum
                        voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur ducimus error
                        id iusto molestiae mollitia sit velit vero! Aliquam asperiores ea est et id incidunt ipsum
                        magni, possimus quasi sint!
                    </h3>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 my-12 lg:my-16'>
                    <div className="grid grid-cols-2 gap-2.5 lg:gap-6 bg-gray-800 p-2.5 lg:p-6">
                        <div className="w-full h-36 bg-gray-200"/>
                        <div className="w-full h-36 bg-gray-200"/>
                        <div className="w-full h-36 bg-gray-200"/>
                        <div className="w-full h-36 bg-gray-200"/>
                    </div>

                    <div className="p-8 lg:flex flex-col justify-center">
                        <h1 className='font-extrabold text-2xl py-2 lg:text-5xl'>
                                <span className="hidden pl-6 lg:block">
                                    Celebrate <br/>
                                in <br/>
                                Pixels
                                </span>
                            <span className="block lg:hidden">
                                Celebrate in Pixels
                            </span>
                        </h1>
                        <a href="#" className='underline py-1 lg:pl-6 lg:text-xl'>View the Ladies & Gents</a>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:flex flex-row-reverse'>
                    <div className="grid grid-cols-2 h-72 lg:w-1/2 gap-2.5 bg-gray-800 p-2.5">
                    </div>

                    <div className="py-8 pr-8 lg:w-1/2">
                        <h1 className='font-extrabold text-2xl py-2 lg:text-5xl'>
                                <span className="hidden lg:block">
                                    Souvenirs <br/>
                                    are <br/>
                                    Ready
                                </span>
                            <span className="block lg:hidden">
                                Souvenirs are Ready
                            </span>
                        </h1>
                        <a href="#" className='underline py-1 lg:text-xl'>See your Package</a>
                    </div>
                </div>
            </section>

            <section className={'p-8'}>
                <h1 className="text-xl font-extrabold text-center">Enquiries</h1>

                <div className={'flex flex-row justify-between py-12 w-full max-w-2xl mx-auto'}>
                    <div className="bg-gray-800 rounded-full w-12 h-12"/>
                    <div className="bg-gray-800 rounded-full w-12 h-12"/>
                    <div className="bg-gray-800 rounded-full w-12 h-12"/>
                    <div className="bg-gray-800 rounded-full w-12 h-12"/>
                    <div className="bg-gray-800 rounded-full w-12 h-12"/>
                </div>
            </section>
        </>
    )
}

export default Home