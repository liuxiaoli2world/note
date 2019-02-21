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
  }
};

const m = { id: 5 };

// jack.saywithThis(); //undefined
// jack.saywithThat(); //2
// jack.sayWithArrow(); //2
// jack.sayWithGlobalArrow(); //1

jack.saywithThis.call(m); //undefined
jack.saywithThat.call(m); //5
jack.sayWithArrow.call(m); //5
jack.sayWithGlobalArrow.call(m); //1
