# 原型

函数有prototype的属性，可以指向任意对象：

```javascript
function XYZ() {}
var xyz = new XYZ();
console.log(Object.getPrototypeOf(xyz) === XYZ.prototype); // true
console.log(xyz.constructor === XYZ.prototype.constructor); // true
console.log(XYZ.prototype.constructor === XYZ); // true

XYZ.prototype = Object.prototype;
console.log(xyz.constructor); // [Function XYZ]
console.log(XYZ.prototype.constructor); // [Function Object]
```

## 原型链接

```javascript
function XYZ() {}

function Foo() {}
// 不可以链接，只是 XYZ.prototype 的另一个引用而已
//Foo.prototype = XYZ.prototype;

// 0. 可以链接，但可能会有副作用
//Foo.prototype = new XYZ() {}

// 1. ES5 写法
Foo.prototype = Object.create(XYZ.prototype);

// 2. ES6 写法
//Object.setPrototypeOf(Foo.prototype, XYZ.prototype);
XYZ.prototype.speak = function() {
  console.log('speak');
};

Foo.prototype.speakOut = function() {
  this.speak(); // 推荐使用内部委托，向外暴露API
};

var foo = new Foo();
foo.speakOut(); 	// speak
```

