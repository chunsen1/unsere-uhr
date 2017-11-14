
const later =  require('later'),
leds = require('./leds'),
ws281x = require('rpi-ws281x-native')

var schedule = later.parse.text('every 1 seconds')

let i = 0

let words = [leds.pins.esIst, leds.pins.ein, leds.pins.eins, leds.pins.zwei, leds.pins.drei, leds.pins.vier, 
    leds.pins.fuenf, leds.pins.sechs, leds.pins.sieben, leds.pins.acht, leds.pins.neun,
     leds.pins.zehn, leds.pins.elf, leds.pins.zwoelf, leds.pins.mZwanzig, leds.pins.mFuenf, leds.pins.mZehn,
     leds.pins.viertel, leds.pins.dreiviertel, leds.pins.vor, leds.pins.nach, leds.pins.halb, leds.pins.uhr,
     leds.pins.undEins, leds.pins.undZwei, leds.pins.undDrei, leds.pins.undVier]

later.setInterval(() => {
    let x = []
    let n = i % words.length

    console.log("i: " + i + ", n: " + n)

    x.push(words[n])

    console.log(x);

    leds.clear()
    leds.lightleds(x)
    leds.render()
    
    i++
}, schedule)

process.on('SIGINT', () => {
    ws281x.reset()
    process.nextTick(() => process.exit(0))
})