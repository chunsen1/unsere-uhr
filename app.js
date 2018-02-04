const later =  require('later'),
      ws281x = require('rpi-ws281x-native'),
      clock = require('./utils/clock'),
      express = require('express'),
      bodyParser = require('body-parser'),
      settings = require('./utils/settings'),
      routesLight = require('./routes/light'),
      routesBrightness = require('./routes/brightness'),
      routesColor = require('./routes/color'),
      argv = require('./utils/yargs')

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

// middleware
app.use(bodyParser.json())

// routes: ambient light sensor settings
app.get('/settings/light/', routesLight.getLight)
app.put('/settings/light/time-span', routesLight.setTimeSpan)
app.put('/settings/light/minimum', routesLight.setMinimum)
app.put('/settings/light/maximum', routesLight.setMaximum)

// routes: brightness settings
app.get('/settings/brightness/', routesBrightness.getBrightness)
app.put('/settings/brightness/strategy', routesBrightness.setStrategy)
app.put('/settings/brightness/fixed-value', routesBrightness.setFixedValue)

// routes: color settings
app.get('/settings/color', routesColor.getColor)
app.put('/settings/color', routesColor.settings)

// start server
app.listen(argv.port, () => console.log(`\r\n The server is running on localhost:${argv.port}`))