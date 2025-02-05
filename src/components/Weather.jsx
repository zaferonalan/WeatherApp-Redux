import { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { BsCloud } from "react-icons/bs"
import { FaLocationDot, FaWind } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"
import { fetchForecastByCity } from "../redux/weatherSlice"


import sunnyImage from "../assets/sunny.jpg"
import snowImage from "../assets/snow.jpg"
import cloudImage from "../assets/cloud.jpg"
import rainImage from "../assets/rain.jpg"

const Weather = () => {
    const disatch = useDispatch();

    useEffect(() => {
        disatch(fetchForecastByCity("İzmir"))
    },[disatch])

    const forecast = useSelector((state) => state.weather.forecast)
    console.log(forecast)

    const forecastHours = forecast?.forecast?.forecastday[0]?.hour.slice(0,10)

    const [city, setCity] = useState("")

    const handleSearch = () => {
        if(city.trim() !== ""){
            disatch(fetchForecastByCity(city))
        }
    }

    const WeatherCondition = forecast?.current?.condition?.text?.toLowerCase()
    let backgroundImage = sunnyImage

    if (WeatherCondition) {
        if (WeatherCondition.includes("sunny") || WeatherCondition.includes("clear")) {
            backgroundImage = sunnyImage
        }else if(WeatherCondition.includes("rain")){
            backgroundImage = rainImage
        }else if(WeatherCondition.includes("snow")){
            backgroundImage = snowImage
        }else if(WeatherCondition.includes("snow") || WeatherCondition.includes("overcast")){
            backgroundImage = cloudImage
        }
    }

  return (
    <div className="weather-container" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }}>
        <div className='main-section'>
            <div className='weather-info'>
                <div className="location ">
                    <h3>{forecast?.location?.name} - {forecast?.location?.country}</h3>
                </div>
                <div className="condition">
                    <h1>{forecast?.current?.condition?.text}</h1>
                </div>
            </div>
            <div className='weather-hours'>
                {forecastHours?.map((hour, index) => {
                    const time = new Date(hour.time).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })
                    return(
                        <div className="hour-card" key={index}>
                            <div className="hour-time">
                                <p>{time}</p>
                            </div>
                            <div className="hour-condition">
                                <img src={hour?.condition.icon} alt="" />
                            </div>
                            <div className="hour-temp">
                                <h2>{Math.ceil(hour?.temp_c)}°C</h2>
                            </div>
                        </div>
                    )
                } )}
                
            </div>
        </div>
        <div className="side-section">
            <div className="search-box">
                <FaLocationDot className="icon"/>
                <input type="text" placeholder={forecast?.location?.name} value={city} onChange={(e) => setCity(e.target.value)}/>
                <BiSearch className="icon" onClick={handleSearch}/>
            </div>
            <div className="temp-info">
                <h1>{Math.ceil(forecast?.current?.temp_c)}°C</h1>
                <p>
                    <FaWind/> {forecast?.current?.wind_di}{" "} {forecast?.current?.wind_kph} km/h
                </p>
            </div>
            <div className="forecast-days">
                <h1 className="forecast-heading">The Next Days Forecast</h1>
                {forecast?.forecast?.forecastday?.map((item, index) => {
                    const forecastDate = new Date(item.date).toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long"
                    })
                    return(
                        <div className="forecast-item" key={index}>
                            <div className="forecast-details">
                                <div className="forecast-icon">
                                    <img src={item.day.condition.icon} alt="" />
                                </div>
                                <div className="details">
                                    <h2>{forecastDate}</h2>
                                    <p>{item.day.condition.text}</p>
                                </div>
                            </div>
                            <div className="forecast-temp">
                                <div className="temp-display">
                                    <h2>{Math.ceil(item.day.maxtemp_c)}°C</h2>
                                    <h2>{Math.ceil(item.day.mintemp_c)}°C</h2>
                                </div>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        </div>
    </div>
  )
}

export default Weather