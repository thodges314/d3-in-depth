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

////
const data = {
  name: "A1",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          value: 100,
        },
        {
          name: "C2",
          value: 300,
        },
        {
          name: "C3",
          value: 200,
        },
      ],
    },
    {
      name: "B2",
      value: 200,
    },
  ],
};

const treemapLayout = d3.treemap().size([400, 200]).paddingOuter(16);

const rootNode = d3.hierarchy(data);

console.log(rootNode);

rootNode.sum((d) => d.value);

treemapLayout(rootNode);

chartG.append("g");

console.log(rootNode);

var nodes = d3
  .select("svg g")
  .selectAll("g")
  .data(rootNode.descendants())
  .join("g")
  .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

nodes
  .append("rect")
  .attr("width", (d) => d.x1 - d.x0)
  .attr("height", (d) => d.y1 - d.y0);

nodes
  .append("text")
  .attr("dx", 4)
  .attr("dy", 14)
  .text((d) => d.data.name);
