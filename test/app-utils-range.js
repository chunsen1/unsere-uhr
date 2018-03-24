const assert = require('chai').assert,
      mockery = require('mockery'),
      range = require('../app/utils/range')

describe('app/utils/range.js', () => {
    it('should create range arrays', () => {
        let actual = range(10, 20)
        let expected = []

        for (var i = 10; i <= 20; i += 1) {
            expected.push(i)
        }
        
        assert.deepEqual(actual, expected)
    })

    it('should behave correctly for single values', () => {
        let actual = range(10, 10)
        let expected = [10]
        
        assert.deepEqual(actual, expected)
    })

    it('should be able to handle swapped values', () => {
        let actual = range(10, 5)
        let expected = [5, 6, 7, 8, 9, 10]
        
        assert.deepEqual(actual, expected)
    })
})
