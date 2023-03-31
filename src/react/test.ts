const a = "1";
console.log(a);
const logFn = (target: any, name: any, descriptor: any) => {
  const original = descriptor.value;
  descriptor.value = function (...args: any) {
    console.log(`[${name}] input: ${args}`);
    const result = original.apply(this, args);
    console.log(`[${name}] output: ${result}`);
    return result;
  };
  return descriptor;
};

const valueDes = (target: any, key: string) => {
  console.log(target, key);
};

const classDes = (target: any) => {
  console.log(target);
  target.prototype.sayName = "my name";
};

const paramsDes = (target: any, methodName: any, index: any): any => {
  console.log(target, methodName, index, "----");
};

const get = (filed: string) => {
  return function (target: any, name: any, descriptor: any) {
    const original = descriptor.value;
    descriptor.value = function (...arg: any) {
      console.log(filed);
      const value = original.apply(this, arg);
      return value + filed;
    };
  };
};

@classDes
class Test {
  constructor() {}
  @logFn
  add(x: any, y: any) {
    return x + y;
  }

  @valueDes
  name = "hello";

  getParams(key: string, @paramsDes id: number) {
    console.log(key);
    return id;
  }

  @logFn
  @get("/")
  getThis(code: string) {
    return code;
  }
}

const test = new Test();
console.log(test.add(10, 20), test.name, test.getParams("111", 10), test.getThis('tomorrow'));

function giveSay(name: string) {
  return function (target: any) {
    target.say = function () {
      console.log("hello! My name is " + name);
    };
    target.run = () => {
      console.log(name + "running");
    };
  };
}

@giveSay("Yuanbao")
class Animal1 {
  static say: any;
  static run: Function;
  constructor() {}
  name = "";
}

Animal1.say(); // hello! My name is Yuanbao
Animal1.run();
@giveSay("Facai")
class Animal2 {
  static say: Function;
  constructor() {}
}

Animal2.say(); // hello! My name is Facai
