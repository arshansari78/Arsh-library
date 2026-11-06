import React from "react";

export default function Container({children}) {
    return (
        <div className="  p-4  mt-14">
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}