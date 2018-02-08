const assert = require('assert'),
      mockery = require('mockery'),
      ws281x = require('./mock/ws281x-native-mock'),
      mcpspiadc = require('./mock/mcp-spi-adc')

before('enable mockery', () => {
    mockery.enable()
    mockery.registerMock('fs-mock', { stat: () => 3})
    mockery.registerMock('rpi-ws281x-native', ws281x)
    mockery.registerMock('mcp-spi-adc', mcpspiadc)
})

describe('light.js', () => {
    describe('#getBrightness()', () => {
        it('should run tests', () => {
            assert.equal(1, 1)
        })

        it('should load mocks', () => {
            let fs = require('fs-mock')
            assert.equal(fs.stat(), 3)
        })

        it('should somewhat work', (done) => {
            let light = require('../utils/light')

            setTimeout(() => {
                assert.equal(Number.isFinite(light.getBrightness(), 80))
                done()
            }, 1800)             
        })

        it('should run the app', (done) => {

        })
    })
})

after('disable mockery', () => mockery.disable())
