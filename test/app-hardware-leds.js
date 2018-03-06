const assert = require('chai').assert,
      mockery = require('mockery'),
      state = require('../app/clock/state'),
      ws281x = require('./mocks/ws281x-native-mock'),
      mcpspiadc = require('./mocks/mcp-spi-adc'),
      settings = require('../app/configuration/settings')

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
    mockery.registerMock('../configuration/settings', settings)

    // load module
    leds = require('../app/hardware/leds')
})

describe('app/hardware/leds.js', () => {
    it('should light the correct leds (using an appropriate color)', () => {
        // mock the get color function
        const result = []
        settings.color.get = (x) => result.push(x)

        // act
        leds.lightLeds([[1,2,3], [8, 9, 13, 14], [100, 101, 102, 103]])

        // assert
        assert.lengthOf(result, 11)
    })

    it('should be able to clear its internal state')

    it('should be able to "render" its internal state', () => {
        // arrange
        let result = []

        ws281x.setCallbacks({
            render: (x) => result = x
        })

        // act
        leds.lightLeds([[1,2,3], [8, 9, 13, 14]])
        leds.lightLeds([100, 101, 102, 103])
        leds.render()

        // assert
        assert.lengthOf(result, require('../app/configuration/led-layout').getLedCount())
        assert.lengthOf(result.filter(v => !!v), 11)
    })

    it('should initialize the hardware correctly')

    it('should clean up hardware state on exit')
})

after('disable mockery', () => mockery.disable())
