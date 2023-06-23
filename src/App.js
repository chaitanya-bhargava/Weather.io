import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import RightSection from "./components/RightSection/RightSection";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  return (
    <div className="App">
      <Sidebar
        data={weatherData}
        dataHandler={setWeatherData}
        error={error}
        errorHandler={setError}
        errorTextHandler={setErrorText}
        errorText={errorText}
      />
      {weatherData && <RightSection data={weatherData} error={error} />}
    </div>
  );
}

export default App;
