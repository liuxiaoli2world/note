

# this

**this 不是函数自身的引用，也不是函数词法作用域的引用**

**this 是函数被调用时建立的绑定，它指向什么完全由函数被调用的调用点来决定的**

## this 绑定四种规则

1. 默认绑定

   - 严格模式下为undefined

   - 非严格模式下为全局对象

2. 隐含绑定

   如：`obj.foo()`

3. 明确绑定（硬绑定是明确绑定中的一种）

   如：`foo.call(obj1, 1, 2)` 或  `foo.apply(obj1, [1,2])`  或 `foo.bind(obj1, 1, 2)`

4. new 绑定

   > 四种规则的优先级按以上顺序递增，但 new 和 明确绑定不能同时使用，new和隐含绑定、隐含绑定和明确绑定可以同时使用。

## 绑定的特例

1. 被忽略的 this

   明确绑定丢失 this 退回到默认绑定`foo.call(null, 1, 2)` ，这种写法不安全，安全的写法是 `foo.call(Object.create(null), 1, 2)`，前提是不关心 this 指向。

2. 间接

   ```javascript
   function foo() {
     console.log(this.a);
   }
   
   var a = 1;
   var obj1 = { a: 2, foo: foo};
   var obj2 = { a: 3};
   var f = obj.foo;
   obj1.foo(); // 2
   f(); // 1
   (obj2.foo = obj1.foo)(); // 1
   ```

   

## 词法  this

箭头函数不受上述四种情况的约束

```javascript
foo() {
  return () => {
    console.log(this.a);
  }
}

var obj1 = { a: 1};
var obj2 = { b: 2};

var f = foo.call(obj1);
f.call(obj2); // 是 1 不是 2
```

> 一个箭头函数的词法绑定是不能被覆盖的（即使new也不行）；与四种绑定规则不同，ES6 的箭头函数使用词法作用于来决定this绑定，这意味着它们采用封闭它们的函数调用来作为this绑定（无论它是什么）。