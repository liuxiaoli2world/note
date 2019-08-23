/**
 * 快速排序 时间复杂度为O(n*logn)
 * @param {*} array 
 */
const quick_sort = array => {
  if (array.length < 2) {
    return array;
  } else {
    // 随意选取一个值为基准值
    let pivot = array[0];
    let less = array.slice(1).filter(item => item <= pivot);
    let greater = array.slice(1).filter(item => item > pivot);
    return [...quick_sort(less), pivot, ...quick_sort(greater)];
  }
};

console.log(quick_sort([3, 7, 9, 12, 68, 34, 21]));
