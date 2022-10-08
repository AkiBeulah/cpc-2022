import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faLink, faMagnifyingGlass, faPerson, faSpinner, faThumbsUp, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-modal";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

var qs = require('qs');

const Voting = () => {
    const [loading, setLoading] = useState(false)
    const [red, setRed] = useState(false)
    const [votingState, setVotingState] = useState({
        voting_state: -1,
        categories: []
    })
    const [formData, setFormData] = useState({
        email: "",
        data: {}
    })
    const [wingsDetails, setWingsDetails] = useState({})
    const [modalData, setModalData] = useState({
        isOpen: false,
        title: ""
    })
    const [nomineeFormData, setNomineeFormData] = useState({
        fullname: "",
        image_url: "https://i.pinimg.com/736x/b9/67/82/b96782d0ab0ea492dabcf4a0f00698d2.jpg",
        category: "",
        twitter: "",
        instagram: ""
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
            transform: 'translate(-50%, -50%)'
        }
    };

    useEffect(() => {
        document.title = "The 17th Wings Awards - #The17thSet | CPC2022"

        axios.get('/api/information/voting_information')
            .then(res => {
                setVotingState(JSON.parse(res.data.data))
            })
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
        let emailRegEx = new RegExp('[a-zA-Z]+.[a-zA-Z]+@(cu.edu.ng|stu.cu.edu.ng|covenantuniversity.edu.ng)')

        if (emailRegEx.test(formData.email)) {
            window.scroll(0, findPos(document.querySelector("#cats")))
        }
    }, [formData])

    const submit = () => {
        let emailRegEx = new RegExp('[a-zA-Z]+.[a-zA-Z]+@(cu.edu.ng|stu.cu.edu.ng|covenantuniversity.edu.ng)')
        setLoading((true))

        if (/*Object.keys(formData.data).length === 16 && */emailRegEx.test(formData.email)) {
            axios.post(
                '/api/voting/',
                qs.stringify({
                    email: formData.email,
                    data: JSON.stringify(formData.data)
                }),
                { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
            )
                .then(() => {
                    setLoading(false)
                    alert('You have successfully submitted your votes, please check your email for a confirmation link within the next hour, if not please try again.\nPlease you can only vote once!')
                    window.location.href = "/"
                })
                .catch(() => {
                    setLoading(false)
                    alert('Something seems to have gone wrong, you may have used this email to vote already. \nPlease contact a CPC executive on any of the official platforms if problem persists.')
                })
        } else {
            setLoading(false)
            alert("Please make sure to use a Covenant University Email and to vote for each category!")
        }
    }
    const submitNomination = () => {
        setLoading(true)
        console.log(nomineeFormData)
        axios.post("/api/voting/nominee", qs.stringify(nomineeFormData),
            { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        )
            .then(() => {
                setLoading(false)
                alert('You have successfully submitted your nomination!\nPlease stay connected to us on our social media to know when voting commences!')
                setNomineeFormData({
                    fullname: "",
                    image_url: "https://i.pinimg.com/736x/b9/67/82/b96782d0ab0ea492dabcf4a0f00698d2.jpg",
                    category: "",
                    twitter: "",
                    instagram: ""
                })
            }).catch((err) => {
                setLoading(false)
                console.log(err.response.data.error.message)
            })
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
        setFormData(formData => ({ ...formData, [n]: v }))
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
        setModalData(modalData => ({ ...modalData, [n]: v }))
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
                    icon={faTimes} /></h2>
                <h2 className={'text-center uppercase mb-8 font-thickums text-4xl'}>{titleParser(modalData.title)}</h2>

                <div
                    className="overflow-x-scroll lg:overflow-x-hidden lg:overflow-y-scroll no-scrollbar py-2 px-2 w-full">
                    <div
                        className={`flex flex-row lg:grid lg:grid-cols-3`}>
                        {wingsDetails[modalData.title] !== undefined &&
                            wingsDetails[modalData.title].map((i, k) =>
                                <div key={k} className={'wings-radio-input mr-4 lg:mx-auto lg:my-2'}>
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
                                        }} />
                                        <div id="description" className="p-2">
                                            <h2 className="text-white font-semibold text-sm transition">
                                                {i.name}
                                            </h2>
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
                            <span style={{ minHeight: "80px" }} className={'w-1/2 cursor-pointer capitalize flex flex-row items-center'}
                                onClick={() => updateModalData(
                                    "title",
                                    (Object.keys(wingsDetails).indexOf(modalData.title) - 1 < 0) ?
                                        Object.keys(wingsDetails)[Object.keys(wingsDetails).length - 1]
                                        :
                                        Object.keys(wingsDetails)[Object.keys(wingsDetails).indexOf(modalData.title) - 1])}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                                <span className={'pl-2'} dangerouslySetInnerHTML={{
                                    "__html": titleParser((Object.keys(wingsDetails).indexOf(modalData.title) - 1 < 0) ?
                                        Object.keys(wingsDetails)[Object.keys(wingsDetails).length - 1].replaceAll(" ", "<br/>")
                                        :
                                        Object.keys(wingsDetails)[Object.keys(wingsDetails).indexOf(modalData.title) - 1]).replaceAll(" ", "<br/>")
                                }} />
                            </span>
                            <span style={{ minHeight: "80px" }} className={'w-1/2 cursor-pointer capitalize flex flex-row items-center text-right justify-end'}
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
                                }} />
                                <FontAwesomeIcon icon={faChevronRight} />
                            </span>
                        </>
                    }
                </div>
            </Modal>

            <section className='pt-32 px-8 pb-12 max-w-7xl mx-auto'>
                {votingState["voting_state"] === "0" ?
                    <>
                        <h1 className='font-extrabold text-2xl lg:text-6xl mb-8'>
                            Submit Your Nominations Now!
                        </h1>

                        <p>
                            The wings awards are now ongoing and you can submit your nominations.
                            <br />
                            Just select a category, click on the <FontAwesomeIcon icon={faMagnifyingGlass} /> to upload an image and then fill the form.
                        </p>
                    </>
                    : votingState["voting_state"] === "1" ?
                        <>
                            <h1 className='font-extrabold text-2xl lg:text-6xl mb-8'>
                                Your Vote Counts
                            </h1>

                            <p>
                                The voting begins with entering your Covenant University Email address (@cu.edu.ng, @stu.cu.edu.ng or
                                @covenantuniversity.edu.ng), then you'd be allowed to vote on each category.
                                <br />
                                You can only pick one person per category though, and you must select someone from each category.
                                <br />
                                Upon submission of your votes, you receive an email to confirm your affiliation to the university.
                                (Don't worry, it's just a redirect.)
                                <br />
                                After that, your votes will be recorded.
                            </p>
                            <br />
                            <p>
                                {red ? "Enter your Covenant University email! (P.S. Lecturers can vote too!)" : "Ready to begin, click the thumbs up!"}
                            </p>
                        </>
                        :
                        <>

                        </>
                }
            </section>

            <section className='p-8 max-w-7xl mx-auto'>
                {votingState["voting_state"] === "0" ?
                    null
                    :
                    <>
                        <div className="flex justify-center items-center" style={{ minWidth: "150px", minHeight: "150px" }}>
                            <div onClick={() => setRed(true)}
                                id='thumbsUp'
                                className={"rounded-full text-white mx-auto bg-gray-900 w-fit p-8 transition transition-all duration-300 hover:bg-purple-700 cursor-pointer hover:scale-110"}>
                                <FontAwesomeIcon icon={faThumbsUp} size={'4x'} />
                            </div>
                            <input
                                id='thumbsUpInput'
                                type="email"
                                className='px-6 py-4 text-gray-800 transition-all duration-300 hidden opacity-0 w-0 border border-purple-600 outline-none rounded-lg'
                                value={formData.email}
                                onChange={(e) => updateFormData("email", e.target.value)}
                            />
                        </div>
                    </>
                }

                {
                    <p>There are {Object.keys(wingsDetails).length} award categories.</p>
                }

                <div id={"cats"} className={votingState["voting_state"] === "0" ? "mt-12 flex flex-col" : "mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4"}>
                    {
                        (Object.entries(wingsDetails).length === 0 || votingState["voting_state"] == -1) ?
                            <>
                                <div
                                    style={{ minHeight: "96px" }}
                                    className={"bg-gray-400 text-center flex justify-center items-center uppercase w-full text-white font-thickums text-3xl cursor-pointer transition-all duration-300 animate-pulse"} />
                                <div
                                    style={{ minHeight: "96px" }}
                                    className={"bg-gray-400 text-center flex justify-center items-center uppercase w-full text-white font-thickums text-3xl cursor-pointer transition-all duration-300 animate-pulse"} />
                                <div
                                    style={{ minHeight: "96px" }}
                                    className={"bg-gray-400 text-center flex justify-center items-center uppercase w-full text-white font-thickums text-3xl cursor-pointer transition-all duration-300 animate-pulse"} />

                            </>
                            :
                            votingState["voting_state"] === "0" ?
                                <>
                                    <div className="">
                                        <select
                                            name="category"
                                            value={nomineeFormData.category}
                                            onChange={(e) => setNomineeFormData(nomineeFormData => ({ ...nomineeFormData, ["category"]: e.target.value }))}
                                            className="border border-black  bg-white rounded capitalize px-2 py-2 my-2" id="">
                                            <option className="" value="">Select Category</option>
                                            {
                                                votingState["categories"].map((i, k) =>
                                                    <option className="py-2 capitalize px-2" value={i} key={k}>{titleParser(i)}</option>
                                                )
                                            }
                                        </select>
                                        <input type="file" id="image" className="hidden" onChange={(e) => {
                                            let imageData = new FormData()

                                            imageData.set("key", process.env["REACT_APP_IMGBB_API_KEY"])
                                            imageData.append("image", e.target.files[0])
                                            console.log(e.target.files[0])

                                            // axios.post(`https://api.imgbb.com/1/upload?key=${process.env["REACT_APP_IMGBB_API_KEY"]}&image=${e.target.files[0]}`, formData)
                                                axios({
                                                    method: "post",
                                                    url: `https://api.imgbb.com/1/upload?key=${process.env["REACT_APP_IMGBB_API_KEY"]}`,
                                                    params: {
                                                        key: process.env["REACT_APP_IMGBB_API_KEY"],
                                                        image: e.target.files[0],
                                                        name: "image_" + Date.now()
                                                    }
                                                }).then(res => {
                                                    console.log(res.data)
                                                })
                                        }} />

                                        <div
                                            className="block bg-gray-900 w-48 lg:w-72 mx-auto lg:mx-0 rounded-xl overflow-hidden space-y-4 duration-300 transition-all">
                                            <div className="w-full cursor-pointer bg-gray-200 h-40 lg:h-60"
                                                style={{
                                                    background: `url(${nomineeFormData.image_url}) center/cover`,
                                                }}
                                                onClick={() => document.querySelector('#image').click()}
                                            />
                                            <div id="description" className="p-2">
                                                <h2 className="text-white font-semibold text-sm transition" style={{ minHeight: "24px" }}>
                                                    {nomineeFormData.fullname}
                                                </h2>
                                                <div
                                                    className="flex items-center text-sm"
                                                    style={{ minHeight: "36px" }}>
                                                    <div
                                                        className="text-white flex justify-between items-center">
                                                        <a className={"transition-all " + (nomineeFormData.instagram === "" ? "opacity-0" : 'text-lg mr-2')} href="#">
                                                            <FontAwesomeIcon icon={faInstagram} />
                                                        </a>
                                                        <a className={"transition-all " + (nomineeFormData.twitter === "" ? "opacity-0" : 'text-lg mr-2')} href="#">
                                                            <FontAwesomeIcon icon={faTwitter} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p>
                                            *Max image size is 32mb
                                        </p>
                                    </div>

                                    <div className="flex flex-col max-w-xl mt-4">
                                        <div className="relative">
                                            <div className="absolute top-1/2 transform left-2 border-r pr-1 text-gray-600 border-gray-400 -translate-y-1/2">
                                                <FontAwesomeIcon icon={faUser} />
                                            </div>
                                            <input
                                                className="outline-none border border-black w-full px-4 py-2 rounded my-2 pl-8"
                                                value={nomineeFormData.fullname}
                                                placeholder="Fullname"
                                                onChange={(e) => setNomineeFormData(nomineeFormData => ({ ...nomineeFormData, ["fullname"]: e.target.value }))}
                                                type="text" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1/2 transform left-2 border-r pr-1 text-gray-600 border-gray-400 -translate-y-1/2">@</div>
                                            <input
                                                className="outline-none border border-black w-full px-4 py-2 rounded my-2 pl-8"
                                                value={nomineeFormData.instagram}
                                                placeholder="Instagram"
                                                onChange={(e) => setNomineeFormData(nomineeFormData => ({ ...nomineeFormData, ["instagram"]: e.target.value }))}
                                                type="text" />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute top-1/2 transform left-2 border-r pr-1 text-gray-600 border-gray-400 -translate-y-1/2">@</div>
                                            <input
                                                className="outline-none border border-black w-full px-4 py-2 rounded my-2 pl-8"
                                                value={nomineeFormData.twitter}
                                                placeholder="Twitter"
                                                onChange={(e) => setNomineeFormData(nomineeFormData => ({ ...nomineeFormData, ["twitter"]: e.target.value }))}
                                                type="text" />
                                        </div>
                                    </div>
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
            {
                votingState["voting_state"] === "0" ?
                    <div className={'max-w-7xl mx-auto p-8'}>
                        <button onClick={submitNomination} style={{ minWidth: "100px", minHeight: "45px" }}
                            className={'bg-gray-900 text-white mx-auto text-xl transition-all duration-300 py-2 px-4'}>
                            {!loading ? "Submit" : <FontAwesomeIcon className={'animate-spin'} icon={faSpinner} />}
                        </button>
                    </div>
                    :
                    <div className={'max-w-7xl mx-auto p-8'}>
                        <button onClick={submit} style={{ minWidth: "100px", minHeight: "45px" }}
                            className={'bg-gray-900 mx-auto text-xl transition-all duration-300 py-2 px-4 ' + (Object.keys(formData.data).length === 16 ? " w-fit text-white rounded-lg mx-auto font-extrabold" : "w-full text-white")}>
                            {!loading ? "Submit" : <FontAwesomeIcon className={'animate-spin'} icon={faSpinner} />}
                        </button>
                    </div>
            }
        </>
    )
}

export default Voting