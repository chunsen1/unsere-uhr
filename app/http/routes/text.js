const W = require('../../configuration/settings').words

const getWordSettings = (req, res) => res.status(200).json({
    Strategies: [
        {
            id: 'quarterPastStrategy',
            title: 'hh:15',
            description: 'Beeinflusst die Darstellung der Uhrzeit wenn 15 Minuten nach einer vollen Stunde vergangen sind (hh:15 Uhr)',
            options: [
                {
                    id: W.QuarterPastStrategies.VIERTEL,
                    title: 'Viertel',
                    description: 'Ein Viertel der vollen Stunde. Um 4:15 Uhr wird angezeigt "Es ist viertel fünf."',
                    thumbnail: '/img/icons/apple-touch-icon-180x180.png'
                },
                {
                    id: W.QuarterPastStrategies.VIERTEL_NACH,
                    title: 'Viertel nach',
                    description: 'Eine Viertel-Stunde nach einer vollen Stunde. Um 4:15 Uhr wird angezeigt "Es ist viertel nach vier."',
                    thumbnail: '/img/icons/apple-touch-icon-180x180.png'
                }
            ]
        },
        {
            id: 'quarterToStrategy',
            title: 'hh:45',
            description: 'Beeinflusst die Darstellung der Uhrzeit wenn 45 Minuten seit einer vollen Stunde vergangen sind (hh:45 Uhr)',
            options: [
                {
                    id: W.QuarterToStrategies.DREIVIERTEL,
                    title: 'Drei Viertel',
                    description: 'Drei Viertel der vollen Stunde. Um 4:45 Uhr wird angezeigt "Es ist dreiviertel fünf."',
                    thumbnail: '/img/icons/apple-touch-icon-180x180.png'
                },
                {
                    id: W.QuarterToStrategies.VIERTEL_VOR,
                    title: 'Viertel vor',
                    description: 'Eine Viertel-Stunde bis zur nächsten vollen Stunde. Um 4:45 Uhr wird angezeigt "Es ist viertel vor fünf."',
                    thumbnail: '/img/icons/apple-touch-icon-180x180.png'
                }
            ]
        },
        {
            id: 'oClockStrategy',
            title: 'hh:45',
            description: 'Beeinflusst die Darstellung der Uhrzeit wenn 45 Minuten seit einer vollen Stunde vergangen sind (hh:45 Uhr)',
            options: [
                {
                    id: W.OClockStrategies.MIT_UHR,
                    title: 'Mit Uhr',
                    description: 'Zur vollen Stunde wird angezeigt "Es ist X Uhr". Z. B. "Es ist ein Uhr", "Es ist zwei Uhr", ...',
                    thumbnail: '/img/icons/apple-touch-icon-180x180.png'
                },
                {
                    id: W.OClockStrategies.OHNE_UHR,
                    title: 'Ohne Uhr',
                    description: 'Zur vollen Stunde wird angezeigt "Es ist X". Z. B. "Es ist eins", "Es ist zwei", ..."',
                    thumbnail: '/img/icons/apple-touch-icon-180x180.png'
                }
            ]
        }
    ],
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
        W.setQuarterToStrategy(req.body.quarterToStrategy)

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
