const D3Node = require('d3-node')
const fs = require('fs');

module.exports = root => {
  const dataset = { entities: [], edges: [] };
  addReachableEntities(root, dataset, -1);
  dataset.entities = dataset.entities.map(e => nodeText(e));
  visualizeAST(dataset);
  return 'success'
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

function visualizeAST(dataset) {
  const d3n = new D3Node()
  const height = 1080, width = 1920;
  const svg = d3n.createSVG(width, height)

  const edges = svg.selectAll('line')
    .data(dataset.edges)
    .enter()
    .append('line')
    .attr('id',function(d,i) {return 'edge'+i})
    .attr('marker-end','url(#arrowhead)')
    .style('stroke','#ccc')
    .style('pointer-events', 'none');
    
  const entities = svg.selectAll('circle')
    .data(dataset.entities)
    .enter()
    .append('circle')
    .attr({'r':15})
    // .style('fill',function(d,i){return colors(i);})
    // .call(force.drag)

  const entitylabels = svg.selectAll('.entitylabel') 
    .data(dataset.entities)
    .enter()
    .append('text')
    .text( (d) => { return d.name; } )
    .attr({'x': (d) => { return d.x; },
          'y': (d) => { return d.y; },
          'class':'entitylabel',
          'stroke':'black'});

  const edgepaths = svg.selectAll('.edgepath')
    .data(dataset.edges)
    .enter()
    .append('path')
    .style('pointer-events', 'none')
    .attr({'d': (d) => { return 'M '+d.source.x + ' '+ d.source.y+' L '+ d.target.x +' '+ d.target.y },
          'class':'edgepath',
          'fill-opacity':0,
          'stroke-opacity':0,
          'fill':'blue',
          'stroke':'red',
          'id': (d,i) => {return 'edgepath'+i}});

  const edgelabels = svg.selectAll('.edgelabel')
    .data(dataset.edges)
    .enter()
    .append('text')
    .style('pointer-events', 'none')
    .attr({'class':'edgelabel',
          'id':(d,i) => { return 'edgelabel' + i },
          'dx':80,
          'dy':0,
          'font-size':10,
          'fill':'#aaa'});

  // edgelabels.append('textPath')
  //   .attr('xlink:href',(d,i) => { return '#edgepath' + i })
  //   .style('pointer-events', 'none')
  //   .text((d,i) => { return 'label ' + i });

  // svg.append('defs').append('marker')
  //   .attr({'id':'arrowhead',
  //              'viewBox':'-0 -5 10 10',
  //              'refX':25,
  //              'refY':0,
  //              'orient':'auto',
  //              'markerWidth':10,
  //              'markerHeight':10,
  //              'xoverflow':'visible'})
  //   .append('svg:path')
  //   .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
  //   .attr('fill', '#ccc')
  //   .attr('stroke','#ccc');

  fs.writeFile('./test.html', d3n.html(), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  }); 
}
