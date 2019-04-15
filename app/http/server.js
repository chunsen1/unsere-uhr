const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      routesLight = require('./routes/light'),
      routesBrightness = require('./routes/brightness'),
      routesColor = require('./routes/color'),
      routesText = require('./routes/text'),
      clockStatus = require('./routes/clockStatus'),
      routesSchedule = require('./routes/schedule')

function startServer(port) {
    // middleware
    app.use(bodyParser.json())
    app.use(cors())

    // routes: ambient light sensor
    app.get('/settings/light', routesLight.getLight)
    app.put('/settings/light', routesLight.setLight)
    app.get('/light', routesLight.readAmbientLight)

    // routes: brightness settings
    app.get('/settings/brightness', routesBrightness.getBrightness)
    app.put('/settings/brightness', routesBrightness.setBrightness)

    // routes: color settings
    app.get('/settings/color', routesColor.getColor)
    app.put('/settings/color', routesColor.setColor)

    // routes: text settings
    app.get('/settings/text', routesText.getWordSettings)
    app.put('/settings/text', routesText.setWordStrategies)

    // routes: schedule
    app.get('/settings/schedule', routesSchedule.getSchedule)
    app.put('/settings/schedule', routesSchedule.setSchedule)

    // routes: clock status
    app.get('/status/clock', clockStatus.getClockStatus)
    app.get('/settings/led-layout', clockStatus.getLedLayout)
    app.get('/status/hardware', clockStatus.getHardwareStatus)
    app.get('/status/os', clockStatus.getOSStatus)

    // start server
    http.listen(port, () => console.log(`\r\n The server is running on localhost:${port}`))
}

module.exports = {
    startServer: startServer
}
