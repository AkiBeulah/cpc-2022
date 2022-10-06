import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Event = ({ title = "", subtitle, img, date, link }) => {

    return (
        <>
            <div class="p-4 w-full" >
                <div class="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <div class="w-full">
                        <div class="w-full flex p-2">
                            <div class="pl-2 pt-2 ">
                                <p class="text-xs text-purple-600">{new Date(1504095567183).toLocaleTimeString("en-US") + " " + new Date(date * 1).toLocaleDateString("en-US")}</p>
                            </div>
                        </div>
                    </div>


                    <img class="lg:h-48 md:h-36 w-full object-cover object-center" src={img} alt={title + " cover"} />

                    <div class="p-4">
                        <h1 class="title-font text-lg font-medium text-purple-600 mb-3 uppercase">{title}</h1>
                        <h2 class="tracking-widest text-xs title-font text-grey-600 mb-1">{subtitle}</h2>
                        <div class="flex items-center flex-wrap ">
                            <a href={link} target="_blank" class="text-gray-800 text-xs md:mb-2 lg:mb-0">
                                <p class="inline-flex items-center">
                                    Read More
                                    <span className="p-2">
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                </p>
                            </a>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Event