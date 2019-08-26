const graph = {
  start: {
    a: 6,
    b: 2
  },
  a: {
    fin: 1
  },
  b: {
    a: 3,
    fin: 5
  },
  fin: {}
};

let costs = {
  a: 6,
  b: 2,
  fin: Infinity
};

let parents = {
  a: 'start',
  b: 'start',
  fin: null
};

const find_lowest_cost_node = () => {
  let lowest_cost = Infinity;
  let lowest_cost_node = null;
  for (let node in costs) {
    let cost = costs[node];
    if (cost < lowest_cost && !processed.includes(node)) {
      lowest_cost = cost;
      lowest_cost_node = node;
    }
  }
  console.log(lowest_cost_node);
  return lowest_cost_node;
};

const processed = [];
let node = find_lowest_cost_node();
while (node) {
  const cost = costs[node];
  const neighbors = graph[node];
  for (n in neighbors) {
    const new_cost = cost + neighbors[n];
    if (new_cost < costs[n]) {
      costs[n] = new_cost;
      parents[n] = node;
    }
  }
  processed.push(node);
  node = find_lowest_cost_node();
}

console.log(costs);
console.log(parents);
