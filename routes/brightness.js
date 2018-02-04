const settings = require('../utils/settings')

const getBrightness = (req, res) => res.status(200).json({
    strategies: settings.brightness.STRATEGIES,
    strategy: settings.brightness.getStrategy(),
    fixedValue: settings.brightness.getFixedValue()
})

const setStrategy = (req, res) => {
    if (req.body 
        && req.body.strategy
        && settings.brightness.STRATEGIES.some(x => x === req.body.strategy)) {
        settings.brightness.setStrategy(req.body.strategy)
        res.status(200).json({ success: true })
    } else {
        res.status(400).json({ success: false })
    }
}

const setFixedValue = (req, res) => {
    if (req.body && req.body.value && Number.isSafeInteger(req.body.value)) {
        settings.brightness.setFixedValue(req.body.value)
        res.status(200).json({ success: true})
    } else {
        res.status(400).json({ success: false})
    }
}

module.exports = {
    getBrightness: getBrightness,
    setStrategy: setStrategy,
    setFixedValue: setFixedValue
}