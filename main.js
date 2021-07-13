let title = "CRyPtotyPed".toUpperCase();
let target = document.querySelector("h1");

class CryptoType {
  static letters = "∀∃ƂOo⅂AɌFWDU∋IßP⅁XꝚ";
  static symbols = "Ɣ%A$D#Fɻ∀∃∂⅄@W⅂&ꝚǶs∇!U∋Iß℘P⅁X∆";
  static result = "";

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static symbolGenerator(resc) {
    return String(resc).charAt(Math.floor(Math.random() * resc.length));
  }

  static async oneByOne(title, target, count, speed, useSymbols = false) {
    let resc = useSymbols ? this.symbols : this.letters;
    target.innerHTML = "";
    for (let a = 0; a < title.length; a++) {
      let final = title[a];
      let past = target.innerHTML;
      for (let i = 0; i < count; i++) {
        await this.sleep(speed);
        target.innerHTML = past + this.symbolGenerator(resc);
      }
      target.innerHTML = past + final;
    }
  }

  static async allAtOnce(title, target, count, speed, useSymbols = false) {
    let resc = useSymbols ? this.symbols : this.letters;
    target.innerHTML = "";
    for (let i = 0; i < count; i++) {
      let result = "";
      for (let a = 0; a < title.length; a++) {
        result += this.symbolGenerator(resc);
      }
      target.innerHTML = result;
      await this.sleep(speed);
    }
    target.innerHTML = title;
  }
}

CryptoType.oneByOne(title, target, 4, 80, true);

//oneByOne(title, target, 5, 80, symbols);
//allAtOnce(title, target, 10, 600, symbols);
