const later =  require('later'),
      ws281x = require('rpi-ws281x-native'),
      clock = require('./utils/clock'),
      ipc = require('node-ipc'),
      express = require('express'),
      yargs = require('yargs'),
      bodyParser = require('body-parser'),
      settings = require('./utils/settings')

// schedule the clock
let schedule = later.parse.text('every 1 seconds')
later.setInterval(clock, schedule)

// reset LEDs on exit
process.on('SIGINT', () => {
    ws281x.reset()
    process.nextTick(() => process.exit(0))
})

// initialize express
const app = express()

// command line arguments
const argv = yargs
    .option('port', {
        alias: 'p',
        describe: 'Der Port für den http-Server',
        default: 8080,
        type: 'number'
    })
    .help()
    .example('$0 -p 1337')
    .completion()
    .epilogue('Mehr informationen gibt es auf https://github.com/chunsen1/unsere-uhr')
    .argv

// middleware
app.use(bodyParser.json())

// routes
app.get('/settings/light/', (req, res) => res.status(200).json({ 
    timeSpan: settings.light.getTimeSpan(),
    minimum: settings.light.getMinimum(),
    maximum: settings.light.getMaximum(),
    readInterval: settings.light.getReadInterval()
}))

app.get('/settings/brightness/', (req, res) => res.status(200).json({
    strategies: settings.brightness.STRATEGIES,
    strategy: settings.brightness.getStrategy(),
    fixedValue: settings.brightness.getFixedValue()
}))

// start server
app.listen(argv.port, () => console.log(`\r\n The server is running on localhost:${argv.port}`))