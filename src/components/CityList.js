import axios from "axios"

const CityList = (props) => {
    const { cities = [], setLoading, setError, setWeatherDetails } = props
    const fetchWeatherDetails = async (city) => {
        try {
            setLoading(true)
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city?.lat}&lon=${city?.lon}&units=metric&appid=6afe745133e0b13dda9586acdc8987ee`);
            console.log(res.data)
            setLoading(false)
            setWeatherDetails(() => res?.data)
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }

    return (
        <ul style={{ marginLeft: "120px" }}>
            {cities.map(city => {
                return (
                    <li onClick={() => fetchWeatherDetails(city)}>
                        <span>{city?.name}</span> <span>{city?.state}</span> <span>{city?.country}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export default CityList