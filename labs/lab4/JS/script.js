const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

let points = [];
for (let x = 0; x <= width; x += 1) {
    let y = 200 + 100 * Math.sin(x * Math.PI / 40);
    points.push({ x: x, y: y });
}

function createPathData(points) {
    let pathData = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        pathData += ` L${points[i].x},${points[i].y}`;
    }
    return pathData;
}

const pathData = createPathData(points);

svg.append("path")
    .attr("d", pathData)
    .attr("stroke", "blue")
    .attr("stroke-width", 3)
    .attr("fill", "none");

const circle = svg.append("circle")
    .attr("r", 10)
    .attr("fill", "black")
    .attr("mask", "url(#circleMask)")
    .style("display", "none");

function startAnimation() {
    const duration = +document.getElementById("duration").value;
    const path = svg.select("path");
    const totalLength = path.node().getTotalLength();

    svg.selectAll(".moving-point").remove();

    svg.selectAll(".moving-point")
        .data(points)
        .enter().append("circle")
        .attr("class", "moving-point")
        .attr("r", 5)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", "red");

    circle
        .style("display", null)
        .transition()
        .duration(duration)
        .attrTween("transform", translateAlong(path.node()))
        .on("end", () => {
        });
}

function translateAlong(path) {
    const totalLength = path.getTotalLength();
    return function() {
        return function(t) {
            const point = path.getPointAtLength((1 - t) * totalLength);
            return `translate(${point.x},${point.y})`;
        };
    };
}

function clearSvg() {
    circle.attr("transform", "")
        .style("display", "none");
}
