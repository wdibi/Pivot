const util = require('util');
const d3n = require('d3-node');
const d3 = d3n.d3;

module.exports = root => {
  const dataset = { entities: [], edges: [] }
  addReachableEntities(root, dataset, -1);
  return dataset; 
};


function addReachableEntities(node, dataset, parentIndex, label) {
  if (node === null || typeof node !== 'object' || dataset.entities.includes(node)) {
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
    } else {
      addReachableEntities(value, dataset, nodeIndex, prop);
    }
  });
}
