const margin = { top: 50, right: 50, bottom: 50, left: 50 },
  width = 970 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

const chartG = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .style("width", width + margin.left + margin.right)
  .style("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const dataa = [40, 10, 20, 60, 30, 50, 35];

// const circles = chartG.selectAll("circle");

const update = (data) =>
  chartG
    .selectAll("circle")
    .data(data, (d) => d)
    .join(
      (enter) =>
        enter
          .append("circle")
          .style("fill", "red")
          .on("mouseover", (e) =>
            d3.select(e.currentTarget).style("fill", "black")
          )
          .attr("cx", () => 800)
          .attr("cy", () => 200)
          .transition()
          .duration(800)
          .ease(d3.easeBounce)
          .attr("cx", (_d, i) => i * 80)
          .attr("cy", (_d, i) => i * 20)
          .attr("r", (d) => d),
      (update) =>
        update
          .transition()
          .attr("cx", (_d, i) => i * 80)
          .attr("cy", (_d, i) => i * 20),
      (exit) =>
        exit
          .transition()
          .ease(d3.easeCubicOut)
          .duration(800)
          .attr("r", () => 0)
          .style("opacity", 0)
          .remove()
    )
    .attr("r", (d) => d);

const newData = () => {
  dataa.shift();
  dataa.push(Math.random() * 50);
  update(dataa);
};
update(dataa);

setInterval(newData, 1000);
