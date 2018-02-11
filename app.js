const later = require('later')
      ws281x = require('rpi-ws281x-native'),
      clock = require('./app/clock'),
      settings = require('./utils/settings'),
      server = require('./app/http/server')
      argv = require('./utils/yargs')

function init() {
    
    // schedule the clock
    let schedule = later.parse.text('every 1 seconds')
    later.setInterval(clock, schedule)

    // reset LEDs on exit
    process.on('SIGINT', () => {
        ws281x.reset()
        process.nextTick(() => process.exit(0))
    })

    // start the http server
    server.startServer(argv.port)
}

module.exports = {
    initialize: init
}