import { useEffect } from "react";
import countries from "../../public/data/countries.json";
import * as d3 from "d3";

const BubbleMap = ({ data, song, setCountry }) => {

  useEffect(() => {

    const songDataByCountry = data.filter(
      (s) => s.spotify_id === song.spotify_id && s.country !== ""
    );

    const countryPopularityMap = new Map(
      songDataByCountry.map((d) => [d.country, d.daily_rank])
    );

    console.log(songDataByCountry);

    const width = 1000;
    const marginTop = 46;
    const height = width / 2 + marginTop;

    const projection = d3.geoEqualEarth().fitExtent(
      [
        [2, marginTop + 2],
        [width - 2, height],
      ],
      { type: "Sphere" }
    );

    const path = d3.geoPath(projection);

    const svg = d3.select("#bubble-map")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    const tooltip = d3
      .select("body")
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

    svg.append("g")
      .selectAll("path")
      .data(countries.features)
      .join("path")
      .attr("d", path)
      .attr("fill", "#E5E5E5")
      .attr("stroke", "gray");

    const maxPopularity = d3.max(songDataByCountry, (d) => d.daily_rank) || 1;

    const bubbleScale = d3.scaleSqrt()
      .domain([0, maxPopularity])
      .range([0 , 3])

    // Scale for bubble color
    const colorScale = d3.scaleSequential()
      .domain([0, maxPopularity])
      .interpolator(d3.interpolateBlues);

    svg.append("g")
      .selectAll("circle")
      .data(songDataByCountry)
      .join("circle")
      .attr("cx", (d) => {
        const countryFeature = countries.features.find(
          (f) => f.properties.name === d.country
        );
        if (!countryFeature) return null;
        const coords = projection(d3.geoCentroid(countryFeature));
        return coords ? coords[0] : null;
      })
      .attr("cy", (d) => {
        const countryFeature = countries.features.find(
          (f) => f.properties.name === d.country
        );
        if (!countryFeature) return null;
        const coords = projection(d3.geoCentroid(countryFeature));
        return coords ? coords[1] : null;
      })
      .attr("r", (d) => bubbleScale(d.popularity))
      .attr("fill", (d) => colorScale(d.popularity))
      .attr("opacity", 0.7)
      .on("click", (event, d) => {
        setCountry(d.properties.name);
      })
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
        .html(`<b>${d.country}</b><br />Ranking: ${d.daily_rank}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY - 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

      return () => {
        tooltip.remove();
      }

  }, [data, song]);

  return (
    <div className="flex flex-col items-center space-y-10">
      <h1 className="font-semibold">Ranking of the song <span className="underline italic text-green-500">{song.name}</span> by <span className="underline italic text-green-500">{song.artists}</span> across the world</h1>
      <svg id="bubble-map"></svg>
    </div>
  )

};

export default BubbleMap;
