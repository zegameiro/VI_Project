import { useEffect, useState } from "react"
import countries from "../../public/data/countries.json"
import * as d3 from 'd3';

const MapChart = ({ data }) => {

    const [countryPopularity, setCountryPopularity] = useState()

    useEffect(() => {

        // Filter out empty country data
        const countryData = data.filter(d => d.country !== "");

        // Group data by country
        const groupedByCountry = d3.groups(countryData, d => d.country);

        // Calculate average popularity for each country
        let avgPopularity = {};
        groupedByCountry.forEach(([country, songs]) => {
            const top50songs = songs.slice(0, 50);
            const avg = d3.mean(top50songs, d => +d.popularity);
            avgPopularity[country] = avg;
        });

        avgPopularity = Object.entries(avgPopularity)

        // Specify the chart’s dimensions.
        const width = 928;
        const marginTop = 46;
        const height = width / 2 + marginTop;

        // Fit the projection.
        const projection = d3.geoEqualEarth().fitExtent([[2, marginTop + 2], [width - 2, height]], { type: "Sphere" });
        const path = d3.geoPath(projection);

        // Index the values and create the color scale.
        const valuemap = new Map(avgPopularity.map(d => [d.name, d.hale]));
        const color = d3.scaleSequential(d3.extent(valuemap.values()), d3.interpolateYlGnBu);

        // Create the SVG container.
        const svg = d3.select("#map-chart")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");


        // Add a white sphere with a black border.
        svg.append("path")
            .datum({ type: "Sphere" })
            .attr("fill", "white")
            .attr("d", path);

        // Add a path for each country and color it according te this data.
        svg.append("g")
            .selectAll("path")
            .data(countries.features)
            .join("path")
                .attr("fill", d => color(valuemap.get(d.properties.name)))
                .attr("d", path)
            .append("title")
                .text(d => `${d.properties.name}\n${valuemap.get(d.properties.name)}`);
    }, []);

    return (
        <div>
            <h1>Top 50 Average Song Popularity by Country</h1>
            <svg id="map-chart"></svg>
        </div>
    )
}

export default MapChart