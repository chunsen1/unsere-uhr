const later =  require('later'),
      leds = require('./leds'),
      ws281x = require('rpi-ws281x-native')

var schedule = later.parse.text('every 1 minute')

later.setInterval(() => {
    let date = new Date(Date.now())
    let minutes = date.getMinutes()
    let hour = date.getHours()

    let x = []

    // es ist
    x.push(leds.pins.esIst)

    if (minutes < 5) {
        // es ist ... uhr
        x.push(leds.pins.uhr)
    }

    if (minutes >= 5 && minutes < 10) {
        // es is 5 nach ...
        x.push(leds.pins.mFuenf)
        x.push(leds.pins.nach)
    }

    if (minutes >= 10 && minutes < 15) {
        // es ist 10 nach ...
        x.push(leds.pins.mZehn)
        x.push(leds.pins.nach)
    }

    if (minutes >= 15 && minutes < 20) {
        // viertel ...+1
        x.push(leds.pins.viertel)
        hour++
    }

    if (minutes >= 20 && minutes < 25) {
        // es ist zwanzig nach ...
        x.push(leds.pins.mZwanzig)
        x.push(leds.pins.nach)
    }

    if (minutes >= 25 && minutes < 30) {
        // es ist 5 vor halb ...+1
        x.push(leds.pins.mFuenf)
        x.push(leds.pins.vor)
        x.push(leds.pins.halb)
        hour++
    }

    if (minutes >= 30 && minutes < 35) {
        x.push(leds.pins.halb)
        hour++
    }

    if (minutes >= 35 && minutes < 40) {
        // es ist 5 nach halb ...+1
        x.push(leds.pins.mFuenf)
        x.push(leds.pins.nach)
        x.push(leds.pins.halb)
        hour++
    }

    if (minutes >= 40 && minutes < 45) {
        // es ist 20 vor ...+1
        x.push(leds.pins.mZwanzig)
        x.push(leds.pins.vor)
        hour++
    }

    if (minutes >= 45 && minutes < 50) {
        // es ist dreiviertel ...+1
        x.push(leds.pins.dreiviertel)
        hour++
    }

    if (minutes >= 50 && minutes < 55) {
        // es ist 10 vor ...+1
        x.push(leds.pins.mZehn)
        x.push(leds.pins.vor)
        hour++
    }

    if (minutes >= 55) {
        x.push(leds.pins.mFuenf)
        x.push(leds.pins.vor)
        hour++
    }

    if (hour === 13) { hour = 1 }
    
    let y = []
    if (hour === 0) { y = leds.pins.zwoelf }
    if (hour === 1) { y = leds.pins.eins }
    if (hour === 2) { y = leds.pins.zwei }
    if (hour === 3) { y = leds.pins.drei }
    if (hour === 4) { y = leds.pins.vier }
    if (hour === 5) { y = leds.pins.fuenf }
    if (hour === 6) { y = leds.pins.sechs }
    if (hour === 7) { y = leds.pins.sieben }
    if (hour === 8) { y = leds.pins.acht }
    if (hour === 9) { y = leds.pins.neun }
    if (hour === 10) { y = leds.pins.zehn }
    if (hour === 11) { y = leds.pins.elf }
    if (hour === 12) { y = leds.pins.zwoelf }

    x.push(y)

    leds.render()

    console.log(x)
}, schedule)

process.on('SIGINT', () => {
    ws281x.reset()
    process.nextTick(() => process.exit(0))
})
  
