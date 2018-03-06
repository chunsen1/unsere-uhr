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
        state.leds.push(1, 2, 3)
        state.log.push("test")
        state.hour = 13
        state.minutes = 37

        state.initState(11, 55)

        assert.lengthOf(state.leds, 0, 'LED array should be empty after init')
        assert.lengthOf(state.log, 0, 'log array should be empty after init')
        assert.equal(state.hour, 11, 'hour should be 10')
        assert.equal(state.minutes, 55, 'minutes should be 55')
    })
})

after('disable mockery', () => mockery.disable())
