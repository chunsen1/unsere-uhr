const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      historyFallback = require('connect-history-api-fallback'),
      routesLight = require('./routes/light'),
      routesBrightness = require('./routes/brightness'),
      routesColor = require('./routes/color'),
      routesText = require('./routes/text'),
      clockStatus = require('./routes/clockStatus'),
      routesSchedule = require('./routes/schedule')

function startServer(port) {
    // middleware
    app.use(bodyParser.json())
    // app.use(cors())

    let prefix = '/api'

    // routes: ambient light sensor
    app.get(prefix + '/settings/light', routesLight.getLight)
    app.put(prefix + '/settings/light', routesLight.setLight)
    app.get(prefix + '/light', routesLight.readAmbientLight)

    // routes: brightness settings
    app.get(prefix + '/settings/brightness', routesBrightness.getBrightness)
    app.put(prefix + '/settings/brightness', routesBrightness.setBrightness)

    // routes: color settings
    app.get(prefix + '/settings/color', routesColor.getColor)
    app.put(prefix + '/settings/color', routesColor.setColor)

    // routes: text settings
    app.get(prefix + '/settings/text', routesText.getWordSettings)
    app.put(prefix + '/settings/text', routesText.setWordStrategies)

    // routes: schedule
    app.get(prefix + '/settings/schedule', routesSchedule.getSchedule)
    app.put(prefix + '/settings/schedule', routesSchedule.setSchedule)

    // routes: clock status
    app.get(prefix + '/status/clock', clockStatus.getClockStatus)
    app.get(prefix + '/settings/led-layout', clockStatus.getLedLayout)
    app.get(prefix + '/status/hardware', clockStatus.getHardwareStatus)
    app.get(prefix + '/status/os', clockStatus.getOSStatus)

    // history API handling
    app.use(historyFallback())

    // add ui
    app.use(express.static('node_modules/unsere-uhr-ui/dist'))

    // start server
    http.listen(port, () => console.log(`\r\n The server is running on localhost:${port}`))
}

module.exports = {
    startServer: startServer
}
