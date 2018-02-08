const mockery = require('mockery'),
      ws281xMock = require('./mock/ws281x-native-mock'),
      mcpspiadc = require('./mock/mcp-spi-adc')

mockery.enable()
mockery.registerMock('rpi-ws281x-native', ws281xMock)
mockery.registerMock('mcp-spi-adc', mcpspiadc)

let app = require('../app')
app.initialize()
