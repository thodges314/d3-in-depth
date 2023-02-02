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

const data = [
  {
    Title: "Adaptation",
    Distributor: "Sony Pictures",
    Genre: "Comedy",
    Worldwide_Gross: 22498520,
    Rating: 91,
  },
  {
    Title: "Air Bud",
    Distributor: "Walt Disney Pictures",
    Genre: "Comedy",
    Worldwide_Gross: 27555061,
    Rating: 45,
  },
  {
    Title: "Air Force One",
    Distributor: "Sony Pictures",
    Genre: "Action",
    Worldwide_Gross: 315268353,
    Rating: 78,
  },
  {
    Title: "Alex & Emma",
    Distributor: "Warner Bros.",
    Genre: "Drama",
    Worldwide_Gross: 15358583,
    Rating: 11,
  },
  {
    Title: "Alexander",
    Distributor: "Warner Bros.",
    Genre: "Adventure",
    Worldwide_Gross: 167297191,
    Rating: 16,
  },
  {
    Title: "Ali",
    Distributor: "Sony Pictures",
    Genre: "Drama",
    Worldwide_Gross: 84383966,
    Rating: 67,
  },
  {
    Title: "Alice in Wonderland",
    Distributor: "Walt Disney Pictures",
    Genre: "Adventure",
    Worldwide_Gross: 1023291110,
    Rating: 51,
  },
  {
    Title: "Alive",
    Distributor: "Walt Disney Pictures",
    Genre: "Adventure",
    Worldwide_Gross: 36299670,
    Rating: 71,
  },
  {
    Title: "All the King's Men",
    Distributor: "Sony Pictures",
    Genre: "Drama",
    Worldwide_Gross: 9521458,
    Rating: 11,
  },
  {
    Title: "Amadeus",
    Distributor: "Warner Bros.",
    Genre: "Drama",
    Worldwide_Gross: 51973029,
    Rating: 96,
  },
];

// d3.sum computes the sum of an array, where the second optional arg is an accessor function

const sumWorldwideGross = (group) => d3.sum(group, (d) => d.Worldwide_Gross);

// we want a categorical hierarchy with distributer, then genre, and the result is worldwide gross for that subcategory.

const groups = d3.rollup(
  data,
  sumWorldwideGross,
  (d) => d.Distributor,
  (d) => d.Genre
);

// console.log(groups);
// console.log(groups.get("Sony Pictures"));
// console.log(groups.get("Sony Pictures").get("Drama"));

// hierarchecal structure:
// Each item (or node) in the hierarchy has properties: data, children, depth, height and parent.
// data has name and value - for leaf nodes, value is aggregated value
// children is an array of child nodes
// depth is the depth of the node in the hierarchy - root has depth 0
// height is the height of the node in the hierarchy - leafs have height 0
// parent refrences node's parent node

const root = d3.hierarchy(groups);

console.log(root.copy());

//// .count() returns number of leaves below node - mutates
console.log(root.copy().count());

//// .sum() takes a function that computes values from nodes - can be what you want, and returns value
console.log(data.reduce((acc, cv) => acc + cv.Worldwide_Gross, 0));
// vv this one, for each node, looks at the second entry of the data function, recursively.
console.log(root.copy().sum((d) => d[1]));

//// .sort() sorts at every level according to a comparator function
// sum of descending value by gross
console.log(
  root
    .copy()
    .sum((d) => d[1])
    .sort((a, b) => b.value - a.value)
);
// this one gives leaf counts and then puts then in reverse order (small to large)
console.log(
  root
    .copy()
    .count()
    .sort((a, b) => a.value - b.value)
);

//// .each() traverses each node and performs the same function on them
const names = [];
root
  .copy()
  .each((d) => names.push(`${"  ".repeat(d.depth)}${d.depth}: ${d.data[0]}`));
console.log(names.join("\n"));

// .eachBefore() calls on child nodes first and then comes up
const names2 = [];
root
  .copy()
  .sum((d) => d[1])
  .sort((a, b) => b.value - a.value)
  .eachBefore((d) =>
    names2.push(`${"  ".repeat(d.depth)}${d.depth}: ${d.data[0]} - ${d.value}`)
  );
console.log(names2.join("\n"));

// NOW TO DRAW IT ///////////////////////////////////////////////
const treeLayoutRoot = root.copy();
const treeLayout = d3.tree();
treeLayout.size([400, 200]);
treeLayout(treeLayoutRoot);

// console.log(treeLayoutRoot);

// const treeLayoutRoot = root.copy();

chartG
  .append("g")
  .attr("class", "nodes")
  .selectAll("g.nodes")
  .data(treeLayoutRoot.descendants())
  .join("circle")
  .classed("node", true)
  .attr("cx", (d) => d.x)
  .attr("cy", (d) => d.y)
  .attr("r", 4)
  .on("mouseover", (d) => console.log(d.data));

chartG
  .append("g")
  .attr("class", "links")
  .selectAll("line.link")
  .data(treeLayoutRoot.links())
  .join("line")
  .classed("link", true)
  .attr("x1", (d) => d.source.x)
  .attr("y1", (d) => d.source.y)
  .attr("x2", (d) => d.target.x)
  .attr("y2", (d) => d.target.y);
