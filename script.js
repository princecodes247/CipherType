
let intro = new CipherType("#intro__text", {startDelete: true})
.type("Welcome to the future")
.delete(10)
.type("cipherType")
.run()

let simpleType = new CipherType("#simple_typing p")
.type("Simple typing example")
.run()

let multipleLines = new CipherType("#multiple_lines p")
.type(["Simple text","Kept simple"])
.run()

let deletingText = new CipherType("#deleting_text p")
.type("Changing text")
.delete("CLEAR")
.type("No...")
.delete()
.type("Delete test")
.delete(4)
.type("text!")
.run()

let withCursor = new CipherType("#with_cursor p", {withCursor: true})
.type("With cursor")
.run()

let straightText = new CipherType("#straight_text p", {switchCount: 1})
.type("Straight to the point...", 100)
.run()