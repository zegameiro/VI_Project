import { useEffect } from "react";
import * as d3 from "d3";

const SpiderChart = ({ song }) => {
  useEffect(() => {
    const data = [
      { axis: "Popularity", value: song.popularity / 100, color: "#FF5733" },
      { axis: "Dancebility", value: song.danceability, color: "#33FF57" },
      { axis: "Energy", value: song.energy, color: "#3357FF" },
      { axis: "Speechiness", value: song.speechiness, color: "#FF33A1" },
      { axis: "Acousticness", value: song.acousticness, color: "#A133FF" },
      { axis: "Liveness", value: song.liveness, color: "#33FFF6" },
      { axis: "Valence", value: song.valence, color: "#FF8C33" },
    ];

    const width = 300;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const levels = 5; // Number of concentric circles
    const angleSlice = (Math.PI * 2) / data.length;
    const chartId = `spider-chart-${song.spotify_id}`;

    d3.select(`#${chartId}`).select("svg").remove();

    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Draw concentric circles
    for (let i = 0; i < levels; i++) {
      svg
        .append("circle")
        .attr("r", radius * ((i + 1) / levels))
        .attr("fill", "none")
        .attr("stroke", "#ccc");
    }

    data.forEach((d, i) => {
      const x = radius * Math.cos(angleSlice * i - Math.PI / 2);
      const y = radius * Math.sin(angleSlice * i - Math.PI / 2);

      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", d.color)
        .attr("stroke-width", 2);

      const labelOffset = 20;
      svg
        .append("text")
        .attr("x", x * (1 + labelOffset / radius))
        .attr("y", y * (1 + labelOffset / radius))
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", d.color)
        .text(d.axis);
    });

    // Prepare data points for the polygon
    const points = data.map((d, i) => {
      const x = d.value * radius * Math.cos(angleSlice * i - Math.PI / 2);
      const y = d.value * radius * Math.sin(angleSlice * i - Math.PI / 2);
      return [x, y];
    });

    const tooltip = d3
      .select(`#${chartId}`)
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "#fff")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Draw the data polygon
    svg
      .append("polygon")
      .attr("points", points.map((p) => p.join(",")).join(" "))
      .attr("fill", "url(#gradient-area)")
      .attr("stroke", "#0096ff")
      .attr("stroke-width", 2)
      .on("mouseover", () => {
        tooltip
          .style("opacity", 1)
          .html(
            data
              .map(
                (d) =>
                  `<strong>${d.axis}:</strong> ${d.value}`
              )
              .join("<br/>")
          );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Create a gradient for the area
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient-area")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");

    data.forEach((d, i) => {
      gradient
        .append("stop")
        .attr("offset", `${(i / data.length) * 100}%`)
        .attr("stop-color", d.color)
        .attr("stop-opacity", 0.5);
    });
  }, [song]);

  return <div id={`spider-chart-${song.spotify_id}`}></div>;
};

export default SpiderChart;
