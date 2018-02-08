let withError = false

const handleMock = {
    read: (callback) => {
        callback(null, { value: 0.4 })
    }
}

const outer = {
    open: (port, options, callback) => {
        callback(withError ? { error: true } : null)
        return handleMock        
    }
}

module.exports = outer