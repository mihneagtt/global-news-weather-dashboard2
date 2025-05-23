import axios from 'axios';
import { CurrentWeatherData, ForecastData, NewsResponse } from '../types/index.ts';

// API keys from environment variables
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Weather API
export const weatherApi = {
  getCurrentWeather: async (city: string, country: string): Promise<CurrentWeatherData> => {
    try {
      const response = await axios.get<CurrentWeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${WEATHER_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },
  
  getForecast: async (city: string, country: string): Promise<ForecastData> => {
    try {
      const response = await axios.get<ForecastData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${WEATHER_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }
};

// News API
export const newsApi = {
  getTopHeadlines: async (country: string, category: string = ''): Promise<NewsResponse> => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${NEWS_API_KEY}`;
      
      if (category) {
        url += `&category=${category}`;
      }
      
      const response = await axios.get<NewsResponse>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
};