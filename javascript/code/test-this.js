this.id = 1;
const jack = {
  id: 2,
  saywithThis() {
    setTimeout(function() {
      console.log(`this:${this.id}`);
    });
  },
  saywithThat() {
    const that = this;
    setTimeout(function() {
      console.log(`that:${that.id}`);
    }, 500);
  },
  sayWithArrow() {
    setTimeout(() => {
      console.log(`arrow:${this.id}`);
    }, 1000);
  },
  sayWithGlobalArrow: () => {
    setTimeout(() => {
      console.log(`global arrow ${this.id}`);
    }, 2000);
  },
  test1: function() {
    return function() {
      console.log(this.id);
    };
  },
  test2: function() {
    return () => {
      console.log(this.id);
    };
  }
};

// jack.saywithThis(); //undefined
// jack.saywithThat(); //2
// jack.sayWithArrow(); //2
// jack.sayWithGlobalArrow(); //1

// jack.saywithThis.call(m); //undefined
// jack.saywithThat.call(m); //5
// jack.sayWithArrow.call(m); //5
// jack.sayWithGlobalArrow.call(m); //1

let m = { id: 5 };
let n = { id: 6 };

let f1 = jack.test1.call(m);
f1.call(n); // 是 6 不是 5
jack.test1()(); // undefined
let f2 = jack.test1();
f2(); // undefined

let f3 = jack.test2.call(m);
f3.call(n); // 是 5 不是 6
jack.test2()(); // 2
let f4 = jack.test2();
f4(); // 2

// function foo() {
//   // 返回一个箭头函数
//   return a => {
//     // 这里的 `this` 是词法上从 `foo()` 采用的
//     console.log(this.a);
//   };
// }

// let obj1 = {
//   a: 2
// };

// let obj2 = {
//   a: 3
// };

// let bar = foo.call(obj1);
// bar.call(obj2); // 2, 不是3!
