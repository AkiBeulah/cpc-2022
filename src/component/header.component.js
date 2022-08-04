import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.webp'
import {faArrowRight, faBars, faChevronDown} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const [header, setHeader] = useState("")
    const [sHOpen, setSHOpen] = useState(false)
    const [op, setOp] = useState(false)
    const [scroll, setScroll] = useState(0)
    const [scrollLimit, setScrollLimit] = useState(700)

    useEffect(() => {
        window.addEventListener('scroll', (e) => handleScroll(e));

        switch (window.location.pathname) {
            case "/":
                setScrollLimit(700)
                break
            default:
                setScrollLimit(-1)
                break
        }

        return (() => window.removeEventListener('scroll', (e) => handleScroll(e)))
    }, [])

    const handleScroll = (e) => {
        setScroll(window.scrollY)
    }

    const toggleSecondaryHeader = (e, h, s) => {
        setSHOpen(s)
        setHeader(h)
        let overlay = document.querySelector("#overlay")
        let secHeader = document.querySelector("#secHeader")
        let mainNav = document.querySelector("#mainNav")

        if (!s) {
            overlay.classList.remove("Overlay__after_open")
            overlay.classList.add("Overlay__before_close")

            secHeader.classList.remove("Overlay__after_open")
            secHeader.classList.add("Overlay__before_close")
            secHeader.classList.add("-translate-y-12")

            setTimeout(() => {
                overlay.classList.add("hidden")
                secHeader.classList.add("hidden")
            }, 500)
            setOp(false)
        } else {
            overlay.classList.remove("hidden")
            secHeader.classList.remove("hidden")
            setTimeout(() => {
                overlay.classList.add("Overlay__after_open")
                secHeader.classList.add("Overlay__after_open")
                secHeader.classList.remove("-translate-y-12")

                overlay.classList.remove("Overlay__before_close")
                secHeader.classList.remove("Overlay__before_close")

            }, 200)
        }
    }

    return (
        <>
            <div id="overlay"
                 className={"w-screen h-screen bg-gray-400 bg-opacity-40 fixed z-10 transition-all duration-200 hidden opacity-0 "}/>
            <header onMouseLeave={(e) => toggleSecondaryHeader(e, "", false)}
                    className={'fixed w-screen text-gray-800 font-bold z-20 transition-all duration-300 ' + (scroll > scrollLimit ? "bg-white border-b border-gray-900" : "bg-white")}>
                <nav id="mainNav"
                     className="relative opacity-1 flex flex-wrap items-center justify-between px-2 border-opacity-20 mx-auto bg-transparent">
                    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                        <div
                            className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                            <a className={"w-1/3 leading-relaxed inline-block mr-4 whitespace-nowrap transition-all duration-300 text-base " + (scroll > scrollLimit ? "" : "")}
                               href="/">
                                <img src={logo} alt="CPC Logo" className={'w-full'} />
                            </a>
                            <button
                                className={"cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none " + (scroll > scrollLimit ? "text-gray-800" : "text-gray-800 text-base")}
                                type="button"
                                onClick={() => setNavbarOpen(!navbarOpen)}>
                                <FontAwesomeIcon icon={faBars}/>
                            </button>
                        </div>

                        <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}
                             id="example-navbar-danger">
                            {
                                (window.location.pathname).indexOf('admin') === 1 ?
                                    <>
                                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                            <li className="nav-item">
                                                <a className={"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:opacity-75 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}
                                                   href="/admin/home">
                                                    <span className="">Admin Home</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:opacity-75 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}
                                                   href="/logout">
                                                    <span className="">Logout</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </>
                                    :
                                    <>
                                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                            <li className="nav-item"
                                                onMouseEnter={(e) => toggleSecondaryHeader(e, "about", true)}>
                                                <a className={"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:opacity-75 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}
                                                   href="/about">
                                                    <span className="">About</span>
                                                </a>
                                            </li>
                                            <li className="nav-item"
                                                onMouseEnter={(e) => toggleSecondaryHeader(e, "faqs", true)}
                                            >
                                                <a className={"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:opacity-75 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}
                                                   href="/events">
                                                    <span className="">Events</span>
                                                </a>
                                            </li>
                                            <li className="nav-item"
                                                onMouseEnter={(e) => toggleSecondaryHeader(e, "products", true)}>
                                                <a className={"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:opacity-75 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}
                                                   href="/portrait-pictures">
                                                    <span className="">Portrait Pictures</span>
                                                    <span className="ml-2 -translate-y-1"><FontAwesomeIcon
                                                        icon={faChevronDown}/></span>
                                                </a>
                                            </li>
                                            <li className="nav-item"
                                                onMouseEnter={(e) => toggleSecondaryHeader(e, "products", true)}>
                                                <a className={"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:opacity-75 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}
                                                   href="/Souvenirs">
                                                    <span className="">Souvenirs</span>
                                                    <span className="ml-2 -translate-y-1"><FontAwesomeIcon
                                                        icon={faChevronDown}/></span>
                                                </a>
                                            </li>
                                            <li className="nav-item"
                                                onMouseEnter={(e) => toggleSecondaryHeader(e, "faqs", true)}
                                            >
                                                <a className={"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:opacity-75 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}
                                                   href="/wings">
                                                    <span className="">Wings Awards</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </>
                            }
                        </div>
                    </div>
                </nav>
                <nav id="secHeader"
                     className={"w-screen z-20 absolute transform left-1/2 -translate-x-1/2 max-w-7xl px-12 lg:px-6 pt-8 pb-4 mx-auto divide-y transition-all duration-200 divide-gray-600 divide-opacity-40 bg-white hidden -translate-y-12 opacity-0"}>
                    {
                        header === "products" &&
                        <div className='transition-all duration-300'>
                            <div className="pb-4">
                                <div className="text-2xl text-blue-600 font-black">
                                    Our Products
                                </div>
                                <p className='max-w-2xl py-5 font-normal text-base'>
                                    The best available inverters, solar panels and charge controllers for your
                                    alternative power
                                    solutions.
                                </p>
                                <a href="/products" className={'text-blue-600 hover:underline'}>
                                    <span>Go to Products</span>
                                    <span className="ml-2"><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                            </div>
                            <div className="pt-8 pb-2 text-sm font-light">
                                <a className="hover:underline capitalize px-4" href="#">
                                    <span>European Batteries</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                                <a className="hover:underline capitalize px-4" href="#">
                                    <span>HYBRID SOLAR SYSTEM</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                                <a className="hover:underline capitalize px-4" href="#">
                                    <span>INVERTER BACKUP SYSTEM</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                                <a className="hover:underline capitalize px-4" href="#">
                                    <span>SOLAR WATER HEATER</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                                <a className="hover:underline capitalize px-4" href="#">
                                    <span>LEASE PURCHASE</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                            </div>
                        </div>
                    }
                    {
                        header === "about" &&
                        <div className='transition-all duration-300'>
                            <div className="pb-4">
                                <div className="text-2xl text-blue-600 font-black">
                                    About Us
                                </div>
                                <p className='max-w-2xl py-5 font-normal text-base'>
                                    <p>
                                        Welcome to Rila Investment LTD
                                    </p>
                                    <br/>
                                    <p>
                                        RILA Solar is a registered solar energy service provider. We converge
                                        innovative technologies,
                                        human
                                        resource, and quality control checks to safely deliver a cost effective,
                                        clean and stable energy
                                        solutions.
                                    </p>
                                    <p>Want to learn more about the best alternative power provider in Nigeria?</p>
                                </p>
                                <a href="/about" className={'text-blue-600 hover:underline'}>
                                    <span>Learn more</span>
                                    <span className="ml-2"><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                            </div>
                            <div className="pt-8 pb-2 text-sm font-light">
                                <a className="hover:underline px-4" href="#">
                                    <span>Who are we?</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                                <a className="hover:underline px-4" href="#">
                                    <span>Our Portfolio</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                            </div>
                        </div>
                    }
                    {
                        header === "faqs" &&
                        <div className='transition-all duration-300'>
                            <div className="pb-4">
                                <div className="text-2xl text-blue-600 font-black">
                                    Frequently Asked Questions
                                </div>
                                <p className='max-w-2xl py-5 font-normal text-base'>
                                    Have questions about the services and solutions we provide or have a question about
                                    your installation?
                                </p>
                                <a href="/help" className={'text-blue-600 hover:underline'}>
                                    <span>Get Some Answers</span>
                                    <span className="ml-2"><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                            </div>
                            <div className="pt-8 pb-2 text-sm font-light">
                                <a className="hover:underline px-4" href="#">
                                    <span>General</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                                <a className="hover:underline px-4" href="#">
                                    <span>Our People</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                                <a className="hover:underline px-4" href="#">
                                    <span>Savings</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                                <a className="hover:underline px-4" href="#">
                                    <span>Safety & Security</span>
                                    <span className='pl-2 mt-4'><FontAwesomeIcon icon={faArrowRight}/></span>
                                </a>
                            </div>
                        </div>
                    }
                    {
                        header === "contact" &&
                        <div className='transition-all duration-300'>
                            <div className="pb-4">
                                <div className="text-2xl text-blue-600 font-black">
                                    Contact Us
                                </div>
                                <p className='max-w-2xl py-5 font-normal text-base'>
                                    Ready to take the next step, contact us for a site survey.
                                    <br/>
                                    Free of charge.
                                </p>
                                <div>
                                    <div className={"w-100 text-base font-light"}>
                                        <p>
                                            16B, Modupe Odulami Street
                                            <br/>
                                            Lekki Phase 1
                                            <br/>
                                            Lagos
                                        </p>
                                        <br/>
                                        <p>
                                            <a href="tel:+234 813 947 9755">+234 813 947 9755</a>
                                            <br/>
                                            <a href="tel:+234 803 814 4591">+234 803 814 4591</a>
                                        </p>
                                        <br/>
                                        <p>
                                            <a href="mailto:nicholas@rilainv.net">nicholas@rilainv.net</a>
                                            <br/>
                                            <a href="mailto:nkoyo@rilainv.net">nkoyo@rilainv.net</a>
                                        </p>
                                    </div>
                                    <br/>
                                    <br/>
                                    <a href="/contact" className={'text-blue-600 hover:underline'}>
                                        <span>Contact Us Now</span>
                                        <span className="ml-2"><FontAwesomeIcon icon={faArrowRight}/></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    }
                </nav>
            </header>
        </>
    )
}

export default Header