document.addEventListener('DOMContentLoaded', function() {
    const svg = d3.select("#chart");
    const margin = {top: 20, right: 30, bottom: 100, left: 50};
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);

    const xAxis = g.append("g").attr("transform", `translate(0,${height})`);
    const yAxis = g.append("g");

    function updateChart(xAttribute, yAttribute) {
        const data = window.allPlayers;

        const groupedData = d3.rollups(
            data,
            v => d3.sum(v, d => d[yAttribute]),
            d => d[xAttribute]
        ).map(d => ({ key: d[0], value: d[1] }));

        xScale.domain(groupedData.map(d => d.key));
        yScale.domain([0, d3.max(groupedData, d => d.value)]);

        xAxis.transition().call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-0.8em")
            .attr("dy", "0.15em")
            .attr("transform", "rotate(-45)");

        yAxis.transition().call(d3.axisLeft(yScale));

        const points = g.selectAll(".point")
            .data(groupedData, d => d.key);

        points.enter()
            .append("circle")
            .attr("class", "point") 
            .attr("cx", d => xScale(d.key) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.value))
            .attr("r", 5)
            .style("fill", "#007bff"); 

        points.transition()
            .attr("cx", d => xScale(d.key) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.value))
            .attr("r", 5);

        points.exit().remove();
    }

    document.getElementById("x-axis-select").addEventListener("change", function() {
        updateChart(this.value, document.getElementById("y-axis-select").value);
    });

    document.getElementById("y-axis-select").addEventListener("change", function() {
        updateChart(document.getElementById("x-axis-select").value, this.value);
    });

    updateChart("position", "goals");
});
