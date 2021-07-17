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

function CipherType(
  target,
  options = {
    breakLine: true,
    cursor: false, //
    cursorSpeed: 100, //
    cursorChar: "|", //
    lifeLike: false,
    loop: false,
    loopDelay: null,
    html: true, //
    nextStringDelay: 100,
    startDelete: false,
    startDelay: 250,
    speed: 100,
    deleteSpeed: 1 / 3,
    useSymbols: false,
    waitUntilVisible: false,
  }
) {
  //Object.assign(this, options);
  const _this = this;
  
  this.breakLine = options.breakLine || true;
  this.cursor = options.cursor || false; //
  this.cursorSpeed = options.cursorSpeed || 100; //
  this.cursorChar = options.cursorChar || "|"; //
  this.lifeLike = options.lifeLike || false;
  this.loop = options.loop || false;
  this.loopDelay = options.loopDelay || null;
  this.html = options.html || true; //
  this.nextStringDelay = options.nextStringDelay || 100;
  this.startDelete = options.startDelete || false;
  this.startDelay = options.startDelay || 250;
  this.speed = options.speed || 100;
  this.deleteSpeed = options.deleteSpeed || 1 / 3;
  this.useSymbols = options.useSymbols || false;
  this.waitUntilVisible = options.waitUntilVisible || false;
  this.letters = "∀∃ƂOo⅂AɌFWDU∋IßP⅁XꝚ";
  this.symbols = "Ɣ%A$D#Fɻ∀∃∂⅄@W⅂&ꝚǶs∇!U∋Iß℘P⅁X∆";
  this.result = "";
  this.deleteSpeed *= this.speed;
  this.spacing = _this.breakLine ? "<br/>" : " ";
  const cipherQueue = new Queue();

  // WORK ON LIFELIKE

  this.target = document.querySelector(target);
  this.target.classList.add("target")
  if (this.cursor) {
    this.target.classList.add("with-cursor")
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
    count = 4,
    useSymbols = this.useSymbols
  ) => {
    this.target.classList.add("typing")
    let resc = useSymbols ? this.symbols : this.letters;
    for (let j = 0; j < texts.length; j++) {
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

      console.log(texts[j]);
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

      await this.sleep(_this.nextStringDelay);
    }
    this.target.classList.remove("typing")
  };

  this.allAtOnce = async (text, speed, count = 2, useSymbols = false) => {
  let resc = useSymbols ? _this.symbols : _this.letters;

    let past = _this.target.innerHTML;

    for (let i = 0; i < 20; i++) {
      let result = "";
      for (let a = 0; a < text.length; a++) {
        result += text[a] === " " ? " " : _this.symbolGenerator(resc);
      }
      _this.target.innerHTML = past + result;
      await this.sleep(speed);
    }
    _this.target.innerHTML = past + text;
    await this.sleep(speed * 3);
  };

  CipherType.prototype._write = async (texts, speed, count, useSymbols) => {
    if (typeof texts === "string") {
      texts = [texts];
    }
    if (_this.startDelete) {
      
      await CipherType.prototype._delete()
    }
    await _this.oneByOne(texts, speed, count, useSymbols);
    return this;
  };

  CipherType.prototype._delete = async (len, speed = _this.deleteSpeed) => {
    await _this.sleep(_this.startDelay);
    console.log(typeof len);
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
      console.log(a, len);
      _this.target.textContent = this.removeLast(res);
    }

    return this;
  };

  CipherType.prototype.type = (
    text,
    speed = 80,
    count = 4,
    useSymbols = false
  ) => {
    cipherQueue.add(CipherType.prototype._write, [
      text,
      speed,
      count,
      useSymbols,
    ]);
    return this;
  };
  CipherType.prototype.backspace = (len, speed = _this.speed) => {
    cipherQueue.add(CipherType.prototype._delete, [len, speed]);
    return this;
  };
  CipherType.prototype._clear = async (speed = _this.speed) => {
    _this.target.innerHTML = "";
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
      _this.target.innerHTML = _this.target.innerHTML + "<br />";
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

let sophia = new CipherType("p", { speed: 10, startDelete: true });

sophia.type("asw <sup> ht </sup> and....", 20)

let btn = document.querySelector("button");
btn.addEventListener("click", function () {
  type.reset();
});
