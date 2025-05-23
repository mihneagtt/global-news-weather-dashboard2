import { useState } from "react";
import Header from "./components/Header.tsx";
import WeatherDashboard from "./components/WeatherDashboard.tsx";
import NewsDashboard from "./components/NewsDashboard.tsx";
import Footer from "./components/Footer.tsx";
import { LocationData } from "./types";
import "./styles/main.scss";

function App() {
  const [location, setLocation] = useState<LocationData>({
    city: "Bucharest",
    country: "ro",
  });

  const handleLocationChange = (newLocation: LocationData) => {
    setLocation(newLocation);
  };

  return (
    <div className="app-container">
      <Header onLocationChange={handleLocationChange} />
      <main>
        <div className="container">
          <div className="grid">
            <WeatherDashboard location={location} />
            <NewsDashboard location={location} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
