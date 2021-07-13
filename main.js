

function CipherType(target, options = {startSpeed: 200}) {
  var _this = this;
  this.letters = "∀∃ƂOo⅂AɌFWDU∋IßP⅁XꝚ";
  this.symbols = "Ɣ%A$D#Fɻ∀∃∂⅄@W⅂&ꝚǶs∇!U∋Iß℘P⅁X∆";
  this.result = "";
  this.startSpeed = options.startSpeed
  this.speed = 100
  this.target = () => document.querySelector(target);
  
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
  
  CipherType.prototype.type = async (text) => {
    await _this.sleep(_this.startSpeed);
    await _this.oneByOne(text, 4, 80, true);
    return this;
  }


  CipherType.prototype.backspace = (len) => {
    
    CipherType.prototype.delete(len)
    return this;
  }

  CipherType.prototype.clear = (speed = _this.speed)=>{
    let len = target.innerHTML.length;
    CipherType.prototype.delete(len)
    return this;
  }

  CipherType.prototype.delete = async (len, speed = _this.speed)=>{
    await _this.sleep(_this.startSpeed);
    console.log("90");
    //let len = target.innerHTML.length;
    for (let a = 0; a < len; a++) {
      let res = _this.target().innerHTML;
      await _this.sleep(speed * 1.2);
      _this.target().innerHTML = this.removeLast(res);
    }

    return this;
  }
  return this;
}

let type = new CipherType("h1");
type.type("Welcome to the future")
