const util = require('util');
const d3n = require('d3-node');
const d3 = d3n.d3;

module.exports = root => {
  const dataset = { entities: [], edges: [] };
  addReachableEntities(root, dataset, -1);
  dataset.entities = dataset.entities.map(e => nodeText(e));
  return dataset;
};

function nodeText(node) {
  let text = node.constructor.name;
  Object.entries(node).forEach(([prop, value]) => {
    if (['boolean', 'number', 'string'].includes(typeof value)) {
      text += ` ${prop}=${value}`;
    }
  });
  return text;
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
