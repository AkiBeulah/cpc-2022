import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from '../assets/images/logo.webp'
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const [scroll, setScroll] = useState(0)
    const [scrollLimit, setScrollLimit] = useState(700)
    const [searchMessage, setSearchMessage] = useState("Tell us what you need...")
    const [search, setSearch] = useState("")

    useEffect(() => {
        window.addEventListener('scroll', (e) => handleScroll(e));
        document.querySelector("#overlay").addEventListener("click", (e) => {
            if (!document.querySelector('#secHeader').contains(e.target)) {
                props.setOp(false)
            }
        })

        switch (window.location.pathname) {
            default:
                setScrollLimit(-1)
                break
        }

        return (() => window.removeEventListener('scroll', (e) => handleScroll(e)))
    }, [])

    const handleScroll = (e) => {
        setScroll(window.scrollY)
    }

    useEffect(() => {
        let overlay = document.querySelector("#overlay")
        let secHeader = document.querySelector("#secHeader")
        let headerLinks = document.querySelector("#headerLinks")
        let searchForm = document.querySelector("#searchForm")

        if (props.op) {
            headerLinks.classList.add('opacity-0')

            setTimeout(() => {
                headerLinks.classList.add('hidden')
                searchForm.classList.remove('hidden')
                secHeader.classList.remove('hidden')
                overlay.classList.remove('hidden')
            }, 400)
            setTimeout(() => {
                searchForm.classList.remove('w-0', 'opacity-0')
                searchForm.classList.add('w-full')
                secHeader.classList.remove('opacity-0')
                overlay.classList.remove('opacity-0')
                document.querySelector("#searchForm > div > input").focus()
            }, 500)

        } else {
            secHeader.classList.add('opacity-0')
            overlay.classList.add('opacity-0')
            searchForm.classList.add('w-0', 'opacity-0')
            searchForm.classList.remove('w-full')

            setTimeout(() => {
                secHeader.classList.add('hidden')
                overlay.classList.add('hidden')
                searchForm.classList.add('hidden')
                headerLinks.classList.remove('hidden')
            }, 350)

            headerLinks.classList.remove('opacity-0')
        }
    }, [props.op])
    useEffect(() => {
        let bar1 = document.querySelector('#bar1')
        let bar2 = document.querySelector('#bar2')

        if (navbarOpen) {
            bar1.classList.remove('untransformed')
            bar2.classList.remove('untransformed')

            setTimeout(() => {
                bar1.classList.add('transformed')
                bar2.classList.add('transformed')

                bar1.classList.add('bar1-transformed')
                bar2.classList.add('bar2-transformed')
            }, 10)
        } else {
            bar1.classList.remove('transformed')
            bar2.classList.remove('transformed')

            setTimeout(() => {
                bar1.classList.add('untransformed')
                bar2.classList.add('untransformed')


                bar1.classList.remove('bar1-transformed')
                bar2.classList.remove('bar2-transformed')
            }, 10)
        }
    }, [navbarOpen])

    const updateSearch = (query) => {
        setSearch(query)

    }

    return (
        <>
            <div id="overlay"
                 className={"w-screen h-screen bg-gray-400 bg-opacity-40 fixed z-30 transition-all duration-200 hidden opacity-0 "}/>
            <header
                className={'fixed w-screen text-gray-800 font-bold z-40 transition-all duration-300 ' + (scroll > scrollLimit ? "bg-white border-b border-gray-900" : "bg-white")}>
                <nav id="mainNav"
                     className="relative border-b  opacity-1 flex flex-wrap items-center justify-between px-2 border-opacity-20 mx-auto bg-transparent">
                    <div
                        className="container px-4 mx-auto flex flex-col lg:flex-row flex-wrap items-center justify-between">
                        <div
                            className="relative w-full lg:w-fit flex flex-row justify-between lg:block lg:justify-start">
                            <a className={"w-fit block mr-auto lg:mr-4 transition-all duration-300 " + (scroll > scrollLimit ? "" : "")}
                               href="/">
                                <img src={logo} alt="CPC Logo" style={{width: "250px"}}/>
                            </a>
                            <button
                                className={"cursor-pointer flex flex-col text-xl justify-center leading-none px-3 py-1 block lg:hidden outline-none focus:outline-none text-purple-600 "}
                                type="button"
                                onClick={() => setNavbarOpen(!navbarOpen)}>
                                <span id="bar1" className='block bg-purple-600 transition-all duration-300'/>
                                <span id="bar2" className='block bg-purple-600 transition-all duration-300'/>
                            </button>
                        </div>

                        <div
                            className={"h-screen lg:h-fit lg:flex flex-grow items-center justify-end " + (navbarOpen ? "flex " : "hidden ")}
                            id="example-navbar-danger">
                            {
                                (window.location.pathname).indexOf('admin') === 1 ?
                                    <>
                                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                            <HeaderLink link={'/admin/home'} text={'Admin Home'}  scroll={scroll} scrollLimit={scrollLimit} />
                                            <HeaderLink link={'/logout'}     text={'Logout'}      scroll={scroll} scrollLimit={scrollLimit} />
                                        </ul>
                                    </>
                                    :
                                    <>
                                        <ul id="headerLinks"
                                            className={"flex flex-col transition-all duration-300 lg:justify-center lg:items-center lg:flex-row list-none lg:ml-auto"}>
                                            <HeaderLink link={'/about'}             text={'About'}              scroll={scroll} scrollLimit={scrollLimit} />
                                            <HeaderLink link={'/events'}            text={'Events'}             scroll={scroll} scrollLimit={scrollLimit} />
                                            <HeaderLink link={'/portrait-pictures'} text={'Portrait Pictures'}  scroll={scroll} scrollLimit={scrollLimit} />
                                            <HeaderLink link={'/souvenirs'}         text={'Souvenirs'}          scroll={scroll} scrollLimit={scrollLimit} />
                                            <HeaderLink link={'/wings'}             text={'Wings Awards'}       scroll={scroll} scrollLimit={scrollLimit} />

                                            <li className="nav-item">

                                                <span onClick={() => props.setOp(true)}
                                                      className={"cursor-pointer px-3 py-2 flex justify-center items-center uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:text-purple-700 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}>
                                                    <span className=""><FontAwesomeIcon icon={faSearch}
                                                                                        className={'text-2xl text-purple-600'}/></span>
                                                </span>
                                            </li>
                                        </ul>
                                        <form id="searchForm" onSubmit={e => e.preventDefault()}
                                              className="transition-all duration-300 hidden w-0 opacity-0 ">
                                            <div className="relative transition-all duration-300 ">
                                                <input type="text"
                                                       value={search}
                                                       onChange={(e) => updateSearch(e.target.value)}
                                                       className={'border text-slate-600 border-purple-300 font-normal outline-none transition-all duration-300 focus:border-purple-600 w-full rounded-lg py-2.5 px-4'}
                                                       placeholder={'Looking for something...'}/>
                                                <span
                                                    onClick={() => props.setOp(false)}
                                                    className="cursor-pointer hover:text-purple-800 absolute right-4 transition-all duration-300 top-1/2 transform -translate-y-1/2">
                                                    <FontAwesomeIcon icon={faTimes}
                                                                     className='text-purple-600 text-2xl'/>
                                                </span>
                                            </div>
                                        </form>
                                    </>
                            }
                        </div>
                    </div>
                </nav>
                <nav id="secHeader"
                     className={"w-screen transition-all duration-300  border z-40 absolute transform left-1/2 top-44 -translate-x-1/2 max-w-7xl px-12 lg:px-6 py-8 pb-4 mx-auto divide-y transition-all duration-200 divide-gray-600 divide-opacity-40 bg-white hidden -translate-y-12 opacity-0"}>
                    <div className="w-full max-w-7xl mx-auto">
                        <h4 className="text-center text-slate-600 font-light">{searchMessage}</h4>

                    </div>
                </nav>
            </header>
        </>
    )
}


const HeaderLink = ({link, text, scroll, scrollLimit}) => {
    return (
        <li className="nav-item">
            <a className={"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug border border-transparent transition-all duration-200 hover:underline hover:opacity-75 " + (scroll > scrollLimit ? "text-gray-800" : "text-base text-gray-800")}
               href={link}>
                <span className="">{text}</span>
            </a>
        </li>
    )
}

export default Header