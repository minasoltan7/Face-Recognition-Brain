import React from "react";


const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="white f3 center">
                {`${name}, Your Current Entry Count is ...`}
            </div>
            <div className="white f1 center">
                {`${entries}`}
            </div>
        </div>
    )
}
export default Rank;