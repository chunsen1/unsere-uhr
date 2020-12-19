function createBuffer(length) {
    const values = []
    let index = 0

    return {
        pushValue(value) {
            // assign value
            values[index] = value
    
            // increment
            index += 1
    
            // reset if the maximum index was reached
            if (index >= length) {
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
        }
    }
}

module.exports = {
    createBuffer
}
