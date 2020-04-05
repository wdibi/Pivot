const util = require('util');
const d3n = require('d3-node');
const d3 = d3n.d3;

module.exports = root => {
  const dataset = { entities: [], edges: [] }
  addReachableEntities(root, dataset, -1);
  return dataset; 
};

function addReachableEntities(node, dataset, parentIndex) {
  if (node === null || typeof node !== 'object' || dataset.entities.includes(node)) {
    return;
  }
  dataset.entities.push(node);
  nodeIndex = dataset.entities.length - 1;

  if (parentIndex >= 0) { dataset.edges.push({ source: parentIndex, target: nodeIndex }) }

  Object.values(node).forEach(value => {
    if (Array.isArray(value)) {
      value.forEach(n => addReachableEntities(n, dataset, nodeIndex));
    } else {
      addReachableEntities(value, dataset, nodeIndex);
    }
  });
}
