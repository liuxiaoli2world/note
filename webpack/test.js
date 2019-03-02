function XYZ() {}

function Foo() {}

// ES5 写法
// Foo.prototype = Object.create(XYZ.prototype);

// ES6 写法
Object.setPrototypeOf(Foo.prototype, XYZ.prototype);
XYZ.prototype.speak = function() {
  console.log('speak');
};

Foo.prototype.speakOut = function() {
  this.speak();
};

var foo = new Foo();
foo.speakOut(); 