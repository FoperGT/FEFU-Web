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
    const scaleEnabled = document.getElementById("scaleToggle").checked;
    const scaleValue = +document.getElementById("scaleEffect").value;
    const rotationEnabled = document.getElementById("rotationToggle").checked;
    const path = svg.select("path");
    const totalLength = path.node().getTotalLength();

    circle
        .style("display", null) 
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attrTween("transform", translateAndScale(path.node(), scaleEnabled, scaleValue, rotationEnabled, duration))
        .on("end", () => {
        });
}

function translateAndScale(path, scaleEnabled, scaleValue, rotationEnabled, duration) {
    const totalLength = path.getTotalLength();
    return function() {
        return function(t) {
            const point = path.getPointAtLength((1 - t) * totalLength);
            let scale = 1;
            if (scaleEnabled) {
                scale = scaleValue + 0.5 * Math.sin(t * Math.PI * 2); 
            }
            const rotation = rotationEnabled ? 360 * (t * duration / 1000) : 0;
            return `translate(${point.x},${point.y}) scale(${scale}) rotate(${rotation})`;
        };
    };
}

function clearSvg() {
    circle.attr("transform", "")
        .style("display", "none");
}
