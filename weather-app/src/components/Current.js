import {React, useState} from "react";
import Ahead from "./Ahead";
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
            <div class="search-conditions">
                <form class="d-flex align-contents-center" onSubmit={getCurrent}>
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
                        <button class="btn btn-outline-secondary" type="submit">Get Forecast</button>
                    </form>
            </div>
            <Conditions 
            responseObj={responseObj}
            error={error}
            loading={loading} 
            />
            <Ahead 
                city={city}
                unit={unit}
            />
        </div>
    )
}

export default Current;