import { useState, useEffect } from "react";
import * as d3 from "d3";
import MapChart from "./components/MapChart";
import "./App.css";
import Top10 from "./components/Top10";

function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    // fetch csv
    const fetchData = async () => {
      const response = await fetch("/data/min.csv");
      const data = await response.text();
      const parsedData = d3.csvParse(data);
      setData(parsedData);
    };

    fetchData();
    /* d3.csv("/data/universal_top_spotify_songs.csv").then((data) => {
      setData(data);
    }); */
  }, []);

  useEffect(() => {
    console.log("country -> ", country);
    if (data.length > 0) {
      const d = data.filter((d) => {
        if (country !== "") {
        
          return d.country === country
        }

        return d.country === "";
      });
      setCountryData(d);
    }
  }, [data, country, setCountryData]);

  return (
    <>
      {data.length > 0 && (
        <div>
          <MapChart data={data} setCountry={setCountry} />
          <Top10 data={countryData.slice(0, 10)} country={country} />
        </div>
      )}
    </>
  );
}

export default App;
