let withError = false

const handleMock = {
    read: (callback) => {
        callback(null, { value: 0.4 })
    }
}

const outer = {
    openMcp3008: (port, options, callback) => {
        callback(withError ? { error: true } : null)
        return handleMock        
    }
}

module.exports = outer