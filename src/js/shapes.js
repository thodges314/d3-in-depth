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

// lines //////
// with points (basic)
const lineGenerator = d3.line();
const points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 50],
];
const pathData = lineGenerator(points);

chartG
  .append("path")
  .attr("d", pathData)
  .style("fill", "none")
  .style("stroke", "#999");

// with .x and .y
const xScale = d3.scaleLinear().domain([0, 6]).range([0, 600]);
const yScale = d3.scaleLinear().domain([0, 80]).range([150, 0]);

var lineGenerator2 = d3
  .line()
  .x((_d, i) => xScale(i))
  .y((d) => yScale(d.value));

const data = [
  { value: 10 },
  { value: 50 },
  { value: 30 },
  { value: 40 },
  { value: 20 },
  { value: 70 },
  { value: 50 },
];

const line2 = lineGenerator2(data);

chartG
  .append("path")
  .attr("d", line2)
  .style("fill", "none")
  .style("stroke", "blue");

// with a gap and .defined()
const lineGenerator3 = d3.line().defined((d) => d !== null);

const points2 = [[0, 80], [100, 100], null, [300, 50], [400, 40], [500, 80]];

const pathData3 = lineGenerator3(points2);

chartG
  .append("path")
  .attr("d", pathData3)
  .style("fill", "none")
  .style("stroke", "red");

// with a curve
const lineGenerator4 = d3.line().curve(d3.curveCardinal);
const pathData4 = lineGenerator4(points);

chartG
  .append("path")
  .attr("d", pathData4)
  .style("fill", "none")
  .style("stroke", "green");

// radial line
const lineGenerator5 = d3.radialLine();
points3 = [
  [0, 80],
  [Math.PI * 0.25, 80],
  [Math.PI * 0.5, 30],
  [Math.PI * 0.75, 80],
  [Math.PI, 80],
  [Math.PI * 1.25, 80],
  [Math.PI * 1.5, 80],
  [Math.PI * 1.75, 80],
  [Math.PI * 2, 80],
];

const pathData5 = lineGenerator5(points3);

chartG
  .append("path")
  .attr("d", pathData5)
  .style("fill", "none")
  .style("stroke", "pink")
  .attr("transform", "translate(100,100)");

//area
const areaGenerator = d3.area();
const pathData6 = areaGenerator(points);

chartG
  .append("path")
  .attr("d", pathData6)
  .style("fill", "grey")
  .attr("opacity", 0.2);

// area between
var yScale2 = d3.scaleLinear().domain([0, 100]).range([200, 0]);

const points4 = [
  { x: 0, low: 30, high: 80 },
  { x: 100, low: 80, high: 100 },
  { x: 200, low: 20, high: 30 },
  { x: 300, low: 20, high: 50 },
  { x: 400, low: 10, high: 40 },
  { x: 500, low: 50, high: 80 },
];

const areaGenerator2 = d3
  .area()
  .x((d) => d.x)
  .y0((d) => yScale(d.low))
  .y1((d) => yScale(d.high));

const pathData7 = areaGenerator2(points4);

chartG
  .append("path")
  .attr("d", pathData7)
  .style("fill", "yellow")
  .attr("opacity", 0.2);
