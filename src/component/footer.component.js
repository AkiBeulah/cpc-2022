import React from 'react';
import logo from "../assets/images/logo.webp";

const Footer = (props) => {
    return (
        document.location.pathname.includes("admin") ? <></> : defaultFooter
    );
}

const defaultFooter =
    <footer className={'bg-white text-gray-800 border-t border-gray-800 w-100 mx-auto py-8'}>
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 text-center w-full lg:text-left">
                <div className="text-gray-800 px-8 w-100">
                    <br />
                    <a href="/"
                        className="font-weight-bolder duration-200 text-blue-600 hover:text-gray-800 mx-auto mt-12 md:text-xl lg:text-2xl xl:text-3xl">
                        <img src={logo} alt="CPC Logo" className={'w-full mx-auto lg:m-0'} />
                    </a>
                </div>

                <div className={'my-auto mx-auto'}>
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
                            href="/wings">Wings Awards</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

export default Footer;