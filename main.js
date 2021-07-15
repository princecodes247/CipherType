function Queue(concurrentCount = 1) {
  _this = this;
  this.running = [];
  this.complete = [];
  this.idle = true;
  this.threads = 1;
  this.todo = [];
  this.currentTask = {};
  this.stop = false;
  this.add = (func, args) => {
    _this.todo.push({ func, args });
    _this.start();
  };
  this.rerun = () => {
    _this.stop = true;
    _this.todo = [{func: CipherType.prototype._clear, args: ""}, ..._this.complete, ..._this.todo];
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
  this.run = function () {
    _this.idle = false;
      while (_this.runNext()) {
        _this.currentTask = _this.todo.shift();
        _this.currentTask.func(..._this.currentTask.args).then(() => {
          _this.complete.push(_this.running.shift());
          _this.run();
        });
        _this.running.push(_this.currentTask);
      }

    // }
  };
  this.start = () => {
    if (_this.idle) {
      _this.stop = false;
      _this.run();
    }
  };
}

function CipherType(target, options = { startSpeed: 200, breakLine: true }) {
  const _this = this;
  this.letters = "∀∃ƂOo⅂AɌFWDU∋IßP⅁XꝚ";
  this.symbols = "Ɣ%A$D#Fɻ∀∃∂⅄@W⅂&ꝚǶs∇!U∋Iß℘P⅁X∆";
  this.result = "";
  this.startSpeed = options.startSpeed;
  this.breakLine = true;
  this.speed = 100;
  this.nextStringDelay = 100;
  this.target = () => document.querySelector(target);
  const cipherQueue = new Queue();
  // let todo = [];
  const actions = {};
  actions.errors = [];

  //WRITE CODE FOR TYPING ELEMENT HARD CODED TEXT

  this.sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  this.symbolGenerator = (resc) => {
    return String(resc).charAt(Math.floor(Math.random() * resc.length));
  };

  this.removeLast = (str) => {
    return str.slice(0, -1);
  };

  this.oneByOne = async (
    texts = ["cipherType"],
    count,
    speed,
    useSymbols = false
  ) => {
    let resc = useSymbols ? this.symbols : this.letters;

    for (let j = 0; j < texts.length; j++) {
      for (let a = 0; a < texts[j].length; a++) {
        let final = texts[j][a];
        let past = _this.target().innerHTML;
        for (let i = 0; i < count; i++) {
          if (texts[j][a] === " ") {
            continue;
          }
          await this.sleep(speed);
          _this.target().innerHTML = past + this.symbolGenerator(resc);
        }
        _this.target().innerHTML = past + final;
      }
      _this.target().innerHTML += _this.breakLine ? "<br/>" : " ";
    }
    await this.sleep(speed * 5);
  };

  this.allAtOnce = async (text, count = 2, speed, useSymbols = false) => {
    let resc = useSymbols ? _this.symbols : _this.letters;

    let past = _this.target().innerHTML;

    for (let i = 0; i < 20; i++) {
      let result = "";
      for (let a = 0; a < text.length; a++) {
        result += text[a] === " " ? " " : _this.symbolGenerator(resc);
      }
      _this.target().innerHTML = past + result;
      await this.sleep(speed);
    }
    _this.target().innerHTML = past + text;
    await this.sleep(speed * 3);
  };

  CipherType.prototype._write = async (texts, count, speed, useSymbols) => {
    if (typeof texts === "string") {
      texts = [texts];
    }
    await _this.sleep(_this.startSpeed);
    await _this.oneByOne(texts, count, speed, useSymbols);
    return this;
  };

  CipherType.prototype._delete = async (len, speed = _this.speed) => {
    await _this.sleep(_this.startSpeed);
    console.log(typeof len);
    if (typeof len === "string") {
      len = len === "CLEAR" ? _this.target().innerHTML.length : 0;
    }
    if (typeof len === "undefined") {
      len = _this.target().innerHTML.length;
    }
    //let len = _this.target().innerHTML.length;
    for (let a = 0; a < len; a++) {
      let res = _this.target().innerHTML;
      await _this.sleep(speed * 1.2);
      _this.target().innerHTML = this.removeLast(res);
    }

    return this;
  };

  CipherType.prototype.type = (
    text,
    count = 4,
    speed = 80,
    useSymbols = false
  ) => {
    cipherQueue.add(CipherType.prototype._write, [
      text,
      count,
      speed,
      useSymbols,
    ]);
    return this;
  };
  CipherType.prototype.backspace = (len, speed = _this.speed) => {
    cipherQueue.add(CipherType.prototype._delete, [len, speed]);
    return this;
  };
  CipherType.prototype._clear = async (speed = _this.speed) => {
      _this.target().innerHTML = "";
    return this;
  };
  CipherType.prototype.pause = (ms) => {
    async function _(delay) {
      await this.sleep(delay);
    }
    cipherQueue.add(_, ms);
    return this;
  };
  CipherType.prototype.break = () => {
    async function _() {
      _this.target().innerHTML = _this.target().innerHTML + "<br />";
    }
    cipherQueue.add(_, "");
    return this;
  };
  CipherType.prototype.empty = () => {

    cipherQueue.add(CipherType.prototype._clear, "");
    return this;
  };
  CipherType.prototype.loop = () => {
    cipherQueue.add(CipherType.prototype._delete, []);
    cipherQueue.rerun();
    return this;
  };
  CipherType.prototype.reset = () => {
    cipherQueue.rerun();
    return this;
  };
  //ADD OPTIONS METHOD
  return this;
}

let type = new CipherType("h1");

type
  .type(["HI Ebi", "Yo!!!"], 3, 40)
  .backspace()
  .type("What's up?")
  .type("What's up?");

let btn = document.querySelector("button");
btn.addEventListener("click", function () {
  type.reset();
});
