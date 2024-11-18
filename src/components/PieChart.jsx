import { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = () => {
  const ref = useRef();

  useEffect(() => {
    const data = [10, 20, 30, 40, 50];
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal().domain(data).range(d3.schemeCategory10);

    const pie = d3.pie();

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.index));
  }, []);

  return <svg ref={ref}></svg>;
};

export default PieChart;
