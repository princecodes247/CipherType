function Queue(concurrentCount = 1) {
  let _this = this;
  this.running = [];
  this.complete = [];
  this.idle = true;
  this.threads = 1;
  this.todo = [];
  this.tasks = [];
  this.currentTask = {};
  this.test = 3
  this.interrupt = true;
  this.queueEnd = () => {
    this.interrupt = true;
    if (this.test > 1) {
      _this.start()
      this.test--;
    }
  };
  this.queueStart = () => {
    this.interrupt = false;
  };
  this.add = (func, args) => {
    _this.tasks.push({ func, args });
  };
  this.rerun = () => {
    _this.todo = [
      { func: CipherType.prototype._clear, args: "" },
      ..._this.complete,
      ..._this.todo,
    ];
    _this.start();
  };
  this.execute = async () => {
    _this.currentTask = _this.todo.shift();
    console.log(currentTask);
    await currentTask.func(...currentTask.args);
    return 0;
  };
  this.runNext = function () {
    return (
      _this.running.length < _this.threads &&
      _this.todo.length > 0 &&
      !_this.interrupt
    );
  };
  this.run = function () {
    _this.idle = false;

    while (_this.runNext()) {
      _this.currentTask = _this.todo.shift();
      _this.currentTask.func(..._this.currentTask.args).then(() => {
        _this.complete.push(_this.running.shift());
        _this.run();
      }).catch(err => console.log(err))
      _this.running.push(_this.currentTask);
    }
    
    // }
  };
  this.start = (times = 10, counter = 0) => {
    _this.queueStart()
    _this.todo = [..._this.tasks];
    _this.todo.push({ func: _this.queueEnd, args: ""})
    _this.run();
  };
}

function observer() {
  return this;
}

function CipherType(target, options = {}) {
  //Object.assign(this, options);
  let _this = this;
  this.mode = options.mode || 1;
  this.switchCount = options.switchCount || 3;
  this.breakLine = options.breakLine || true;
  this.cursor = options.withCursor || false; //
  this.cursorSpeed = options.cursorSpeed || 100; //
  this.cursorChar = options.cursorChar || "|"; //
  this.lifeLike = options.lifeLike || false;
  this.loop = options.loop || false;
  this.loopDelay = options.loopDelay || null;
  this.html = options.html || true; //
  this.nextStringDelay = options.nextStringDelay || 200;
  this.startDelete = options.startDelete || false;
  350;
  this.speed = options.speed || 100;
  this.deleteSpeed = options.deleteSpeed || (1 / 3) * this.speed;
  this.useSymbols = options.useSymbols || false;
  this.waitUntilVisible = options.waitUntilVisible || false;
  this.letters = "∀∃ƂOo⅂AɌFWDɺU∋IßP⅁XꝚ";
  this.symbols = "Ɣ%A$D#Fɻ∀∃∂⅄ʆ@W⅂&ꝚǶs∇!U∋Iß℘P⅁X∆";
  this.result = "";
  this.spacing = _this.breakLine ? "<br/>" : " ";
  this.cipherQueue = new Queue();

  // WORK ON LIFELIKE

  this.target = document.querySelector(target);
  this.target.classList.add("target");
  CipherType.prototype._clear = () => {
    _this.target.innerHTML = "";
    return CipherType.prototype;
  };
  if (this.cursor) {
    this.target.classList.add("with-cursor");
  }
  if (_this.startDelete) {
    CipherType.prototype._clear()
    // _this.cipherQueue.add(CipherType.prototype._clear, [1])
  }

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
  this.output = (arg) => {
    if (_this.html) {
      if (!(typeof arg === "undefined")) {
        _this.target.innerHTML = arg;
      }
      return _this.target.innerHTML;
    }
    console.log("up");
    if (!typeof arg === "undefined") {
      _this.target().innerText = arg;
    }
    return _this.target.innerText;
  };
  this.insert = (str, index, value) => {
    return str.substr(0, index) + value + str.substr(index);
  };
  this.oneByOne = async (
    texts = ["cipherType"],
    speed = this.speed,
    count = this.switchCount,
    useSymbols = this.useSymbols
  ) => {
    this.target.classList.add("typing");
    let resc = useSymbols ? this.symbols : this.letters;
    for (let j = 0; j < texts.length; j++) {
      if (j > 0) {
        _this.output(_this.output() + _this.spacing);
        await _this.sleep(_this.nextStringDelay);
      }
      // IMPLEMENTATION FOR HTML OPTION
      // let matches = new Array(texts[j].length).fill(0)
      // if (_this.html) {
      //   let openingTag = ""
      //   let closingTag = ""
      //   let openingRegex = /<[a-zA-Z]+(>|.*?[^?]>)/g;
      //   let closingRegex = /((<\/)w+(>))/g;
      //   let htmlRegex = /<.+?>/g;
      //   let shift = 0
      //   texts[j]=texts[j].replace(htmlRegex, (match,offset) => {
      //     let pos = offset - shift
      //     pos = pos > 0 ? pos : 0;
      //     matches[pos] = match
      //     console.log(offset, pos);
      //     shift--
      //     shift += match.length
      //     console.log(matches[1]);
      //     return " "
      //   })

      // }

      
      for (let a = 0; a < texts[j].length; a++) {
        let final = texts[j][a];
        let past = _this.output();

        for (let i = 0; i < count; i++) {
          if (texts[j][a] === " ") {
            continue;
          }
          await this.sleep(speed);
          let cu = this.symbolGenerator(resc);

          // IMPLEMENTATION FOR HTML OPTION
          // matches.forEach(match => {
          //   if (match !== 0) {
          //     console.log(match);
          //     console.log(matches.indexOf(match));
          //     if (matches.indexOf(match) < a) {
          //       cu = match + cu
          //     } else {
          //       cu =  cu + match
          //     }
          //   }
          // });

          _this.output(past + cu);
        }

        // IMPLEMENTATION FOR HTML OPTION
        // matches.forEach(match => {
        //   if (match !== 0) {
        //     console.log(match);
        //     console.log(matches.indexOf(match));
        //     if (matches.indexOf(match) < a) {
        //       final = match + final
        //     } else {
        //       final =  final + match
        //     }
        //   }
        // });

        _this.output(past + final);
      }
    }
    _this.target.classList.remove("typing");
  };

  this.allAtOnce = async (
    texts = ["cipherType"],
    speed,
    count = 2,
    useSymbols = false
  ) => {
    let resc = useSymbols ? _this.symbols : _this.letters;

    let past = _this.target.innerHTML;
    for (let j = 0; j < texts.length; j++) {
      for (let i = 0; i < 20; i++) {
        let result = "";
        for (let a = 0; a < texts[j].length; a++) {
          result += texts[j][a] === " " ? " " : _this.symbolGenerator(resc);
        }
        _this.target.innerHTML = past + result;
        await this.sleep(speed);
      }
      _this.target.innerHTML = past + texts[j];
    }
    await this.sleep(speed * 3);
  };

  CipherType.prototype._write = async (texts, speed, count, useSymbols) => {
    if (typeof texts === "string") {
      texts = [texts];
    }
    switch (_this.mode) {
      case 1:
        await _this.oneByOne(texts, speed, count, useSymbols);
        break;
      case 2:
        await _this.allAtOnce(texts, speed, count, useSymbols);
        break;
      default:
        //await _this.oneByOne(texts, speed, count, useSymbols);
        break;
    }

    return this;
  };

  CipherType.prototype._remove = async (len, speed = _this.deleteSpeed) => {
    await _this.sleep(_this.startDelay);
    if (typeof len === "string") {
      len = len === "CLEAR" ? _this.target.innerHTML.length : 0;
    }
    if (typeof len === "undefined") {
      len = _this.target.innerHTML.length;
    }
    //let len = _this.target.innerHTML.length;
    // ADD INNER_HTML FOR HTML IMPLEMENTATION
    for (let a = 0; a < len; a++) {
      let res = _this.target.textContent;
      await _this.sleep(_this.deleteSpeed);
      _this.target.textContent = res.slice(0, -1);
    }

    return this;
  };

  CipherType.prototype.type = (
    text,
    speed = this.speed,
    count = this.switchCount,
    useSymbols = false
  ) => {
    _this.cipherQueue.add(CipherType.prototype._write, [
      text,
      speed,
      count,
      useSymbols,
    ]);
    return CipherType.prototype;
  };
  CipherType.prototype.delete = (len, speed = _this.speed) => {
    _this.cipherQueue.add(CipherType.prototype._remove, [len, speed]);
    return CipherType.prototype;
  };
  CipherType.prototype.pause = (ms) => {
    async function _(delay) {
      await this.sleep(delay);
    }
    _this.cipherQueue.add(_, ms);
    return this;
  };
  CipherType.prototype.break = () => {
    async function _() {
      _this.target.innerHTML = _this.target.innerHTML + "<br />";
    }
    _this.cipherQueue.add(_, "");
    return this;
  };
  CipherType.prototype.empty = () => {
    _this.cipherQueue.add(CipherType.prototype._clear, "");
    return this;
  };
  CipherType.prototype.loop = () => {
    _this.cipherQueue.add(CipherType.prototype._delete, []);
    _this.cipherQueue.rerun();
    return this;
  };
  CipherType.prototype.reset = () => {
    _this.cipherQueue.rerun();
    return this;
  };
  CipherType.prototype.run = () => {
    _this.cipherQueue.start();
    return this;
  };
    

  //ADD OPTIONS METHOD
  return this;
}
