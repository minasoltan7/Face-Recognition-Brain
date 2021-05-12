import React from "react";


const Navigation = ({onRouteChange ,isSignedIn}) => {
        {
        if(isSignedIn){
            return(
                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                        <p className="f4 link dim ma3 black underline  pointer" onClick={()=>onRouteChange("signout")}>Sign Out</p>
                </nav>
        )

        }else{
            return(
                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p className="f4 link dim ma3 black underline  pointer" onClick={()=>onRouteChange("signin")}>Sign In</p>
                    <p className="f4 link dim ma3 black underline  pointer" onClick={()=>onRouteChange("Register")}>Register</p>
                </nav>
            )
        }
    }
}



export default Navigation;