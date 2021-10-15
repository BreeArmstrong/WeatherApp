import React from "react";

const Icon = (props) => {
    let image = `${props.icon}`;


    return <img src={process.env.PUBLIC_URL + image +".png"} alt="icon" /> 
    
}

export default Icon;