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

// routes: light sensor settings
app.get('/settings/light/', (req, res) => res.status(200).json({ 
    timeSpan: settings.light.getTimeSpan(),
    minimum: settings.light.getMinimum(),
    maximum: settings.light.getMaximum(),
    readInterval: settings.light.getReadInterval()
}))

app.put('/settings/light/time-span', (req, res) => {
    if (req.body && req.body.value && Number.isSafeInteger(req.body.value)) {
        if (req.body.value > 0 && req.body.value < 31) {
            settings.light.setTimeSpan(req.body.value)
            res.status(200).json({
                success: true,
                value: settings.light.getTimeSpan(),
                message: `Moving average time window set to ${settings.light.getTimeSpan()} minutes.`
            })
        } else {
            res.status(400).json({
                success: false,
                value: settings.light.getTimeSpan(),
                message: 'Expected a value between 1 and 30 (minutes)'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            value: settings.light.getTimeSpan(),
            message: 'Expected a body similar to { "value": x } with x being an intger'
        })
    }
})

app.put('/settings/light/minimum', (req, res) => {
    if (req.body && req.body.value && Number.isFinite(req.body.value)) {
        if (req.body.value >= 0 && req.body.value < 1) {
            settings.light.setMinimum(req.body.value)
            res.status(200).json({
                success: true,
                value: settings.light.getMinimum(),
                message: `Set the min value for the light sensor to ${settings.light.getMinimum()}`
            })
        } else {
            res.status(400).json({
                success: false,
                value: settings.light.getMinimum(),
                message: 'Expected: 0 <= value < 1'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            value: settings.light.getMinimum(),
            message: 'Expected a body similar to { "value": x } with x being a number (0 <= x < 1).'
        })
    }
})

app.put('/settings/light/maximum', (req, res) => {
    if (req.body && req.body.value && Number.isFinite(req.body.value)) {
        if (req.body.value > 0 && req.body.value <= 1) {
            settings.light.setMaximum(req.body.value)
            res.status(200).json({
                success: true,
                value: settings.light.getMaximum(),
                message: `Set the max value for the light sensor to ${settings.light.getMaximum()}`
            })
        } else {
            res.status(400).json({
                success: false,
                value: settings.light.getMaximum(),
                message: 'Expected: 0 < value <= 1'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            value: settings.light.getMaximum(),
            message: 'Expected a body similar to { "value": x } with x being a number (0 < x <= 1).'
        })
    }
})

// routes: brightness settings
app.get('/settings/brightness/', (req, res) => res.status(200).json({
    strategies: settings.brightness.STRATEGIES,
    strategy: settings.brightness.getStrategy(),
    fixedValue: settings.brightness.getFixedValue()
}))

app.put('/settings/brightness/strategy', (req, res) => {
    if (req.body 
        && req.body.strategy
        && settings.brightness.STRATEGIES.some(x => x === req.body.strategy)) {
        settings.brightness.setStrategy(req.body.strategy)
        res.status(200).json({ success: true })
    } else {
        res.status(400).json({ success: false })
    }
})

app.put('/settings/brightness/fixed-value', (req, res) => {
    if (req.body && req.body.value && Number.isSafeInteger(req.body.value)) {
        settings.brightness.setFixedValue(req.body.value)
        res.status(200).json({ success: true})
    } else {
        res.status(400).json({ success: false})
    }
})

// routes: color settings
app.get('/settings/color', (req, res) => res.status(200).json(settings.color.getAll()))

app.put('/settings/color', (req, res) => {
    if (req.body) {
        let success = settings.color.setAll(req.body)
        res.status(success ? 200 : 400).json({ success: success })
    } else {
        res.status(400).json({ success: false })
    }
})

// start server
app.listen(argv.port, () => console.log(`\r\n The server is running on localhost:${argv.port}`))