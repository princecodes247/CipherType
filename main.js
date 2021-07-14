function Queue(concurrentCount = 1) {
  _this = this;
  this.running = [];
  this.complete = [];
  this.idle = true;
  this.threads = 1;
  this.todo = [];
  this.currentTask = {};
  this.add = (func, args) => {
    console.log("lo");
    _this.todo.push({ func, args });
    _this.start();
  };
  this.execute = async () => {
    _this.currentTask = _this.todo.shift();
    console.log(currentTask);
    await currentTask.func(...currentTask.args);
    return 0;
  };
  this.runNext = function () {
    return _this.running.length < _this.threads && _this.todo.length > 0;
  };
  this.run = async function () {
    _this.idle = false;
    while (_this.runNext()) {
      _this.currentTask = _this.todo.shift();
      console.log(_this.currentTask);
      _this.currentTask.func(..._this.currentTask.args).then(() => {
        _this.complete.push(_this.running.shift());
        _this.run();
      });
      _this.running.push(_this.currentTask);
    }
    _this.idle = true;
    // }
  };
  this.start = () => {
    if (_this.idle) {
      _this.run();
    }
  };
}

function CipherType(target, options = { startSpeed: 200 }) {
  var _this = this;
  this.letters = "∀∃ƂOo⅂AɌFWDU∋IßP⅁XꝚ";
  this.symbols = "Ɣ%A$D#Fɻ∀∃∂⅄@W⅂&ꝚǶs∇!U∋Iß℘P⅁X∆";
  this.result = "";
  this.startSpeed = options.startSpeed;
  this.speed = 100;
  this.target = () => document.querySelector(target);
  const cipherQueue = new Queue();
  // let todo = [];
  const actions = {};
  actions.errors = [];

  this.sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  this.symbolGenerator = (resc) => {
    return String(resc).charAt(Math.floor(Math.random() * resc.length));
  };

  this.removeLast = (str) => {
    return str.slice(0, -1);
  };

  this.oneByOne = async (text, count, speed, useSymbols = false) => {
    let resc = useSymbols ? this.symbols : this.letters;

    for (let a = 0; a < text.length; a++) {
      let final = text[a];
      let past = _this.target().innerHTML;
      for (let i = 0; i < count; i++) {
        await this.sleep(speed);
        _this.target().innerHTML = past + this.symbolGenerator(resc);
      }
      _this.target().innerHTML = past + final;
    }

    await this.sleep(speed * 5);
  };

  this.allAtOnce = async (text, target, count, speed, useSymbols = false) => {
    let resc = useSymbols ? this.symbols : this.letters;
    for (let j = 0; j < 2; j++) {
      let len = target.innerHTML.length;
      for (let a = 0; a < len; a++) {
        console.log(len);
        await this.sleep(speed * 1.2);
        let res = target.innerHTML;
        target.innerHTML = this.removeLast(res);
      }
      for (let i = 0; i < count; i++) {
        let result = "";
        for (let a = 0; a < text[j].length; a++) {
          result += this.symbolGenerator(resc);
        }
        target.innerHTML = result;
        await this.sleep(speed);
      }
      target.innerHTML = text[j];
      await this.sleep(speed * 3);
    }
  };

  CipherType.prototype._write = async (text) => {
    await _this.sleep(_this.startSpeed);
    await _this.oneByOne(text, 4, 80, true);
    return this;
  };

  CipherType.prototype._delete = async (len, speed = _this.speed) => {
    await _this.sleep(_this.startSpeed);
    console.log("90");
    //let len = target.innerHTML.length;
    for (let a = 0; a < len; a++) {
      let res = _this.target().innerHTML;
      await _this.sleep(speed * 1.2);
      _this.target().innerHTML = this.removeLast(res);
    }

    return this;
  };

  CipherType.prototype.type = (text) => {
    cipherQueue.add(CipherType.prototype._write, [text]);
    return this;
  };
  CipherType.prototype.backspace = (len, speed = _this.speed) => {
    cipherQueue.add(CipherType.prototype._delete, [len, speed]);
    return this;
  };
  CipherType.prototype.clear = (speed = _this.speed) => {
    let len = _this.target().innerHTML.length;
    cipherQueue.add(CipherType.prototype._delete, [len, speed]);
    return this;
  };
  return this;
}

let type = new CipherType("h1");
// let tasks = [type.type, type.delete]

type
  .type("Welcome to the future")
  .backspace(10, 200)
  .type("Crypto")
  .clear(50)
  .type("Ways to go")
  .clear( 50)
  .type("One step at a time")
//.then(res => res.delete(10, 50).then(res => res.type("CRYPTo")))
//CryptoType.oneByOne(text, target, 4, 80, true);

//oneByOne(text, target, count, speed, useSymbols);
//allAtOnce(text, target, 10, 600, symbols);
