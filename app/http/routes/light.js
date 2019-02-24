const settings = require('../../configuration/settings')

const getLight = (req, res) => res.status(200).json({ 
    timeSpan: settings.light.getTimeSpan(),
    minimum: settings.light.getMinimum(),
    maximum: settings.light.getMaximum(),
    readInterval: settings.light.getReadInterval()
})

function setTimeSpan(value) {
    if (value && Number.isSafeInteger(value)) {
        if (value > 0 && value < 31) {
            settings.light.setTimeSpan(value)
            return {
                success: true,
                value: settings.light.getTimeSpan(),
                message: `Moving average time window set to ${settings.light.getTimeSpan()} minutes.`
            }
        } else {
            return {
                success: false,
                value: settings.light.getTimeSpan(),
                message: 'Expected a value between 1 and 30 (minutes)'
            }
        }
    } else {
        return {
            success: false,
            value: settings.light.getTimeSpan(),
            message: 'Expected an integer value for timeSpan'
        }
    }
}

function setMinimum(value) {
    if (value && Number.isFinite(value)) {
        if (value >= 0 && value < 1) {
            settings.light.setMinimum(value)
            return {
                success: true,
                value: settings.light.getMinimum(),
                message: `Set the min value for the light sensor to ${settings.light.getMinimum()}`
            }
        } else {
            return {
                success: false,
                value: settings.light.getMinimum(),
                message: 'Expected: 0 <= value < 1'
            }
        }
    } else {
        return {
            success: false,
            value: settings.light.getMinimum(),
            message: 'Expected a number for the minimum value (0 <= x < 1).'
        }
    }
}

function setMaximum(value) {
    if (value && Number.isFinite(value)) {
        if (value > 0 && value <= 1) {
            settings.light.setMaximum(value)
            return {
                success: true,
                value: settings.light.getMaximum(),
                message: `Set the max value for the light sensor to ${settings.light.getMaximum()}`
            }
        } else {
            return {
                success: false,
                value: settings.light.getMaximum(),
                message: 'Expected: 0 < value <= 1'
            }
        }
    } else {
        return {
            success: false,
            value: settings.light.getMaximum(),
            message: 'Exptected a number for the maximum value (0 < x <= 1).'
        }
    }
}

function setLight(req, res) {
    if (!req || !req.body) {
        res.status(400).json({
            success: false,
            message: 'Cannot read data.'
        })

        return;
    }

    let result = {}

    if (req.body.minimum && req.body.maximum && req.body.timeSpan) {
        if (req.body.minimum < req.body.maximum) {
            result.minimum = setMinimum(req.body.minimum)
            result.maximum = setMaximum(req.body.maximum)
            result.timeSpan = setTimeSpan(req.body.timeSpan)

            result.success = result.minimum.success && result.maximum.success && result.timeSpan.success

            res.status(result.success ? 200 : 400).json(result)
        } else {
            res.status(400).json({
                success: false,
                message: `The lower bound should be higher than the upper bound (${req.body.minimum} >= ${req.body.maximum})`
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: `Your content does not appear to be valid.`
        })
    }
}

module.exports = {
    getLight: getLight,
    setLight: setLight
}
