/* eslint-disable react/prop-types */
import { useEffect } from "react";
import countries from "../../public/data/countries.json";
import * as d3 from "d3";
import HelpPopHover from "./HelpPopOver";

const MapChart = ({ data, setCountry }) => {

  useEffect(() => {

    const countryData = data.filter((d) => d.country !== "");

    const handleCountryClick = (event, country) => {
      setCountry(country);
    };

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

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "black")
      .style("border", "1px solid #ccc")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("box-shadow", "0px 2px 10px rgba(0, 0, 0, 0.1)")
      .style("visibility", "hidden")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("color", "white");

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
    .on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible")
        .html(d.properties.name);
    })
    .on("mousemove", event => {
      tooltip.style("top", `${event.pageY - 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    })
    .append("title")
    .text((d) => d.properties.name)
    .attr("fill", "white");
  }, [data, setCountry]);

  return (
    <div className="flex flex-col text-center">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">Map of the World</h1>
        <HelpPopHover />
      </div>
      <svg id="map-chart"></svg>
    </div>
  );
};

export default MapChart;
