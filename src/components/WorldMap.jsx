import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import worldData from '../data/world-110m.json'; // Make sure you have the world-110m.json file

const WorldMap = () => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 960;
        const height = 500;

        const projection = d3.geoMercator()
            .scale(150)
            .translate([width / 2, height / 1.5]);

        const path = d3.geoPath().projection(projection);

        const g = svg.append('g');

        d3.json(worldData).then(world => {
            g.selectAll('path')
                .data(worldData.feature(world, world.objects.countries).features)
                .enter().append('path')
                .attr('d', path)
                .attr('fill', '#ccc')
                .attr('stroke', '#333');
        });

    }, []);

    return (
        <svg ref={svgRef} width="960" height="500"></svg>
    );
};

export default WorldMap;