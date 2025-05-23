import { useState, useEffect } from "react";
import { weatherApi } from "../services/api";
import { LocationData, CurrentWeatherData, ForecastItem } from "../types";

interface WeatherDashboardProps {
  location: LocationData;
}

const WeatherDashboard = ({ location }: WeatherDashboardProps) => {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [currentData, forecastData] = await Promise.all([
          weatherApi.getCurrentWeather(location.city, location.country),
          weatherApi.getForecast(location.city, location.country),
        ]);

        setCurrentWeather(currentData);

        // Process forecast data to get one forecast per day
        const dailyForecast = forecastData.list
          .filter((item, index) => index % 8 === 0)
          .slice(0, 5);

        setForecast(dailyForecast);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setError("Failed to load weather data. Please try again later.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  const formatDay = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  if (loading) {
    return (
      <div className="weather-section">
        <h2>Weather Dashboard</h2>
        <div className="loading">
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-section">
        <h2>Weather Dashboard</h2>
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!currentWeather || !forecast) {
    return (
      <div className="weather-section">
        <h2>Weather Dashboard</h2>
        <div className="error">
          <p>No weather data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-section">
      <h2>Weather in {currentWeather.name}</h2>

      {/* Current Weather */}
      <div className="weather-current">
        <div className="weather-header">
          {currentWeather.weather[0].icon && (
            <img
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt={currentWeather.weather[0].description}
            />
          )}
          <div>
            <h3>{Math.round(currentWeather.main.temp)}°C</h3>
            <p>{currentWeather.weather[0].description}</p>
          </div>
        </div>
        <div className="weather-details">
          <div className="detail-item">
            <p>Feels like</p>
            <p>{Math.round(currentWeather.main.feels_like)}°C</p>
          </div>
          <div className="detail-item">
            <p>Humidity</p>
            <p>{currentWeather.main.humidity}%</p>
          </div>
          <div className="detail-item">
            <p>Wind</p>
            <p>{Math.round(currentWeather.wind.speed * 3.6)} km/h</p>
          </div>
          <div className="detail-item">
            <p>Pressure</p>
            <p>{currentWeather.main.pressure} hPa</p>
          </div>
        </div>
      </div>

      {/* 5-day Forecast */}
      <div className="weather-forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-item">
              <p className="day">{formatDay(day.dt)}</p>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
              </div>
              <p className="temp">{Math.round(day.main.temp)}°C</p>
              <p className="description">{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
