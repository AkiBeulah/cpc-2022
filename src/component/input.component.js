import {React} from "react";

const Input = (props) => {
    return(
        <div className="h-24">
            <p className='font-serif text-xs'>{props.title}</p>
            <input className=' mt-1 pl-3 w-[500px] h-12 border-[0.5px] rounded-md bg-transparent font-serif text-xs border-[#4F1CB3] ' placeholder= {props.placeholder}/>
            {
                props.title === "Verification code" &&
                <div className=" mt 1">
                    <button className="text-xs text-[#4F1CB3]" onClick={()=> alert("Change email")}>Change email</button>
                </div>
            }
        </div>
    );
}

export default Input;