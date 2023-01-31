// const margin = { top: 50, right: 50, bottom: 50, left: 50 },
//   width = 970 - margin.left - margin.right,
//   height = 700 - margin.top - margin.bottom;

// const chartG = d3
//   .select("#chart")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .style("width", width + margin.left + margin.right)
//   .style("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

const circles = d3.selectAll("circle");

circles.style("fill", "orange");

circles.on("mouseover", (e) =>
  d3.select(e.currentTarget).style("fill", "black")
);

circles.on("click", (e) => d3.select(e.currentTarget).style("fill", "red"));

setInterval(
  () =>
    circles
      .transition()
      .ease(d3.easeElastic)
      .duration(2000)
      .attr("r", () => 10 + Math.random() * 40)
      .attr("cx", () => Math.random() * 400)
      .attr("cy", () => Math.random() * 400),
  1000
);
