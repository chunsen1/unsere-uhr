let callback = () => { }

module.exports = {
    mock: (cb) => callback = cb,
    mockExit: () => callback()
}
