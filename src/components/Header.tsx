import { useState, FormEvent } from "react";
import { LocationData } from "../types";

interface HeaderProps {
  onLocationChange: (location: LocationData) => void;
}

const Header = ({ onLocationChange }: HeaderProps) => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onLocationChange({
        city: city.trim(),
        country: country.trim().toLowerCase() || "ro",
      });
      setCity("");
      setCountry("");
    }
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <h1>Global News & Weather Dashboard</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter city (e.g. London)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Country code (e.g. gb)"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
