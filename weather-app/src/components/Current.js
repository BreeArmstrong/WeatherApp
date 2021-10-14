import {React, useState} from "react";
import Conditions from "./Conditions";

const Current = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [responseObj, setResponseObj] = useState({});

    function getCurrent(e) {
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }

        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});
        
        setLoading(true);
        let uriEncodedCity = encodeURIComponent(city);
        // The following is bad and should be kept Serverside due to the changes in React App. 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`;


        fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error()
            }
            setResponseObj(response);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
	        console.error(err.message);
        });
    }

    return (
       <div>
           <form onSubmit={getCurrent}>
               <label>
                   City name:
                </label>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <div className="temp">
                    <p onClick={(e) => setUnit(e.target="imperial")}>°F</p>
                    <p>|</p>
                    <p onClick={(e) => setUnit(e.target="metric")}>°C</p>
                </div>
                <button type="submit">Get Forecast</button>
            </form>
           <Conditions 
                responseObj={responseObj}
                error={error}
                loading={loading} 
                />
       </div>
    )
}

export default Current;