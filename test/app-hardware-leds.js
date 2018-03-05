const assert = require('chai').assert,
      mockery = require('mockery'),
      state = require('../app/clock/state'),
      ws281x = require('./mocks/ws281x-native-mock'),
      mcpspiadc = require('./mocks/mcp-spi-adc')

let leds = null

before('enable mockery', () => {
    // enable mockery
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    })

    // register hardware mocks
    mockery.registerMock('rpi-ws281x-native', ws281x)
    mockery.registerMock('mcp-spi-adc', mcpspiadc)

    // load module
    leds = require('../app/hardware/leds')
})

describe('app/hardware/leds.js', () => {
    it('should light the correct leds')

    it('should be able to clear its internal state')

    it('should be able to "render" its internal state')

    it('should initialize the hardware correctly')

    it('should clean up hardware state on exit')
})

after('disable mockery', () => mockery.disable())
