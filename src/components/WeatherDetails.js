const WeatherDetails = (props) => {
    const { weatherDetails } = props
    return (
        <div style={{ marginLeft: "120px", marginTop: "20px" }}>
            <p>City: {weatherDetails?.name}</p>
            <p>Current Temp: {weatherDetails?.main?.temp}</p>
            <p>Max Temp: {weatherDetails?.main?.temp_max}</p>
            <p>Min Temp: {weatherDetails?.main?.temp_min}</p>
            <p>Humidity: {weatherDetails?.main?.humidity}%</p>
            <p>Feel Like: {weatherDetails?.main?.feels_like}</p>
        </div>
    )
}

export default WeatherDetails