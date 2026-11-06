import React from "react";

export default function Loading({text="Loading..."}) {
    return (
        <div className="w-full h-56 flex flex-col gap-4 items-center justify-center ">
            <span className="relative flex size-7">
                <span className="absolute inline-flex h-full w-full  animate-ping rounded-full bg-sky-400 opacity-75"></span>
            </span>
            <span>
                {text}
            </span>
            
        </div>
    )
}
           