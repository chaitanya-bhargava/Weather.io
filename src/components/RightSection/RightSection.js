import "./RightSection.css";
const RightSection = ({ data, error }) => {
  if (!error) {
    return (
      <div className="right-section">
        <p className="temp">
          {data.temp}
          {String.fromCharCode(176)}
        </p>
        <div className="city-data">
          <p className="name">{data.name}</p>
          {data.population && (
            <p className="subtext">Population: {data.population}</p>
          )}
        </div>
        <div className="weather-condition">
          <img src={`icons/${data.icon}.png`} alt="icon" />
          <p className="subtext">{data.condition}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="right-section">
        <p className="subtext">Nothing to display...</p>
      </div>
    );
  }
};

export default RightSection;
