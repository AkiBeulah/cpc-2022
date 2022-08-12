import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faLink, faThumbsUp, faTimes} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-modal";
import {faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";

var qs = require('qs');

const Voting = () => {
    const [red, setRed] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        data: {}
    })
    const [wingsDetails, setWingsDetails] = useState({})
    const [modalData, setModalData] = useState({
        isOpen: false,
        title: ""
    })

    const customStyles = {
        content: {
            width: "95%",
            maxWidth: "1280px",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        axios.get('/api/information/wings_details')
            .then(res => {
                setWingsDetails(JSON.parse(res.data.data)[0])
            })
    }, [])
    useEffect(() => {
        let thumbsUp = document.querySelector('#thumbsUp')
        let thumbsUpInput = document.querySelector('#thumbsUpInput')

        if (red) {
            thumbsUp.classList.remove('hover:scale-110')
            setTimeout(() => thumbsUp.classList.add('scale-0', 'opacity-0'), 100)
            setTimeout(() => {
                thumbsUp.classList.add('hidden')
            }, 600)
            thumbsUpInput.classList.remove('hidden')
            setTimeout(() => {
                thumbsUpInput.classList.remove('opacity-0')
                thumbsUpInput.classList.remove('w-0')
            }, 800)
        }
    }, [red])
    useEffect(() => {
        let emailRegEx = new RegExp('[a-zA-Z]+.[a-zA-Z]+@(stu.cu.edu.ng|covenantuniversity.edu.ng)')

        if (emailRegEx.test(formData.email)) {
            window.scroll(0, findPos(document.querySelector("#cats")))
        }
    }, [formData])

    const submit = () => {
        let emailRegEx = new RegExp('[a-zA-Z]+.[a-zA-Z]+@(stu.cu.edu.ng|covenantuniversity.edu.ng)')

        if (Object.keys(formData.data).length === 16 && emailRegEx.test(formData.email)) {
            axios.post(
                '/api/voting/',
                qs.stringify({
                    email: formData.email,
                    data: JSON.stringify(formData.data)
                }),
                {headers: {'content-type': 'application/x-www-form-urlencoded'}}
            )
                .then(() => {
                    alert('You have successfully submitted your votes, please check your email for a confirmation link within the next hour, if not please try again.\nPlease you can only vote once!')
                    window.location.href = "/"
                })
                .catch(() => {
                    alert('Something seems to have gone wrong, you may have used this email to vote already. \nPlease contact a CPC executive on any of the official platforms if problem persists.')
                })
        } else {
            alert("Please make sure to use a Covenant University Email an to vote for each category!")
        }
    }
    const findPos = (obj) => {
        let curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj === obj.offsetParent);
            return [curtop];
        }
    }
    const updateFormData = (n, v) => {
        setFormData(formData => ({...formData, [n]: v}))
    }
    const updateFormData__LV2 = (n, v) => {
        setFormData(formData => ({
                ...formData,
                "data": {
                    ...formData.data,
                    [n]: v
                }
            })
        )
    }
    const updateModalData = (n, v) => {
        setModalData(modalData => ({...modalData, [n]: v}))
    }
    const titleParser = (title) => {
        if (title) {
            let t = title.indexOf('__') > -1 ? title.replaceAll('__', ' (') + ")" : title
            let y = t.replaceAll('_', ' ')
            return y
        }
    }

    return (
        <>
            <Modal
                isOpen={modalData.isOpen}
                onRequestClose={() => updateModalData("title", false)}
                style={customStyles}
                contentLabel={modalData.title}
            >
                <h2 className={'text-right uppercase'} onClick={() => updateModalData("isOpen", false)}><FontAwesomeIcon
                    icon={faTimes}/></h2>
                <h2 className={'text-center uppercase mb-8 font-thickums text-4xl'}>{titleParser(modalData.title)}</h2>

                <div
                    className="overflow-x-scroll lg:overflow-x-hidden lg:overflow-y-scroll no-scrollbar py-2 px-2 w-full">
                    <div
                        className={`flex flex-row lg:grid lg:grid-cols-3`}>
                        {wingsDetails[modalData.title] !== undefined &&
                            wingsDetails[modalData.title].map((i, k) =>
                                <div className={'wings-radio-input mr-4 lg:mr-0'}>
                                    <input
                                        id={i.name.replaceAll(" ", "_")}
                                        className={'hidden'}
                                        type="radio"
                                        name={modalData.title}
                                        value={i.name}
                                        checked={formData.data[modalData.title] === i.name}
                                        onChange={() => updateFormData__LV2(modalData.title, i.name)}
                                    />
                                    <label htmlFor={i.name.replaceAll(" ", "_")} key={k}
                                           className="block bg-gray-900 w-48 rounded-xl overflow-hidden space-y-4 duration-300 transition-all hover:bg-yellow-600 hover:scale-105 peer-checked:bg-green-600">
                                        <div className="w-full bg-gray-200" style={{
                                            background: `url(${i.image_url}) center/cover fixed`,
                                            minHeight: "10em"
                                        }}/>
                                        <div id="description" className="p-2">
                                            <h2 className="text-white font-semibold text-sm transition">
                                                {i.name}
                                            </h2>
                                            <div
                                                className="flex items-center text-sm">
                                                {
                                                    Object.keys(i.socials).map((it, ke) =>
                                                        <div key={ke}
                                                             className="text-white flex justify-between items-center">
                                                            <a className={'text-lg mr-2'} href="#"><FontAwesomeIcon
                                                                icon={it === "instagram" ? faInstagram : it === "twitter" ? faTwitter : faLink}/>
                                                            </a>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between mt-8 font-extrabold text-xs">
                    {wingsDetails[modalData.title] !== undefined &&
                        <>
                        <span className={'cursor-pointer capitalize flex flex-row items-center'}
                              onClick={() => updateModalData(
                                  "title",
                                  (Object.keys(wingsDetails).indexOf(modalData.title) - 1 < 0) ?
                                      Object.keys(wingsDetails)[Object.keys(wingsDetails).length - 1]
                                      :
                                      Object.keys(wingsDetails)[Object.keys(wingsDetails).indexOf(modalData.title) - 1])}
                        >
                            <FontAwesomeIcon icon={faChevronLeft}/>
                            <span className={'pl-2'} dangerouslySetInnerHTML={{
                                "__html": titleParser((Object.keys(wingsDetails).indexOf(modalData.title) - 1 < 0) ?
                                    Object.keys(wingsDetails)[Object.keys(wingsDetails).length - 1].replaceAll(" ", "<br/>")
                                    :
                                    Object.keys(wingsDetails)[Object.keys(wingsDetails).indexOf(modalData.title) - 1]).replaceAll(" ", "<br/>")
                            }}/>
                        </span>
                            <span className={'cursor-pointer capitalize flex flex-row items-center text-right'}
                                  onClick={() => updateModalData(
                                      "title",
                                      (Object.keys(wingsDetails).indexOf(modalData.title) + 1 >= Object.keys(wingsDetails).length) ?
                                          Object.keys(wingsDetails)[0]
                                          :
                                          Object.keys(wingsDetails)[Object.keys(wingsDetails).indexOf(modalData.title) + 1]
                                  )}>
                        <span className={'pr-2'} dangerouslySetInnerHTML={{
                            "__html": titleParser((Object.keys(wingsDetails).indexOf(modalData.title) + 1 >= Object.keys(wingsDetails).length) ?
                                Object.keys(wingsDetails)[0].replaceAll(" ", "<br/>")
                                :
                                Object.keys(wingsDetails)[Object.keys(wingsDetails).indexOf(modalData.title) + 1]).replaceAll(" ", "<br/>")
                        }}/>
                        <FontAwesomeIcon icon={faChevronRight}/>
                        </span>
                        </>
                    }
                </div>
            </Modal>

            <section className='pt-32 px-8 pb-12 max-w-7xl mx-auto'>
                <h1 className='font-extrabold text-2xl lg:text-6xl mb-8'>
                    Your Vote Counts
                </h1>

                <p>
                    The voting begins with entering your Covenant University Email address (@stu.cu.edu.ng or
                    @covenantuniversity.edu.ng), then you'd be allowed to vote on each category.
                    <br/>
                    You can only pick on person per category though, and you must select someone from each category.
                    <br/>
                    Upon submission of your votes, you receive an email to confirm your affiliation to the university.
                    (Don't worry, it's just a redirect.)
                    <br/>
                    After that, your votes will be recorded.
                </p>
                <br/>
                <p>
                    {red ? "Enter your Covenant University email! (P.S. Lecturers can vote too!)" : "Ready to begin, click the thumbs up!"}
                </p>

            </section>

            <section className='p-8 max-w-7xl mx-auto'>
                <div className="flex justify-center items-center" style={{minWidth: "150px", minHeight: "150px"}}>
                    <div onClick={() => setRed(true)}
                         id='thumbsUp'
                         className={"rounded-full text-white mx-auto bg-gray-900 w-fit p-8 transition transition-all duration-300 hover:bg-purple-700 cursor-pointer hover:scale-110"}>
                        <FontAwesomeIcon icon={faThumbsUp} size={'4x'}/>
                    </div>
                    <input
                        id='thumbsUpInput'
                        type="email"
                        className='px-6 py-4 text-gray-800 transition-all duration-300 hidden opacity-0 w-0 border border-purple-600 outline-none rounded-lg'
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                    />
                </div>
                <p>There are {Object.keys(wingsDetails).length} award categories.</p>

                <div id={"cats"} className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {
                        Object.entries(wingsDetails).length === 0 ?
                            <>
                                <div
                                    style={{minHeight: "96px"}}
                                    className={"bg-gray-400 text-center flex justify-center items-center uppercase w-full text-white font-thickums text-3xl cursor-pointer transition-all duration-300 animate-pulse"}/>
                                <div
                                    style={{minHeight: "96px"}}
                                    className={"bg-gray-400 text-center flex justify-center items-center uppercase w-full text-white font-thickums text-3xl cursor-pointer transition-all duration-300 animate-pulse"}/>
                                <div
                                    style={{minHeight: "96px"}}
                                    className={"bg-gray-400 text-center flex justify-center items-center uppercase w-full text-white font-thickums text-3xl cursor-pointer transition-all duration-300 animate-pulse"}/>

                            </>
                            :
                            Object.keys(wingsDetails).map((i, k) =>
                                <div key={k}
                                     onClick={() => {
                                         updateModalData('title', i)
                                         updateModalData('isOpen', true)
                                     }}
                                     className={"bg-gray-900 h-24 text-center flex justify-center items-center uppercase w-full text-white font-thickums text-3xl cursor-pointer transition-all duration-300 " + (Object.keys(formData.data).includes(i) ? "bg-green-600" : "")}>
                                    {titleParser(i)}
                                </div>
                            )
                    }
                </div>
            </section>

            <div className={'max-w-7xl mx-auto p-8'}>
                <button onClick={submit}
                        className={'bg-gray-900 mx-auto text-xl transition-all duration-300 py-2 px-4 ' + (Object.keys(formData.data).length === 16 ? " w-fit text-white rounded-lg mx-auto font-extrabold" : "w-full text-gray-800")}>Submit
                </button>
            </div>
        </>
    )
}

export default Voting