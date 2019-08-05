/**
 * 广度优先遍历
 */

const person_is_seller = name => name[name.length - 1] === 'm';

graph = {};
graph['you'] = ['alice', 'bob', 'claire'];
graph['bob'] = ['anuj', 'peggy'];
graph['alice'] = ['peggy'];
graph['claire'] = ['thom', 'jonny'];
graph['anuj'] = [];
graph['peggy'] = [];
graph['thom'] = [];
graph['jonny'] = [];

const breadth_first_search = name => {
  let search_queue = graph[name];
  let searched = [];
  while (search_queue.length) {
    let person = search_queue.shift();
    if (!searched.includes(person)) {
      if (person_is_seller(person)) {
        console.log(person);
        return true;
      } else {
        searched.push(person);
        search_queue = search_queue.concat(graph[person]);
      }
    }
  }
  return false;
};

breadth_first_search('you');
