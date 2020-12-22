const settings = require('../../configuration/settings')

const getBrightness = (req, res) => res.status(200).json({
    strategies: settings.brightness.STRATEGIES,
    strategy: settings.brightness.getStrategy(),
    fixedValue: settings.brightness.getFixedValue()
})

const setStrategy = (value) => {
    if (value
        && settings.brightness.STRATEGIES[value]) {
        settings.brightness.setStrategy(value)
        return { success: true }
    } else {
        return { success: false }
    }
}

const setFixedValue = (value) => {
    if (value && Number.isSafeInteger(value)) {
        settings.brightness.setFixedValue(value)
        return { success: true }
    }
    
    return { success: false }
}

function setBrightness(req, res) {
    if (req && req.body && req.body.strategy && req.body.fixedValue) {
        let result = {}

        result.fixedValue = setFixedValue(req.body.fixedValue)
        result.strategy = setStrategy(req.body.strategy)
        result.success = result.fixedValue.success && result.strategy.success

        settings.trySaveConfig()
        
        res.status(result.success ? 200 : 400).json(result)
    } else {
        res.status(400).json({
            success: false,
            message: 'Cannot parse body.'
        })
    }
}

module.exports = {
    getBrightness: getBrightness,
    setBrightness: setBrightness
}
