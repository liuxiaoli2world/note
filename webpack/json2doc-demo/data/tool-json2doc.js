/*
 * @Author: liuxiaoli
 * @Date: 2019-01-31 14:10:10
 * @LastEditors: liuxiaoli
 * @LastEditTime: 2019-01-31 16:50:38
 * @Description: 将"db.json"数据根据模板"tpl.hbs"生成文档"doc.md"
 */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { each, map } = require('lodash');
const handlebars = require('handlebars');
const db = require('./db.json');
const db = require('./faker-data');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
  let template = await readFile(path.resolve(__dirname, './tpl.hbs'), 'utf-8');
  template = handlebars.compile(template);

  const formatted = map(db, (value, key) => {
    return {
      desc: '说明',
      url: key,
      method: 'GET',
      response: JSON.stringify(value, null, '  ')
    };
  });

  await writeFile(
    path.resolve(__dirname, './doc.md'),
    template({
      apis: formatted
    })
  );
})();
