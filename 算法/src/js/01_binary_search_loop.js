/**
 * 二分查找--循环 前提：数组排序
 * @param {*} array
 * @param {*} item
 */
const binary_search = (array, item) => {
  let low = 0;
  let high = array.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (item === array[mid]) {
      return mid;
    } else if (item < array[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

console.log(binary_search([1, 6, 8, 13, 26, 78], 4));
console.log(binary_search([1, 6, 8, 13, 26, 78], 8));
