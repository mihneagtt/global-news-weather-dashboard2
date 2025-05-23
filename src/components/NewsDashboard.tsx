import { useState, useEffect } from "react";
import { newsApi } from "../services/api";
import { LocationData, GuardianArticle, Category } from "../types";

interface NewsDashboardProps {
  location: LocationData;
}

const categories: Category[] = [
  { id: "", name: "All" },
  { id: "world", name: "World" },
  { id: "politics", name: "Politics" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "science", name: "Science" },
  { id: "sport", name: "Sports" },
  { id: "culture", name: "Culture" },
];

const NewsDashboard = ({ location }: NewsDashboardProps) => {
  const [news, setNews] = useState<GuardianArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Pass location data to the API for location-specific news
        const articles = await newsApi.getTopHeadlines(
          location.city,
          location.country,
          selectedCategory
        );
        setNews(articles || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Failed to load news data. Please try again later.");
        setLoading(false);
      }
    };

    fetchNews();
  }, [location, selectedCategory]); // Now depends on location changes

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "https://via.placeholder.com/150?text=No+Image";
  };

  // Get country name for display
  const getCountryName = (countryCode: string): string => {
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
    };
    return countryNames[countryCode.toLowerCase()] || countryCode.toUpperCase();
  };

  return (
    <div className="news-section">
      <div className="news-header">
        <h2>News from {getCountryName(location.country)}</h2>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "active" : ""}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-articles">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="skeleton w-75"></div>
              <div className="skeleton" style={{ marginTop: "0.5rem" }}></div>
              <div
                className="skeleton w-50"
                style={{ marginTop: "0.5rem" }}
              ></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center">
          <p>
            No news articles found for {location.city}. Showing general news
            instead.
          </p>
        </div>
      ) : (
        <div className="news-articles">
          {news.map((article, index) => (
            <a
              key={article.id || index}
              href={article.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="news-article"
            >
              {article.fields?.thumbnail && (
                <div className="article-image">
                  <img
                    src={article.fields.thumbnail}
                    alt={article.webTitle}
                    onError={handleImageError}
                  />
                </div>
              )}
              <div className="article-content">
                <h3>{article.fields?.headline || article.webTitle}</h3>
                {article.fields?.trailText && <p>{article.fields.trailText}</p>}
                <div className="article-meta">
                  <span>{article.sectionName}</span>
                  <span>{formatDate(article.webPublicationDate)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsDashboard;
