import { useState } from "react";
import { defaultCitites } from "./constant";
import axios from "axios";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import Error from "./components/Error";
import CityList from "./components/CityList"
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cities, setCities] = useState(defaultCitites);
  const [input, setInput] = useState("");
  const [weatherDetails, setWeatherDetails] = useState(null)

  const onChangeInput = async (event) => {
    const city = event.target.value;
    setInput(() => city)
    if (!city) {
      setCities(() => defaultCitites);
      setWeatherDetails(() => null)
    }
    if (city) {
      setError(() => null)
      setLoading(() => true)
      setWeatherDetails(null)
      try {
        const suggestedCities = await fetchCities(city);
        setLoading(() => false)
        setCities(() => suggestedCities)
      } catch (e) {
        setLoading(false)
        setError(e.message)
      }
    }
  }

  const fetchCities = async (city) => {
    try {
      const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6afe745133e0b13dda9586acdc8987ee`);
      return res?.data
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <div>
      <Header></Header>
      <SearchBar input={input} onChangeInput={onChangeInput} />
      {loading && <Loading />}
      {error && <Error error={error} />}
      {cities && <CityList cities={cities} setError={setError} setLoading={setLoading} setWeatherDetails={setWeatherDetails} />}
      {!loading && weatherDetails && <WeatherDetails weatherDetails={weatherDetails} />}
    </div >
  );
}

export default App;
