import React from 'react';
import logo from "../assets/images/logo.webp";

const Footer = (props) => {
    return (
        document.location.pathname.includes("admin") ? <></> : defaultFooter
    );
}

const defaultFooter =
    <footer className={'bg-white text-gray-800 border-t border-gray-800 w-100 mx-auto '}>
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col text-center w-full lg:text-left">
                <div className="text-gray-800 px-8 w-100">
                    <br/>
                    <a href="/"
                       className="font-weight-bolder duration-200 text-blue-600 hover:text-gray-800 mt-12 md:text-xl lg:text-2xl xl:text-3xl">
                        <img src={logo} alt="CPC Logo" className={'w-full sm:w-3/4 md:w-2/3 lg:w-1/3 mx-auto lg:m-0'}/>
                    </a>
                </div>
                <div className={'text-gray-800 px-8 mx-auto my-10 grid grid-cols-1 lg:grid-cols-3'}>
                    <div className={" pt-14 pr-4 w-100 text-xs font-light"}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque dolor hic ipsam laborum
                            minima officiis possimus praesentium quasi vitae!
                        </p>
                        <br/>
                        <h1 className="uppercase text-sm lg:text-lg text-center font-bold text-gray-400 mt-8">Enquiries</h1>

                        <div className={'flex flex-row justify-between py-6 w-full max-w-2xl mx-auto'}>
                            <div className="bg-gray-800 rounded-full w-12 h-12"/>
                            <div className="bg-gray-800 rounded-full w-12 h-12"/>
                            <div className="bg-gray-800 rounded-full w-12 h-12"/>
                            <div className="bg-gray-800 rounded-full w-12 h-12"/>
                            <div className="bg-gray-800 rounded-full w-12 h-12"/>
                        </div>
                    </div>
                    <div className={'flex flex-col lg:text-center'}>
                        <h2 className="uppercase text-sm lg:text-lg font-bold text-gray-400 mt-8">pages</h2>
                        <ul className={'text-xs font-light'}>
                            <li className={"pt-2 uppercase"}><a className=""
                                                                href="/">Home</a></li>
                            <li className={"pt-2 uppercase"}><a className=""
                                                                href="/events">events</a></li>
                            <li className={"pt-2 uppercase"}><a className=""
                                                                href="/portrait-pictures">portrait pictures</a></li>
                            <li className={"pt-2 uppercase"}><a className=""
                                                                href="/souvenirs">souvenirs</a></li>
                            <li className={"pt-2 uppercase"}><a className=""
                                                                href="/wings.js">Wings Awards</a></li>
                        </ul>
                    </div>
                    <div className={' flex flex-col justify-end'}>
                        <h2 className="uppercase text-sm lg:text-lg text-center font-bold text-gray-400 mt-8">gallery</h2>
                        <div className="grid grid-cols-3 gap-2.5 bg-gray-800 p-2.5">
                            <div className="w-full h-24 bg-gray-200"/>
                            <div className="w-full h-24 bg-gray-200"/>
                            <div className="w-full h-24 bg-gray-200"/>
                            <div className="w-full h-24 bg-gray-200"/>
                            <div className="w-full h-24 bg-gray-200"/>
                            <div className="w-full h-24 bg-gray-200"/>
                            <div className="w-full h-24 bg-gray-200"/>
                            <div className="w-full h-24 bg-gray-200"/>
                            <div className="w-full h-24 bg-gray-200"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

export default Footer;