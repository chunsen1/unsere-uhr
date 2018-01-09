const later =  require('later'),
      ws281x = require('rpi-ws281x-native'),
      clock = require('./utils/clock'),
      ipc = require('node-ipc')

var schedule = later.parse.text('every 1 seconds')

later.setInterval(clock, schedule)

process.on('SIGINT', () => {
    ws281x.reset()
    process.nextTick(() => process.exit(0))
})

ipc.config.id = 'unsere-uhr-proc';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.serve(() => ipc.server.on('set-config', message => console.log(message)))

ipc.server.start()
