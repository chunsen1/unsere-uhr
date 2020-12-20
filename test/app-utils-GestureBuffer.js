const GestureBuffer = require('../app/utils/GestureBuffer')
const expect = require('chai').expect

describe('app/utils/GestureBuffer.js', () => {
    it('should be a class', () => {
        const gb = new GestureBuffer()
        
        expect(gb.push).to.be.a('function')
        expect(gb.checkGestures).to.be.a('function')
    })

    it('should be possible to push values', () => {
        const gb = new GestureBuffer()
        gb.push(0.12)
        gb.push(0.4)
        gb.push(0.13355)
        expect(gb.getLenght()).to.equal(3)
    })

    it('should recognize double taps', () => {
        const gb = new GestureBuffer()

        const values = [
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.4,
            0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4
        ]

        for (let i = 0; i < values.length; i += 1) {
            gb.push(values[i])
        }

        const result = gb.checkGestures()

        expect(result.low).to.equal(2)
        expect(result.high).to.equal(2)
    })

    it('should recognize triple taps', () => {
        const gb = new GestureBuffer()

        const values = [
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.0, 0.4, 0.4,
            0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4
        ]

        for (let i = 0; i < values.length; i += 1) {
            gb.push(values[i])
        }

        const result = gb.checkGestures()

        expect(result.low).to.equal(3)
        expect(result.high).to.equal(3)
    })

    it ('should not recognize events prematurely', () => {
        const gb = new GestureBuffer()

        const values = [
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,
            0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.0, 0.4, 0.4,
            0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.4,
        ]

        for (let i = 0; i < values.length; i += 1) {
            gb.push(values[i])
        }

        const result = gb.checkGestures()

        expect(result).to.be.undefined
    })
})
