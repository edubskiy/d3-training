const svg = d3
  .select('.canvas')
    .append('svg')
      .attr('width', 600)
      .attr('height', 600)

// create margins and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph.append('g')
  .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

d3.json('menu.json').then(data => {
  
  // const min = d3.min(data, d => d.orders);
  const max = d3.max(data, d => d.orders);
  // const extent = d3.extent(data, d => d.orders);

  const y = d3.scaleLinear()
    .domain([0, max])
    .range([graphHeight, 0]);

  const x = d3.scaleBand()
    .domain(data.map(item => item.name))
    .range([0, graphHeight])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const rects = graph.selectAll('rect').data(data)
  
  rects
    .attr('width', x.bandwidth) 
    .attr('height', d => graphHeight - y(d.orders))
    .attr('fill', 'orange')
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.orders));

  rects.enter()
    .append('rect')
      .attr('width', x.bandwidth) 
      .attr('height', d => graphHeight - y(d.orders))
      .attr('fill', 'orange')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.orders));

  // create and call axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
});