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

    function updateChart(displayMode, xAttribute, includeGoals, includeAssists) {
        const data = window.allPlayers;

        let filteredData = data.filter(d => (includeGoals && d.goals > 0) || (includeAssists && d.assists > 0));

        const groupedData = d3.rollups(
            filteredData,
            v => ({
                goals: d3.sum(v, d => includeGoals ? d.goals : 0),
                assists: d3.sum(v, d => includeAssists ? d.assists : 0)
            }),
            d => d[xAttribute]
        ).map(d => ({ key: d[0], goals: d[1].goals, assists: d[1].assists }));

        xScale.domain(groupedData.map(d => d.key));
        yScale.domain([0, d3.max(groupedData, d => d.goals + d.assists)]);

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
            .attr("cy", d => yScale(d.goals))
            .attr("r", 5)
            .attr("fill", "black");

        points.transition()
            .attr("cx", d => xScale(d.key) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.goals))
            .attr("r", 5)
            .attr("fill", "black");

        const assistPoints = g.selectAll(".assist-point")
            .data(groupedData.filter(d => includeAssists && d.assists > 0), d => d.key);

        assistPoints.enter()
            .append("circle")
            .attr("class", "assist-point")
            .attr("cx", d => xScale(d.key) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.assists))
            .attr("r", 5)
            .attr("fill", "red");

        assistPoints.transition()
            .attr("cx", d => xScale(d.key) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.assists))
            .attr("r",5)
            .attr("fill", "red");

        points.exit().remove();
        assistPoints.exit().remove();

        if (displayMode === "lines") {
            drawLines(groupedData, includeGoals, includeAssists);
        } else if (displayMode === "bars") {
            drawBars(groupedData, includeGoals, includeAssists);
        }
    }

    function drawLines(data, includeGoals, includeAssists) {
        g.selectAll(".point").remove();
        g.selectAll(".assist-point").remove();
    
        g.selectAll(".line").remove();
        g.selectAll(".bar").remove();
    
        if (includeGoals) {
            const line = d3.line()
                .x(d => xScale(d.key) + xScale.bandwidth() / 2)
                .y(d => yScale(d.goals));
    
            g.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("d", line);
        }
    
        if (includeAssists) {
            const assistLine = d3.line()
                .x(d => xScale(d.key) + xScale.bandwidth() / 2)
                .y(d => yScale(d.assists));
    
            g.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("d", assistLine);
        }
    }
    
    function drawBars(data, includeGoals, includeAssists) {
        g.selectAll(".line").remove();
        g.selectAll(".bar").remove();
        g.selectAll(".point").remove();
        g.selectAll(".assist-point").remove();
    
        const halfWidth = xScale.bandwidth() / 2;
    
        if (includeGoals) {
            g.selectAll(".bar.goals")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar goals")
                .attr("x", d => xScale(d.key))
                .attr("y", d => yScale(d.goals))
                .attr("width", halfWidth)
                .attr("height", d => height - yScale(d.goals))
                .attr("fill", "black");
        }
    
        if (includeAssists) {
            g.selectAll(".bar.assists")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar assists")
                .attr("x", d => xScale(d.key) + halfWidth)
                .attr("y", d => yScale(d.assists))
                .attr("width", halfWidth)
                .attr("height", d => height - yScale(d.assists))
                .attr("fill", "red");
        }
    }    
    
    function clearChart() {
        g.selectAll(".point").remove();
        g.selectAll(".line").remove();
        g.selectAll(".bar").remove();
        g.selectAll(".assist-point").remove();
    }
    
    document.getElementById("display-mode-select").addEventListener("change", function() {
        const displayMode = this.value;
        const xAttribute = document.getElementById("x-axis-select").value;
        const includeGoals = document.getElementById("y-goals-checkbox").checked;
        const includeAssists = document.getElementById("y-assists-checkbox").checked;
    
        clearChart();
    
        if (displayMode === "points") {
            updateChart("points", xAttribute, includeGoals, includeAssists);
        } else if (displayMode === "lines") {
            updateChart("lines", xAttribute, includeGoals, includeAssists);
        } else if (displayMode === "bars") {
            updateChart("bars", xAttribute, includeGoals, includeAssists);
        }
    });

    document.getElementById("x-axis-select").addEventListener("change", function() {
        const displayMode = document.getElementById("display-mode-select").value;
        const xAttribute = this.value;
        const includeGoals = document.getElementById("y-goals-checkbox").checked;
        const includeAssists = document.getElementById("y-assists-checkbox").checked;
        updateChart(displayMode, xAttribute, includeGoals, includeAssists);
    });

    document.getElementById("y-goals-checkbox").addEventListener("change", function() {
        const displayMode = document.getElementById("display-mode-select").value;
        const xAttribute = document.getElementById("x-axis-select").value;
        const includeGoals = this.checked;
        const includeAssists = document.getElementById("y-assists-checkbox").checked;
        updateChart(displayMode, xAttribute, includeGoals, includeAssists);
    });

    document.getElementById("y-assists-checkbox").addEventListener("change", function() {
        const displayMode = document.getElementById("display-mode-select").value;
        const xAttribute = document.getElementById("x-axis-select").value;
        const includeGoals = document.getElementById("y-goals-checkbox").checked;
        const includeAssists = this.checked;
        updateChart(displayMode, xAttribute, includeGoals, includeAssists);
    });

    updateChart("points", "position", true, true);
});
