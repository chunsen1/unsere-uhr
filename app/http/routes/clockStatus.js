const settings = require('../../configuration/settings'),
      leds = require('../../hardware/leds')

const getClockStatus = (req, res) => res.status(200).json({
    ledValues: leds.getStatus(),
    time: new Date(Date.now()).toISOString()
})

const getOSStatus = (req, res) => res.status(404).json({
    error: true,
    message: 'Not yet implemented'
})

const getHardwareStatus = (req, res) => res.status(404).json({
    error: true,
    message: 'Not yet implemented'
})

module.exports = {
    getClockStatus: getClockStatus,
    getHardwareStatus: getHardwareStatus,
    getOSStatus: getOSStatus
}
