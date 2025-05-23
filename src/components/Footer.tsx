const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <p>
              &copy; {new Date().getFullYear()} Global News & Weather Dashboard
            </p>
            <p>Powered by NewsAPI and OpenWeatherMap</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
