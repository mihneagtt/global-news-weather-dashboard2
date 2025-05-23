import axios from "axios";
import { CurrentWeatherData, ForecastData } from "../types";

// API keys from environment variables
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

// Guardian API types
interface GuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: GuardianArticle[];
  };
}

interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields?: {
    headline?: string;
    trailText?: string;
    thumbnail?: string;
    bodyText?: string;
  };
}

// Weather API
export const weatherApi = {
  getCurrentWeather: async (
    city: string,
    country: string
  ): Promise<CurrentWeatherData> => {
    try {
      const response = await axios.get<CurrentWeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${WEATHER_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
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
      console.error("Error fetching forecast:", error);
      throw error;
    }
  },
};

// Guardian News API with location-based search
export const newsApi = {
  getTopHeadlines: async (
    city: string,
    country: string,
    section: string = ""
  ): Promise<GuardianArticle[]> => {
    try {
      // Create location-based search query
      const countryNames: { [key: string]: string } = {
        us: "United States",
        gb: "United Kingdom",
        ca: "Canada",
        au: "Australia",
        de: "Germany",
        fr: "France",
        it: "Italy",
        es: "Spain",
        br: "Brazil",
        mx: "Mexico",
        jp: "Japan",
        kr: "South Korea",
        cn: "China",
        in: "India",
        ru: "Russia",
        ro: "Romania",
        pl: "Poland",
        nl: "Netherlands",
        se: "Sweden",
        no: "Norway",
        dk: "Denmark",
        fi: "Finland",
        ch: "Switzerland",
        at: "Austria",
        be: "Belgium",
        pt: "Portugal",
        gr: "Greece",
        tr: "Turkey",
        za: "South Africa",
        eg: "Egypt",
        ma: "Morocco",
        ng: "Nigeria",
        ke: "Kenya",
        ar: "Argentina",
        cl: "Chile",
        co: "Colombia",
        pe: "Peru",
        th: "Thailand",
        my: "Malaysia",
        sg: "Singapore",
        ph: "Philippines",
        id: "Indonesia",
        vn: "Vietnam",
        ua: "Ukraine",
        cz: "Czech Republic",
        sk: "Slovakia",
        hu: "Hungary",
        bg: "Bulgaria",
        hr: "Croatia",
        si: "Slovenia",
        ee: "Estonia",
        lv: "Latvia",
        lt: "Lithuania",
      };

      const countryName = countryNames[country.toLowerCase()] || country;

      // Build the search query - prioritize location-specific news
      const searchQuery = `"${city}" OR "${countryName}"`;

      let url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=headline,trailText,thumbnail&page-size=15&order-by=newest&q=${encodeURIComponent(
        searchQuery
      )}`;

      if (section && section !== "") {
        url += `&section=${section}`;
      }

      const response = await axios.get<GuardianResponse>(url);
      let articles = response.data.response.results;

      // If we get fewer than 10 location-specific articles, supplement with general news from the same section
      if (articles.length < 10) {
        let supplementUrl = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=headline,trailText,thumbnail&page-size=${
          15 - articles.length
        }&order-by=newest`;

        if (section && section !== "") {
          supplementUrl += `&section=${section}`;
        }

        const supplementResponse = await axios.get<GuardianResponse>(
          supplementUrl
        );
        const supplementArticles = supplementResponse.data.response.results;

        // Combine articles, avoiding duplicates
        const existingIds = new Set(articles.map((article) => article.id));
        const newArticles = supplementArticles.filter(
          (article) => !existingIds.has(article.id)
        );

        articles = [...articles, ...newArticles];
      }

      return articles.slice(0, 15); // Limit to 15 articles total
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },
};
