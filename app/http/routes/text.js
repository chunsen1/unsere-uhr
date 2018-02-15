const W = require('../../configuration/settings').words

const getWordSettings = (req, res) => res.status(200).json({
    Strategies: {
        QuarterPastStrategies: W.QuarterPastStrategies,
        QuarterToStrategies: W.QuarterToStrategies,
        OClockStrategies: W.OClockStrategies
    },
    quarterPastStrategy: W.getQuarterPastStrategy(),
    quarterToStrategy: W.getQuarterToStrategy(),
    oClockStrategy: W.getOClockStrategy()
})

const setWordStrategies = (req, res) => {
    if (req.body 
        && req.body.quarterToStrategy 
        && req.body.quarterPastStrategy
        && req.body.oClockStrategy
        && Object.values(W.QuarterPastStrategies).indexOf(req.body.quarterPastStrategy) > -1
        && Object.values(W.QuarterToStrategies).indexOf(req.body.quarterToStrategy) > -1
        && Object.values(W.OClockStrategies).indexOf(req.body.oClockStrategy) > -1
    ) {
        W.setOClockStrategy(req.body.oClockStrategy)
        W.setQuarterPastStrategy(req.body.quarterPastStrategy)
        W.setQuarterToStrategy(req.body.setQuarterToStrategy)

        res.status(200).json({
            success: true,
            value: {
                quarterPastStrategy: W.getQuarterPastStrategy(),
                quarterToStrategy: W.getQuarterToStrategy(),
                oClockStrategy: W.getOClockStrategy()
            },
            message: 'Values successfully updated'
        })
    } else {
        res.status(400).json({
            success: false,
            value: {
                quarterPastStrategy: W.getQuarterPastStrategy(),
                quarterToStrategy: W.getQuarterToStrategy(),
                oClockStrategy: W.getOClockStrategy()
            },
            message: 'Expected all values to be set to one of the given strategies.'
        })
    }
}

module.exports = {
    getWordSettings: getWordSettings,
    setWordStrategies: setWordStrategies
}
