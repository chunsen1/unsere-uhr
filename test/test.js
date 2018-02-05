const assert = require('assert'),
      mockery = require('mockery')

before('enable mockery', () => {
    mockery.enable({
        warnOnReplace: true,
        warnOnUnregistered: true
    })

    var fsMock = {
        stat: () => 3
    }

    mockery.registerMock('fs', fsMock)
})

describe('light.js', () => {
    describe('#getBrightness()', () => {
        it('should run tests', () => {
            assert.equal(1, 1)
        })

        it('should load mocks', () => {
            let fs = require('fs')
            assert.equal(fs.stat(), 3)
        })
    })
})

after('disable mockery', () => mockery.disable())
