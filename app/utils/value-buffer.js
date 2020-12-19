function createBuffer(length) {
    const values = []
    let index = 0
    let cb = null

    return {
        pushValue(value) {
            // assign value
            values[index] = value
    
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
