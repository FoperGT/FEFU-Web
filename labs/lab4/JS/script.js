const svg = d3.select("svg");

const pathData = `
    M10,80 
    Q50,10 90,80
    T170,80
    T250,80
    T330,80
    T410,80
    T490,80
    T570,80
    T650,80
    T730,80
    T810,80`;

svg.append("path")
    .attr("d", pathData)
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");

const circle = svg.append("circle")
    .attr("r", 10)
    .attr("fill", "red");

function startAnimation() {
    const duration = +document.getElementById("duration").value;
    const scaleEffect = +document.getElementById("scaleEffect").value;
    const rotationEffect = +document.getElementById("rotationEffect").value;

    const path = svg.select("path");
    const totalLength = path.node().getTotalLength();

    circle.transition()
        .duration(duration)
        .attrTween("transform", translateAlong(path.node(), totalLength))
        .on("end", () => applyEffects(scaleEffect, rotationEffect));
}

function translateAlong(path, totalLength) {
    return function(d, i, a) {
        return function(t) {
            const point = path.getPointAtLength((1 - t) * totalLength);
            return `translate(${point.x},${point.y})`;
        };
    };
}

function applyEffects(scale, rotate) {
    circle.transition()
        .duration(1000)
        .attr("transform", `scale(${scale}) rotate(${rotate})`);
}

function clearSvg() {
    circle.attr("transform", "");
}
