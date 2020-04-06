const d3 = require('d3');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

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
  return {name: text, id: index};
}

function addReachableEntities(node, dataset, parentIndex, label) {
  if (dataset.entities.includes(node)) {
    dataset.edges.push({ source: parentIndex, target: dataset.entities.indexOf(node), label });
    return;
  }
  dataset.entities.push(node);
  const nodeIndex = dataset.entities.length - 1;
  if (parentIndex >= 0) {
    dataset.edges.push({ source: parentIndex, target: nodeIndex, label });
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
  const width = 1920, height = 1080;
  const document = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

  const simulation = d3.forceSimulation(dataset.entities)
    .force("link", d3.forceLink(dataset.edges).id((d, i) => i))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  const svg = d3.select(document.window.document).select('body')
    .append('div')
    .attr('class', 'container')
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

  const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(dataset.edges)
    .join("line")

  const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(dataset.entities)
    .join("circle")
    .attr("r", 5)
    .call((simulation) => {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    });

  node.append("title")
    .text(d => d.name);

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  });

  fs.writeFileSync('test.html', document.serialize()) //using sync to keep the code simple
  
  return;
}