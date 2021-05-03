import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine(props) {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState(null);

  function displayTemperature(response) {
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}
      @2x.png`,
      description: response.data.weather[0].description,
    });
    setLoaded(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "15ebfc2dd8844ab614a089875bddc59e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
    &appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter city name"
        onChange={updateCity}
      />
      <button type="submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}℃</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
