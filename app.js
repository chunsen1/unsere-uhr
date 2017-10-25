const later =  require('later'),
      leds = require('./leds'),
      ws281x = require('./ws281x-native-mock')

var schedule = later.parse.text('every 1 seconds')

later.setInterval(() => {
    let date = new Date(Date.now())
    let x = (date.getSeconds() % 12)
    let test = ["eins", "zwei", "drei", "vier", "fuenf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwoelf"]

    leds.clear()
    leds[test[x]]()
    leds.render()

}, schedule)

process.on('SIGINT', () => {
    ws281x.reset()
    process.nextTick(() => process.exit(0))
})
  