/* eslint-disable react/prop-types */
import { useEffect } from "react";
import countries from "../../public/data/countries.json";
import * as d3 from "d3";

const MapChart = ({ data, setCountry }) => {

  useEffect(() => {

    const countryData = data.filter((d) => d.country !== "");

    const handleCountryClick = (event, country) => {
        console.log("Country clicked -> ", country);
      setCountry(country);
    };

    const groupedByCountry = d3.groups(countryData, (d) => d.country);

    // Specify the chart’s dimensions.
    const width = 1000;
    const marginTop = 46;
    const height = width / 2 + marginTop;

    // Fit the projection.
    const projection = d3.geoEqualEarth().fitExtent(
      [
        [2, marginTop + 2],
        [width - 2, height],
      ],
      { type: "Sphere" }
    );
    const path = d3.geoPath(projection);

    const svg = d3
      .select("#map-chart")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("path")
      .attr("d", path);

    svg
      .append("g")
      .selectAll("path")
      .data(countries.features)
      .join("path")
      .attr("d", path)
      .attr("fill", "white")
      .attr("stroke", "gray")
    .on("click", function(event, d) {
      console.log("Country clicked -> ", d);
      handleCountryClick(event, d.properties.name);
    })
    .append("title")
    .text((d) => d.properties.name)
    .attr("fill", "white");
  }, [data, setCountry]);

  return (
    <div>
      <svg id="map-chart"></svg>
    </div>
  );
};

export default MapChart;
