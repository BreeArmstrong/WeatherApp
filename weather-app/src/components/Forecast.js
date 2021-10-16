import React from "react";
import Icon from "./Icon";

const Forecast = (props) => {
    console.log(props.responseObj);
    console.log(props.error)
    return (
        <div>
           {props.error && <small>Please enter a valid city.</small>}
           {props.loading && <div>Loading...</div>}
           {props.responseObj.cod === 200 ?
            <div>
               <div class="card m-5 current-conditions">
                    <div class="card-body">
                        <div class="card-title">
                        <h4 class="d-flex justify-content-center">In {props.responseObj.name}, {props.responseObj.sys.country} </h4>
                        </div>
                        <div class="d-flex justify-content-center">
                            <Icon icon={props.responseObj.weather[0].icon}/>
                        </div>
                        {/* Round the degrees */}
                        <div class="card-text">
                            <h5>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</h5>
                        </div>
                    </div>
               </div>
            </div>
           : null
           }
       </div>
    )
}

export default Forecast;