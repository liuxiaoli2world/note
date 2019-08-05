/**
 * 选择排序 时间复杂度为O(n^2)
 */


const find_smallest_index = array => {
  let smallest = array[0];
  let smallest_index = 0;
  const length = array.length;

  for (let i = 0; i < length; i++) {
    if (array[i] < smallest) {
      smallest = array[i];
      smallest_index = i;
    }
  }
  return smallest_index;
};

const selection_sort = array => {
  let result_array = [];
  while (array.length > 0) {
    let smallest_index = find_smallest_index(array);
    let item = array.splice(smallest_index, 1)[0];
    result_array.push(item);
  }
  return result_array;
};

console.log(selection_sort([3, 7, 9, 12, 68, 34, 21]));
