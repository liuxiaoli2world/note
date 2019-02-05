/*
 * @Author: liuxiaoli
 * @Date: 2019-01-31 16:27:55
 * @LastEditors: liuxiaoli
 * @LastEditTime: 2019-01-31 20:33:59
 * @Description: 用faker模拟生成数据，导出/写入到文件中
 */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const faker = require('faker');

let data = {};

let posts = [];
for (let i = 0; i < 10; i++) {
  let post = {};
  post.id = faker.random.uuid();
  post.title = faker.name.title();
  post.author = faker.name.firstName();
  posts.push(post);
}
data.posts = [...posts];
promisify(fs.writeFile)(
  path.resolve(__dirname, './mock-data.json'),
  JSON.stringify(data, null, '  '),
  () => {
    console.log('写入成功');
  }
);
module.exports = data;
