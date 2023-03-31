/**
 * tinyvue
 * @use html/tiny.vue
 */
class Dep {
  static target = null; // 判断是否监听
  constructor() {
    this._sub = [];
  }
  addSub(watcher) {
    if (watcher.update) {
      this._sub.push(watcher);
    }
  }
  notify() {
    this._sub.forEach((watcher) => {
      watcher.update();
    });
  }
}
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.cb = cb;
    this.key = key;
    Dep.target = this;
    this.oldValue = vm[key];
    Dep.target = null;
  }

  update() {
    const newValue = this.vm[this.key];
    if (newValue !== this.oldValue) {
      this.cb(newValue);
    }
  }
}
class Obverse {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }
  defineReactive(data, key, value) {
    this.walk(value);
    let self = this;
    const dep = new Dep();
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return value;
      },
      set(newValue) {
        if (newValue === value) {
          return;
        }
        value = newValue;
        self.walk(value);
        dep.notify();
      },
    });
  }
}

class Compiler {
  constructor(vm) {
    this.vm = vm;
    this.$el = vm.$el;
    this.compiler(this.$el);
  }
  compiler(node) {
    const childNode = [...node.childNodes];
    childNode.forEach((child) => {
      if (child.nodeType === 3) {
        this.compilerText(child);
      } else if (child.nodeType === 1) {
        this.compilerElemet(child);
      }
      if (child.childNodes.length) {
        this.compiler(child);
      }
    });
  }
  compilerText(node) {
    const text = node.textContent;
    const reg = /\{\{(.+?)\}\}/g;
    if (reg.test(text)) {
      let key = null;
      node.textContent = text.replace(reg, (_, $1) => {
        key = $1;
        return this.vm[$1];
      });
      new Watcher(this.vm, key, () => {
        node.textContent = text.replace(reg, (_, $1) => {
          key = $1;
          return this.vm[$1];
        });
      });
    }
  }

  compilerElemet(node) {
    [...node.attributes].forEach((attr) => {
      const key = attr.value;
      let attrName = null;
      if (this.isDirect(attr.name)) {
        attrName = attr.name.slice(2);
      }
      if (this.isNativeMethods(attr.name)) {
        attrName = attr.name.slice(1);
      }
      this.update(attrName, key, node);
    });
  }
  isNativeMethods(str) {
    return str.includes("@");
  }
  update(method, key, node) {
    const fn = `${method}Update`;
    if (this[fn]) {
      this[fn](node, key, this.vm[key]);
    }
  }
  modelUpdate(node, key, value) {
    node.value = value;

    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    });

    node.addEventListener("input", (newValue) => {
      this.vm[key] = newValue.target.value;
    });
  }
  textUpdate(node, key, value) {
    node.textContent = value;

    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    });
  }
  clickUpdate(node, key, value) {
    node.addEventListener("click", this.vm.methods[key]);
  }
  isDirect(str = "") {
    return str.includes("v-");
  }
}

class Vue {
  constructor(options) {
    this.$el = document.getElementById(options.el);

    this.$data = options.data;

    new Obverse(this.$data);

    this._proxy(this.$data);

    this.methods = {};
    
    Object.keys(options.methods).forEach((key) => {
      this.methods[key] = options.methods[key].bind(this);
    });

    new Compiler(this);
    setTimeout(() => {
      this.msg = 30;
    }, 1000);
  }

  _proxy(data = {}) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    });
  }
}

let vm = new Vue({
  el: "app",
  data: {
    msg: "123",
    age: 21,
  },
  methods: {
    setAge() {
      this.age = this.age + 1;
    },
  },
});
