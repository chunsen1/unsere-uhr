const assert = require('chai').assert,
      mockery = require('mockery'),
      exitHookMock = require('./mocks/exit-hook-mock'),
      state = require('../app/clock/state'),
      ws281x = require('./mocks/ws281x-native-mock'),
      mcpspiadc = require('./mocks/mcp-spi-adc'),
      settings = require('../app/configuration/settings')

let leds = null,
    ledCount = -1

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
    mockery.registerMock('exit-hook', exitHookMock.mock)

    // store LED-count on module initialization
    ws281x.setCallbacks({
        init: (x) => ledCount = x
    })

    // silence ws182x logging
    ws281x.setLogging(false)

    // load module
    leds = require('../app/hardware/leds')
})

describe('app/hardware/leds.js', () => {
    it('should light the correct leds', () => {
        // mock the get color function
        const result = []
        settings.color.get = (x) => result.push(x)

        // act
        leds.lightLeds([[1,2,3], [8, 9, 13, 14], [100, 101, 102, 103]])

        // assert
        assert.lengthOf(result, 11)
    })

    it('should be able to clear its internal state', () => {
        // arrange
        let result = []

        ws281x.setCallbacks({
            render: (x) => result = x
        })

        // act
        leds.lightLeds([[1,2,3], [8, 9, 13, 14]])
        leds.lightLeds([100, 101, 102, 103])
        leds.clear()
        leds.render()

        // assert
        assert.lengthOf(result, require('../app/configuration/led-layout').getLedCount())
        assert.lengthOf(result.filter(v => !!v), 0)
    })

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

    it('should initialize the hardware correctly', () => {
        // module was loaded in before() routine
        assert.equal(ledCount, require('../app/configuration/led-layout').getLedCount())
    })

    it('should clean up hardware state on exit', () => {
        let resultWasCleanedUp = false

        // mock reset callback on ws281x and use as resolver
        ws281x.setCallbacks({
            reset: () => resultWasCleanedUp = true
        })

        // act
        exitHookMock.mockExit()

        // assert
        assert.isTrue(resultWasCleanedUp)
    })
})

after('disable mockery', () => mockery.disable())
