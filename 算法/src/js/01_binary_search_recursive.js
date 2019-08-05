/**
 * 二分查找--递归实现 前提：数组排序
 * @param {*} array
 * @param {*} item
 */
const binary_search = (array, item) => {
  let low = 0;
  let high = array.length - 1;
  if (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (array[mid] < item) {
      low = mid + 1;
    } else if (array[mid] > item) {
      high = mid - 1;
    } else {
      return mid;
    }
    binary_search(array.slice(low, high + 1), item);
  }
  return -1;
};

console.log(binary_search([1, 6, 8, 13, 26, 78], 4));
console.log(binary_search([1, 6, 8, 13, 26, 78], 8));
