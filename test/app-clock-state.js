const assert = require('chai').assert,
      mockery = require('mockery'),
      state = require('../app/clock/state'),
      ws281x = require('./mocks/ws281x-native-mock'),
      mcpspiadc = require('./mocks/mcp-spi-adc')

before('enable mockery', () => {
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    })
    mockery.registerMock('fs-mock', { stat: () => 3})
    mockery.registerMock('rpi-ws281x-native', ws281x)
    mockery.registerMock('mcp-spi-adc', mcpspiadc)
})

describe('app/clock/state.js', () => {
    it('should fulfill its contract', () => {
        assert.property(state, 'leds')
        assert.property(state, 'log')
        assert.property(state, 'minutes')
        assert.property(state, 'hour')
        assert.property(state, 'initState')
    })

    it('should have a proper initialization function', () => {
        assert.fail()
    })
})

after('disable mockery', () => mockery.disable())
