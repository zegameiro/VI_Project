import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import * as d3 from "d3";
import MapChart from "./components/MapChart";
import Top10 from "./components/Top10";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";

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
    <div className="bg-[#1a1a1a] min-h-screen text-white px-10 py-5">
      {data.length > 0 && (
        <div className="flex flex-col">
          <div className="flex flex-row justify-evenly">
            <MapChart data={data} setCountry={setCountry} />
            <Top10 data={countryData.slice(0, 10)} country={country} />
          </div>
          <div>
            <Button color="primary" onClick={() => setCountry("")}>Clear Filters</Button>
          </div>
          <div className="flex flex-row justify-evenly">
            <LineChart data={data} />
            <PieChart data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
