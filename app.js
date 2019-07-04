// some variables
const MY_JSON = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const display = document.getElementById('container');

// get the json data
let request = new XMLHttpRequest();
request.open("GET", MY_JSON, true);
request.send();
request.onload = function () {
  // JSON.parse turns string into JSON
  main(JSON.parse(request.responseText).data); 
};

// this is the main function
function main(dataset) {

  const w = 1000;
  const h = 500;
  const padding = 50;
  
  // the scaling
  const xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([padding, w - padding]);
  
  const yScale = d3.scaleLinear()
    .domain([0, 18000])
    .range([450, 50]);
    //.domain([0, d3.max(dataset, d => d[1])])
    //.range([h - padding, padding]);
  
  // the graph as a whole
  const svg = d3.select("#container")
    .append('svg')
    .attr('width', w)
    .attr('height', h);
  
  // the bars
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect') 
    .attr('x', (d, i) => xScale ( i ))
    .attr('y', d => yScale(d[1])) // placement
    .attr('width', 3)
    .attr('height', d => h - yScale(d[1]) - padding) // size
    .attr("fill", "brown")
    .attr('class', 'bar')
    .append('title')
    .text(d => d[1]);
  
  // the axes  
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  
  svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);  
    svg.append("g")
       .attr("transform", "translate(" + padding + ',' + 0 + ")")
       .call(yAxis);
}
