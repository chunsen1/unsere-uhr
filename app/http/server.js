const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      bodyParser = require('body-parser'),
      historyFallback = require('connect-history-api-fallback'),
      routesLight = require('./routes/light'),
      routesBrightness = require('./routes/brightness'),
      routesColor = require('./routes/color'),
      routesText = require('./routes/text'),
      clockStatus = require('./routes/clockStatus'),
      routesSchedule = require('./routes/schedule'),
      emitter = require('./ws')

const { createProxyMiddleware } = require('http-proxy-middleware')

function startServer() {
    // middleware
    app.use(bodyParser.json())
    
    const prefix = '/api'

    // routes: ambient light sensor
    app.get(prefix + '/settings/light', routesLight.getLight)
    app.put(prefix + '/settings/light', routesLight.setLight)
    app.get(prefix + '/status/light', routesLight.getAmbientLightData)

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
    if (process.env.DEBUG_PROXY_TARGET) {
        app.use(createProxyMiddleware({
            target: process.env.DEBUG_PROXY_TARGET,
            changeOrigin: true
        }))
    } else {
        app.use(express.static('node_modules/unsere-uhr-ui/dist'))
    }

    let port = process.env.PORT ? parseInt(process.env.PORT) : 80

    // start server
    http.listen(port, () => console.log(`\r\n The server is running on localhost:${port}`))

    // make socket.io globally accessible
    emitter.setSocket(io)
}

module.exports = {
    startServer: startServer
}
