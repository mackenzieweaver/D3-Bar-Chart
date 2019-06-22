// some variables
const MY_JSON = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// get the json data
let request = new XMLHttpRequest();
request.open("GET", MY_JSON, true);
request.send();

// when the data loads
request.onload = function () {
  // go into the main function with that data
  main(JSON.parse(request.responseText).data);
};

// this is the main function
function main(dataset) {

  d3.select("#container")
    .data(dataset)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('height', d => d[1] / 50 + 'px');

}