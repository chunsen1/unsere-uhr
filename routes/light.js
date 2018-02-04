const settings = require('../utils/settings')

const getLight = (req, res) => res.status(200).json({ 
    timeSpan: settings.light.getTimeSpan(),
    minimum: settings.light.getMinimum(),
    maximum: settings.light.getMaximum(),
    readInterval: settings.light.getReadInterval()
})

const setTimeSpan = (req, res) => {
    if (req.body && req.body.value && Number.isSafeInteger(req.body.value)) {
        if (req.body.value > 0 && req.body.value < 31) {
            settings.light.setTimeSpan(req.body.value)
            res.status(200).json({
                success: true,
                value: settings.light.getTimeSpan(),
                message: `Moving average time window set to ${settings.light.getTimeSpan()} minutes.`
            })
        } else {
            res.status(400).json({
                success: false,
                value: settings.light.getTimeSpan(),
                message: 'Expected a value between 1 and 30 (minutes)'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            value: settings.light.getTimeSpan(),
            message: 'Expected a body similar to { "value": x } with x being an intger'
        })
    }
}

const setMinimum = (req, res) => {
    if (req.body && req.body.value && Number.isFinite(req.body.value)) {
        if (req.body.value >= 0 && req.body.value < 1) {
            settings.light.setMinimum(req.body.value)
            res.status(200).json({
                success: true,
                value: settings.light.getMinimum(),
                message: `Set the min value for the light sensor to ${settings.light.getMinimum()}`
            })
        } else {
            res.status(400).json({
                success: false,
                value: settings.light.getMinimum(),
                message: 'Expected: 0 <= value < 1'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            value: settings.light.getMinimum(),
            message: 'Expected a body similar to { "value": x } with x being a number (0 <= x < 1).'
        })
    }
}

const setMaximum = (req, res) => {
    if (req.body && req.body.value && Number.isFinite(req.body.value)) {
        if (req.body.value > 0 && req.body.value <= 1) {
            settings.light.setMaximum(req.body.value)
            res.status(200).json({
                success: true,
                value: settings.light.getMaximum(),
                message: `Set the max value for the light sensor to ${settings.light.getMaximum()}`
            })
        } else {
            res.status(400).json({
                success: false,
                value: settings.light.getMaximum(),
                message: 'Expected: 0 < value <= 1'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            value: settings.light.getMaximum(),
            message: 'Expected a body similar to { "value": x } with x being a number (0 < x <= 1).'
        })
    }
}

module.exports = {
    getLight: getLight,
    setTimeSpan: setTimeSpan,
    setMaximum: setMaximum,
    setMinimum: setMinimum
}
