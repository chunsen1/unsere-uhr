const express = require('express'),
      bodyParser = require('body-parser'),
      routesLight = require('./routes/light'),
      routesBrightness = require('./routes/brightness'),
      routesColor = require('./routes/color'),
      routesText = require('./routes/text')

function startServer(port) {
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
    app.put('/settings/color', routesColor.setColor)

    // routes: text settings
    app.get('/settings/text', routesText.getWordSettings)
    app.put('/settings/text', routesText.setWordStrategies)

    // start server
    app.listen(port, () => console.log(`\r\n The server is running on localhost:${port}`))
}

module.exports = {
    startServer: startServer
}
