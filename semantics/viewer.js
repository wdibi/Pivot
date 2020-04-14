const fs = require('fs');
const open = require('open');
const PORT = 5000;

module.exports = root => {
  const dataset = { entities: [], edges: [] };
  addReachableEntities(root, dataset, -1);
  dataset.entities = dataset.entities.map((e, i) => nodeText(e, i));
  writeData(dataset);

  const app = require('./graph/server');
  app.listen(PORT, async function() {
    console.log(`Server started on port ${PORT}`);
    (async () => {
      await open('http://localhost:5000/');
    })();
  });

  return 'success';
};

function nodeText(node, index) {
  let text = node.constructor.name;
  Object.entries(node).forEach(([prop, value]) => {
    if (['boolean', 'number', 'string'].includes(typeof value)) {
      text += ` ${prop}=${value}`;
    }
  });
  return {
    name: text,
    id: index,
  };
}

function addReachableEntities(node, dataset, parentIndex, label) {
  if (dataset.entities.includes(node)) {
    dataset.edges.push({
      source: parentIndex,
      target: dataset.entities.indexOf(node),
      label: label,
    });
    return;
  }
  dataset.entities.push(node);
  const nodeIndex = dataset.entities.length - 1;
  if (parentIndex >= 0) {
    dataset.edges.push({
      source: parentIndex,
      target: nodeIndex,
      label: label,
    });
  }
  Object.entries(node).forEach(([prop, value]) => {
    if (Array.isArray(value)) {
      value.forEach((n, i) =>
        addReachableEntities(n, dataset, nodeIndex, `${prop}[${i}]`)
      );
    } else if (typeof value === 'object' && value !== null) {
      addReachableEntities(value, dataset, nodeIndex, prop);
    }
  });
}

function writeData(data) {
  fs.writeFileSync('./semantics/graph/data.json', JSON.stringify(data));
}
