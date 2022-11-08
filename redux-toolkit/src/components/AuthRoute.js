import React from "react";

const AuthRoute = ({children}) => {
    const isLogin = false;
    if(!isLogin) return <h1>Acess denied</h1> ;
    return(
        
        <div>
            <h1>Auth Router</h1>
        </div>
    )
}
export default AuthRoute;