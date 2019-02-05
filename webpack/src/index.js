/*
 * @Author: liuxiaoli
 * @Date: 2019-01-30 09:17:40
 * @LastEditors: liuxiaoli
 * @LastEditTime: 2019-02-05 20:36:16
 * @Description: webpack配置测试文件
 */
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';
import '@css/index';
// 配置alias对.scss文件无效
import '@css/index1.scss';

function createDomEle() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['刘晓黎', '您好', '！'], '');
  return dom;
}

document.body.append(createDomEle());

// json-server 模拟数据服务
axios.get('/api/comments/1').then(() => {
  // console.log(response.data);
  $.map([1, 2, 3, 4, 5], (value, index) => {
    return value * index;
  });
});
