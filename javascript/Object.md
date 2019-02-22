# 对象

## 创建方式

1. 声明（字面）形式，`let obj = { a: 1, b: 'abc' }`

2. 构造形式，`let obj = new Object()`

   ```javascript
   let obj = new Object();
   obj.a = 1;
   obj.b = 'abc';
   ```

> 强烈推荐使用字面形式，

## 内建对象

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error
- Map & WeakMap
- Set & WeakMap

## 属性描述符

`Object.getOwnPropertyDescriptor(obj, a)`

