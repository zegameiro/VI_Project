import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Chip } from "@nextui-org/react";

const PieChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const d = data.filter((song) => song.country == "").slice(0, 10);

    const da = d3.group(d, (song) => song.is_explicit);

    const chart_data = [
      {
        name: "Non Explicit",
        value: da.get("False").length,
      },
      {
        name: "Explicit",
        value: da.get("True").length,
      },
    ];

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const arc = d3.arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1)

      const color = d3.scaleOrdinal()
      .domain(chart_data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), chart_data.length).reverse())

    const pie = d3.pie()
      .padAngle(1 / radius)
      .sort(null)
      .value(d => d.value);

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto");

    svg.append("g")
      .selectAll()
      .data(pie(chart_data))
      .join("path")
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.name}: ${d.value.toLocaleString()}`);

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(chart_data))
      .join("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .call((text) => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .attr("fill", "white")
            .text((d) => d.data.name)
        )
        .call((text) => text.filter((d) => d.endAngle - d.startAngle > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill", "white")
            .attr("fill-opacity", 0.7)
            .text((d) => d.data.value.toLocaleString("en-US"))
        );
  }, []);

  return (
    <div className="flex flex-col items-center space-y-10">
      <h1 className="font-semibold">Number of Explicit and Non Explicit songs</h1>
      <svg ref={ref}></svg>
    </div>
  );
};

export default PieChart;
