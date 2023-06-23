import { useRef, useState, useEffect } from "react";
import "./Sidebar.css";
const Sidebar = ({
  data,
  dataHandler,
  error,
  errorHandler,
  errorTextHandler,
  errorText,
}) => {
  const cityInputRef = useRef();
  const [cityName, setCityName] = useState("New Delhi");
  useEffect(() => {
    async function fetchData() {
      if (cityName === "") {
        errorTextHandler("Please enter a valid city name!");
        errorHandler(true);
        return;
      }
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b3257e61c452dcc761c19d2378555860`
      );
      const data = await weatherResponse.json();
      const populationResponse = await fetch(
        `https://restcountries.com/v3.1/capital/${cityName}?fields=capital,population`
      );
      const populationData = await populationResponse.json();
      let population;
      if ("status" in populationData) {
        population = null;
      } else if (populationData[0].capital[0].toLowerCase() === `${cityName}`) {
        population = populationData[0].population.toLocaleString("en-US");
      } else {
        population = (1380004385).toLocaleString("en-US");
      }
      if (data.cod === 200) {
        const transformedData = {
          id: data.id,
          name: data.name,
          temp: Math.floor(data.main.temp - 273.15),
          humidity: data.main.humidity,
          windspeed: data.wind.speed,
          condition: data.weather[0].main,
          population: population,
          cod: data.cod,
          icon: data.weather[0].icon,
        };
        dataHandler(transformedData);
        errorHandler(false);
        errorTextHandler("");
      } else {
        dataHandler(data);
        const newError =
          data.message.charAt(0).toUpperCase() + data.message.substr(1) + "!";
        errorHandler(true);
        errorTextHandler(newError);
      }
    }
    fetchData();
  }, [cityName, dataHandler, errorHandler, errorTextHandler]);
  const searchHandler = () => {
    const enteredCity = cityInputRef.current.value;
    setCityName(enteredCity.toLowerCase());
    cityInputRef.current.value = "";
  };
  if (!data) {
    return;
  }
  if (!error) {
    return (
      <div className="sidebar">
        <div className="search">
          <input
            type="text"
            name="city"
            placeholder="Search City"
            ref={cityInputRef}
            className="search-field"
          />
          <img src="search-icon.svg" alt="search" onClick={searchHandler} />
        </div>
        <div className="main-data-responsive">
          <div className="divider" />
          <p className="temp">
            {data.temp}
            {String.fromCharCode(176)}
          </p>
          <div className="city-data">
            <p className="name">{data.name}</p>
            {data.population && (
              <p className="subtext">Population: {data.population}</p>
            )}
          </div>
          <div className="weather-condition">
            <img src={`icons/${data.icon}.png`} alt="icon" />
            <p className="subtext">{data.condition}</p>
          </div>
        </div>
        <div className="divider" />
        <div className="details">
          <p className="heading">Weather Details</p>
          <div className="detail-item">
            <p>Humidity:</p> <p>{data.humidity} %</p>
          </div>
          <div className="detail-item">
            <p>Wind:</p> <p>{data.windspeed} m/s</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="sidebar">
        <div className="search-wrapper">
          <div className="search">
            <input
              type="text"
              name="city"
              placeholder="Search City"
              ref={cityInputRef}
              className="search-field"
            />
            <img src="search-icon.svg" alt="search" onClick={searchHandler} />
          </div>
          {error && <p className="error-text">{errorText}</p>}
        </div>
        <div className="divider" />
        <div className="details">
          <p className="heading">Weather Details</p>
          <div className="detail-item">
            <p>Nothing to display...</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
