import coldBg from "../../../assets/cold.jpg";
import hotBg from "../../../assets/hot.jpg";
import './Dashboard.css';
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "../../service/weatherService";
import Descriptions from "../../../components/Descriptions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDashboard() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);

        // dynamic bg
        const threshold = units === "metric" ? 20 : 60;
        if (data.temp <= threshold) setBg(coldBg);
        else setBg(hotBg);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        toast.error('Please enter a correct city name.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchWeatherData();
  }, [units, city]);


  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div
      className="w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${coldBg})` }}
    >
      <div class="w-full h-screen bg-[var(--background-overlay)]">
      {weather && (
      <div class="max-w-screen-md mx-auto h-full flex items-center justify-between flex-col p-4">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..." />
              <button onClick={(e) => handleUnitsClick(e)} className="text-black">°F</button>
          </div>
          <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather?.name}, ${weather?.country}`}</h3>
              <img
                src={weather?.iconURL}
                alt="weathericon"
              />
              <h3>{weather?.description}</h3>
            </div>
            <div className="temperature ">
              <h1 cla>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
            </div>
          </div>
          <Descriptions weather={weather} units={units} />
                  </div>
                )}
      </div>
    </div>
  );
}

export default UserDashboard;
