const later =  require('later'),
      ws281x = require('rpi-ws281x-native'),
      clock = require('./utils/clock')

var schedule = later.parse.text('every 1 seconds')

later.setInterval(clock, schedule)

process.on('SIGINT', () => {
    ws281x.reset()
    process.nextTick(() => process.exit(0))
})
  
