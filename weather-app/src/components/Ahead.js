import {React, useEffect, useState} from "react";
import Icon from "./Icon";

const Ahead = (props) => {
    let uriEncodedCity = encodeURIComponent(props.city);
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    

    console.log(uriEncodedCity, props.unit)
    useEffect(() => {
        function getForecast() {

            if (props.city.length === 0) {
                return setError(true);
            }

            // Clear state in preparation for new data
            setError(false);
            
            setLoading(true);
            // The following is bad and should be kept Serverside due to the changes in React App. 
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${uriEncodedCity}&units=${props.unit}&appid=${process.env.REACT_APP_API_KEY}`;


            fetch(url)
            .then(response => response.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }
                <div>
                    <div class="card m-5 current-conditions">
                        <div class="card-body">
                            <div class="card-title">
                            <h4 class="d-flex justify-content-center">In {response.name}, {response.sys.country} </h4>
                            </div>
                            <div class="d-flex justify-content-center">
                                <Icon icon={response.weather[0].icon}/>
                            </div>
                            {/* Round the degrees */}
                            <div class="card-text">
                                <h5>It is currently {Math.round(response.main.temp)} degrees out with {response.weather[0].description}.</h5>
                            </div>
                        </div>
                    </div>
                </div>       
              
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.error(err.message);
            });
        }
    })
    return(
        <div>
            {error}
            {loading}
        </div>
        
    );
}

export default Ahead;