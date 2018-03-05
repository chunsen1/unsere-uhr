const assert = require('chai').assert,
      mockery = require('mockery'),
      state = require('../app/clock/state'),
      mcpspiadc = require('./mocks/mcp-spi-adc')

let light = null

before('enable mockery', () => {
    // enable mockery
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    })

    // register hardware mocks
    mockery.registerMock('mcp-spi-adc', mcpspiadc)

    // load module
    light = require('../app/hardware/light')
})

describe('app/hardware/light.js', () => {
    it('should be able to report brightness')

    it('should be able to react to ambient light')

    it('should be able to respond with fixed light values')

    it('should support a brightness schedule')

    it('should read the hardware correctly')
})

after('disable mockery', () => mockery.disable())
