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

const data = [40, 10, 20, 60, 30];

const circles = chartG.selectAll("circle");

const update = () =>
  circles
    .data(data, (_d, i) => i)
    .join("circle")
    // .enter()
    // .append("circle")
    .attr("r", (d) => d)
    .attr("cx", (_d, i) => i * 80)
    .attr("cy", (_d, i) => i * 20)
    .style("fill", "red")
    .on("mouseover", (e) => {
      console.log("mouse");
      d3.select(e.currentTarget).style("fill", "black");
    });

const newData = () => {
  data.push(Math.random() * 50);
  update();
};
update();
// console.log("stuff");

// circles.style("fill", "red");

// circles.on("mouseover", (e) => {
//   console.log("mouse");
//   d3.select(e.currentTarget).style("fill", "black");
// });
setInterval(newData, 1000);
