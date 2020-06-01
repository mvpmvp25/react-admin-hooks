import React from 'react';
import { Man } from 'utils/plugin';

// 1
// @testable
// class MyTestableClass {
//   // ...
// }

// function testable(target) {
//   target.isTestable = true;
// }

// MyTestableClass.isTestable; // true

// 2
// function testable(target) {
//   target.prototype.isTestable = true;
// }

// @testable
// class MyTestableClass {}

// let obj = new MyTestableClass();
// console.log(obj);

// 3
// class Math {
//   @log
//   add(a, b) {
//     return a + b;
//   }
// }

// function log(target, name, descriptor) {
//   var oldValue = descriptor.value;

//   descriptor.value = function(...list) {
//     console.log(list);
//     console.log(`Calling ${name} with`, ...list);
//     return oldValue.call(this, ...list);
//   };

//   return descriptor;
// }

// const math = new Math();

// // passed parameters should get logged now
// let result = math.add(2, 4);

// console.log(result);

// 4
// function dec(id) {
//   console.log('evaluated', id);
//   return (target, property, descriptor) => console.log('executed', id);
// }

// class Example {
//   @dec(1)
//   @dec(2)
//   method() {}
// }
// evaluated 1
// evaluated 2
// executed 2
// executed 1

// 5
class SuperMan extends Man {
  render() {
    // console.log(this);
    return <div>装饰器demo111</div>;
  }
}

export default SuperMan;

// function UserInfo() {
//   return <div>装饰器demo</div>;
// }

// export default UserInfo;
