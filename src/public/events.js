import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Event from "../component/event.component"
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get('/api/events/')
            .then(res => {
                setEvents(res.data.events)
            })
    })

    return (
        <>
            <section className='pt-32 px-8 pb-12 max-w-7xl mx-auto'>
                <h1 className='font-extrabold text-2xl lg:text-4xl mb-8'>
                    <div className="hidden lg:block">
                        Leadership, <br />
                        Skillset Acquisition, <br />
                        & Gbedu dey.
                    </div>
                    <div className="block lg:hidden">
                        Leadership,
                        Skillset Acquisition,
                        & Gbedu dey.
                    </div>
                </h1>

                <div className="relative">
                    <input
                        className="w-full px-4 py-2 rounded-lg outline-none border border-gray-600 transition-all duration-300 focus:border-purple-600"
                        type="text" />
                    <span className="absolute text-lg top-1/2 transform -translate-y-1/2 right-6 text-gray-600"><FontAwesomeIcon icon={faSearch} /></span>
                </div>
            </section>

            <section className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {
                    events.map((i, k) =>
                        <Event
                            key={k}
                            title={i.title}
                            subtitle={i.subtitle}
                            img={i.image_url}
                            link={i.link}
                            date={i.created_at}
                        />
                    )
                }
            </section>
        </>
    )
}

export default Events