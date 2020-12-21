const emitter = require('../http/ws')

function createBuffer(length) {
    const values = []
    let index = 0
    let cb = null

    return {
        pushValue(value) {
            // assign value
            values[index] = value

            // broadcast
            if (index % 10 === 0 && emitter.getSocket()) {
                emitter.getSocket().emit('ambient-light', values.slice(Math.max(values.length - 10, 0)))
            }
    
            // increment
            index += 1
    
            // reset if the maximum index was reached
            if (index >= length) {
                if (typeof cb === 'function') {
                    cb(values)
                }
                index = 0
            }
        },
        getStatus() {
            return {
                index, values
            }
        },
        clear() {
            index = 0
            values = []
        },
        setResetCallback(callback) {
            cb = callback
        }
    }
}

module.exports = {
    createBuffer
}
