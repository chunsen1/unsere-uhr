const mockery = require('mockery'),
      ws281xMock = require('../mocks/ws281x-native-mock'),
      mcpspiadc = require('../mocks/mcp-spi-adc')

mockery.enable()
mockery.registerMock('rpi-ws281x-native', ws281xMock)
mockery.registerMock('mcp-spi-adc', mcpspiadc)

let startApp = () => {
      const later = require('later')
      clock = require('../../app/clock'),
      settings = require('../../app/configuration/settings'),
      server = require('../../app/http/server')

      // schedule the clock
      let schedule = later.parse.text('every 1 seconds')
      later.setInterval(clock, schedule)

      // start the http server
      server.startServer()
}

startApp()
