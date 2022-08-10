import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faThumbsUp, faTruckLoading} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";

const VotingConfirmation = (props) => {
    let {id} = useParams()
    const [con, setCon] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <div className={'h-full w-full flex flex-col justify-center items-center p-2 mx-auto max-w-7xl'}>
            {!con ?
                <FontAwesomeIcon className={'animate-spin text-purple-600'} icon={faSpinner} size={'5x'}/>
                :
                <>
                    <div className="flex justify-center items-center" style={{minWidth: "150px", minHeight: "150px"}}>

                        <div
                            id='thumbsUp'
                            className={"rounded-full text-white mx-auto bg-gray-900 w-fit p-8 transition transition-all duration-300 hover:bg-purple-700 cursor-pointer"}>
                            <FontAwesomeIcon icon={faThumbsUp} size={'4x'}/>
                        </div>
                    </div>
                    <h1 className={'font-thickums text-4xl text-center'}>Thanks For Confirming Your Votes</h1>
                </>
            }
        </div>
    )
}

export default VotingConfirmation