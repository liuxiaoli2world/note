const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/liuxiaoli',
  { useMongoClient: true },
);

const studentSchema = new Schema({
  name: { type: 'String', required: true },
  age: { type: 'Number', required: true },
});

const Student = mongoose.model('Student', studentSchema);

const student = new Student({
  name: '嘟嘟',
  age: 4,
  gender: '0',
  hobbies: '吃饭 睡觉 托马斯',
});

student.save().then(() => {
  console.log('保存成功！');
}, () => {
  console.log('保存失败');
});

/**
 * 查询所有记录
 * @param callback 回调函数
 */
exports.findAll = function (callback) {
  student.find((err, students) => {
    if (err) {
      callback(err);
    } else {
      callback(null, students);
    }
  });
};
