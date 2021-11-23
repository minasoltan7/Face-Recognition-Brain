import React from "react";


const Navigation = ({ onRouteChange, isSignedIn }) => {
    // eslint-disable-next-line no-lone-blocks
    {
        if (isSignedIn) {
            return (
                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p className="f4 link dim ma3 black underline  pointer" onClick={() => onRouteChange("signout")}>Sign Out</p>
                </nav>
            )
        } else {
            return (
                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p className="f4 link dim ma3 black underline  pointer" onClick={() => onRouteChange("signin")}>Sign In</p>
                    <p className="f4 link dim ma3 black underline  pointer" onClick={() => onRouteChange("Register")}>Register</p>
                </nav>
            )
        }
    }
}

// Other solution
// const Navigation = ({ onRouteChange,route }) => {
//     // eslint-disable-next-line no-lone-blocks
//     {
//         if (route === "home") {
//             return (
//                 <nav style={{ display: "flex", justifyContent: "flex-end" }}>
//                     <p className="f4 link dim ma3 black underline  pointer" onClick={() => onRouteChange("signout")}>Sign Out</p>
//                 </nav>
//             )

//         } else {
//             return (
//                 <nav style={{ display: "flex", justifyContent: "flex-end" }}>
//                     <p className="f4 link dim ma3 black underline  pointer" onClick={() => onRouteChange("signin")}>Sign In</p>
//                     <p className="f4 link dim ma3 black underline  pointer" onClick={() => onRouteChange("Register")}>Register</p>
//                 </nav>
//             )
//         }
//     }
// }



export default Navigation;