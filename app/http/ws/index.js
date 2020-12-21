let emitter = null

module.exports = {
    setSocket(s) {
        emitter = s
    },
    getSocket() {
        return emitter
    }
}
