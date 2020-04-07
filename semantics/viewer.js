const d3 = require('d3');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const width = 1920, height = 1080;

module.exports = root => {
  const dataset = { entities: [], edges: [] };
  addReachableEntities(root, dataset, -1);
  dataset.entities = dataset.entities.map((e, i) => nodeText(e, i));
  visualizeAST(dataset);
  return 'success'
};

function nodeText(node, index) {
  let text = node.constructor.name;
  Object.entries(node).forEach(([prop, value]) => {
    if (['boolean', 'number', 'string'].includes(typeof value)) {
      text += ` ${prop}=${value}`;
    }
  });
  return {name: text, id: index, x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
}

function addReachableEntities(node, dataset, parentIndex, label) {
  if (dataset.entities.includes(node)) {
    dataset.edges.push({ source: parentIndex, target: dataset.entities.indexOf(node), label });
    return;
  }
  dataset.entities.push(node);
  const nodeIndex = dataset.entities.length - 1;
  if (parentIndex >= 0) {
    dataset.edges.push({ source: parentIndex, target: nodeIndex, label: label });
  }
  Object.entries(node).forEach(([prop, value]) => {
    if (Array.isArray(value)) {
      value.forEach((n, i) => addReachableEntities(n, dataset, nodeIndex, `${prop}[${i}]`));
    } else if (typeof value === 'object' && value !== null) {
      addReachableEntities(value, dataset, nodeIndex, prop);
    }
  });
}

function visualizeAST(dataset) {
  const document = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

  const svg = d3.select(document.window.document).select('body')
    .append('div')
    .attr('class', 'container')
    .append('svg')
    .attr('viewBox', [0, 0, width, height]);

  const edge = svg.append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(dataset.edges)
    .enter().append("line")
    .attr('x1', d => dataset.entities[d.source].x)
    .attr('y1', d => dataset.entities[d.source].y)
    .attr('x2', d => dataset.entities[d.target].x)
    .attr('y2', d => dataset.entities[d.target].y);

  const entities = svg.append("g")
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(dataset.entities)
    .join('circle')
    .attr('r', 10)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  const entityLabels = svg.append('g')
    .selectAll('.entityLabel')
    .data(dataset.entities)
    .enter()
    .append('text')
    .attr('x', d => d.x + 10)
    .attr('y', d => d.y)
    .attr('class', 'entityLabel')
    .text(d => d.name)
    .attr("font-family", "monospace").attr("font-size", "14px").attr("fill", "black");

  fs.writeFileSync('test.html', document.serialize()) //using sync to keep the code simple
  
  return;
}