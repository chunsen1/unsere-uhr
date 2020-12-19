const W = require('../../configuration/settings').words
const DataUri = require('datauri')

const viertel = new DataUri(require.resolve('../../../assets/es_ist_viertel_acht.png')),
      viertelNach = new DataUri(require.resolve('../../../assets/es_ist_viertel_nach_sieben.png')),
      dreiviertel = new DataUri(require.resolve('../../../assets/es_ist_dreiviertel_acht.png')),
      viertelVor = new DataUri(require.resolve('../../../assets/es_ist_viertel_vor_acht.png')),
      mitUhr = new DataUri(require.resolve('../../../assets/es_ist_ein_uhr.png')),
      ohneUhr = new DataUri(require.resolve('../../../assets/es_ist_eins.png')),
      zwanzigVor = new DataUri(require.resolve('../../../assets/zwanzig_vor_vier.png')),
      zehnNachHalb = new DataUri(require.resolve('../../../assets/zehn_nach_halb_vier.png')),
      zwanzigNach = new DataUri(require.resolve('../../../assets/zwanzig_nach_drei.png')),
      zehnVorHalb = new DataUri(require.resolve('../../../assets/zehn_vor_halb_vier.png'))

const getWordSettings = (req, res) => res.status(200).json({
    Strategies: [
        {
            id: 'quarterPastStrategy',
            title: '15 Minuten',
            description: 'Beeinflusst die Darstellung der Uhrzeit wenn 15 Minuten nach einer vollen Stunde vergangen sind (hh:15 Uhr).',
            options: [
                {
                    id: W.QuarterPastStrategies.VIERTEL,
                    title: 'Viertel',
                    description: 'Ein Viertel der vollen Stunde. Um 4:15 Uhr wird angezeigt "Es ist viertel fünf."',
                    thumbnail: viertel.content
                },
                {
                    id: W.QuarterPastStrategies.VIERTEL_NACH,
                    title: 'Viertel nach',
                    description: 'Eine Viertel-Stunde nach einer vollen Stunde. Um 4:15 Uhr wird angezeigt "Es ist viertel nach vier."',
                    thumbnail: viertelNach.content
                }
            ]
        },
        {
            id: 'twentyMinutesStrategy',
            title: '20 Minuten',
            description: 'Dies beeinflusst die Darstellung der Zeit, wenn 20 Minuten einer Stunde vergangen sind.',
            options: [
                {
                    id: W.TwentyMinutesStrategies.ZWANZIG_NACH,
                    title: 'Zwanzig nach',
                    description: 'Beispiel (16:20): "Es ist zwanzig nach vier"',
                    thumbnail: zwanzigNach.content
                },
                {
                    id: W.TwentyMinutesStrategies.ZEHN_VOR_HALB,
                    title: 'Zehn vor halb',
                    description: 'Beispiel (16:20): "Es ist zehn vor halb fünf"',
                    thumbnail: zehnVorHalb.content
                }
            ]
        },
        {
            id: 'fourtyMinutesStrategy',
            title: '40 Minuten',
            description: 'Dies beeinflusst die Darstellung der Zeit, wenn 40 Minuten einer Stunde vergangen sind.',
            options: [
                {
                    id: W.FourtyMinutesStrategies.ZWANZIG_VOR,
                    title: 'Zwanzig vor',
                    description: 'Beispiel (16:40): "Es ist zwanzig vor fünf"',
                    thumbnail: zwanzigVor.content
                },
                {
                    id: W.FourtyMinutesStrategies.ZEHN_NACH_HALB,
                    title: 'Zehn nach halb',
                    description: 'Beispiel (16:40): "Es ist zehn nach halb fünf"',
                    thumbnail: zehnNachHalb.content
                }
            ]
        },
        {
            id: 'quarterToStrategy',
            title: '45 Minuten',
            description: 'Beeinflusst die Darstellung der Uhrzeit wenn 45 Minuten seit einer vollen Stunde vergangen sind (hh:45 Uhr).',
            options: [
                {
                    id: W.QuarterToStrategies.DREIVIERTEL,
                    title: 'Drei Viertel',
                    description: 'Drei Viertel der vollen Stunde. Um 4:45 Uhr wird angezeigt "Es ist dreiviertel fünf."',
                    thumbnail: dreiviertel.content
                },
                {
                    id: W.QuarterToStrategies.VIERTEL_VOR,
                    title: 'Viertel vor',
                    description: 'Eine Viertel-Stunde bis zur nächsten vollen Stunde. Um 4:45 Uhr wird angezeigt "Es ist viertel vor fünf."',
                    thumbnail: viertelVor.content
                }
            ]
        },
        {
            id: 'oClockStrategy',
            title: 'Volle Stunde',
            description: 'Mit dieser Einstellung wird gesteuert ob zu vollen Stunden das Wort "Uhr" angezeigt wird.',
            options: [
                {
                    id: W.OClockStrategies.MIT_UHR,
                    title: 'Mit Uhr',
                    description: 'Zur vollen Stunde wird angezeigt "Es ist X Uhr". Z. B. "Es ist ein Uhr", "Es ist zwei Uhr", ...',
                    thumbnail: mitUhr.content
                },
                {
                    id: W.OClockStrategies.OHNE_UHR,
                    title: 'Ohne Uhr',
                    description: 'Zur vollen Stunde wird angezeigt "Es ist X". Z. B. "Es ist eins", "Es ist zwei", ..."',
                    thumbnail: ohneUhr.content
                }
            ]
        },        
        {
            id: 'itIsStrategy',
            title: 'Es ist',
            description: 'Hier kann eingestellt werden wann die Worte "Es ist" angezeigt werden.',
            options: [
                {
                    id: W.ItIsStrategies.VOLLE_STUNDE,
                    title: 'Vollen Stunden',
                    description: 'Die Worte "Es ist" werden nur zur vollen Stunde angezeigt.',
                    thumbnail: mitUhr.content
                },
                {
                    id: W.ItIsStrategies.IMMER,
                    title: 'Immer',
                    description: '"Es ist" leuchtet immer.',
                    thumbnail: ohneUhr.content
                },
                {
                    id: W.ItIsStrategies.NIE,
                    title: 'Niemals',
                    description: 'Die Worte "Es ist" sind permanent deaktiviert.',
                    thumbnail: mitUhr.content
                }
            ]
        }
    ],
    quarterPastStrategy: W.getQuarterPastStrategy(),
    quarterToStrategy: W.getQuarterToStrategy(),
    oClockStrategy: W.getOClockStrategy(),
    twentyMinutesStrategy: W.getTwentyMinutesStrategy(),
    fourtyMinutesStrategy: W.getFourtyMinutesStrategy(),
    itIsStrategy: W.getItIsStrategy()
})

const setWordStrategies = (req, res) => {
    if (req.body 
        && req.body.quarterToStrategy 
        && req.body.quarterPastStrategy
        && req.body.oClockStrategy
        && req.body.twentyMinutesStrategy
        && req.body.fourtyMinutesStrategy
        && req.body.itIsStrategy
        && Object.values(W.QuarterPastStrategies).indexOf(req.body.quarterPastStrategy) > -1
        && Object.values(W.QuarterToStrategies).indexOf(req.body.quarterToStrategy) > -1
        && Object.values(W.OClockStrategies).indexOf(req.body.oClockStrategy) > -1
        && Object.values(W.TwentyMinutesStrategies).indexOf(req.body.twentyMinutesStrategy) > -1
        && Object.values(W.FourtyMinutesStrategies).indexOf(req.body.fourtyMinutesStrategy) > -1
        && Object.values(W.ItIsStrategies).indexOf(req.body.itIsStrategy) > -1
    ) {
        W.setOClockStrategy(req.body.oClockStrategy)
        W.setQuarterPastStrategy(req.body.quarterPastStrategy)
        W.setQuarterToStrategy(req.body.quarterToStrategy)
        W.setTwentyMinutesStrategy(req.body.twentyMinutesStrategy)
        W.setFourtyMinutesStrategy(req.body.fourtyMinutesStrategy)
        W.setItIsStrategy(req.body.itIsStrategy)

        res.status(200).json({
            success: true,
            value: {
                quarterPastStrategy: W.getQuarterPastStrategy(),
                quarterToStrategy: W.getQuarterToStrategy(),
                oClockStrategy: W.getOClockStrategy(),
                twentyMinutesStrategy: W.getTwentyMinutesStrategy(),
                fourtyMinutesStrategy: W.getFourtyMinutesStrategy(),
                itIsStrategy: W.getItIsStrategy()
            },
            message: 'Values successfully updated'
        })
    } else {
        res.status(400).json({
            success: false,
            value: {
                quarterPastStrategy: W.getQuarterPastStrategy(),
                quarterToStrategy: W.getQuarterToStrategy(),
                oClockStrategy: W.getOClockStrategy(),
                twentyMinutesStrategy: W.getTwentyMinutesStrategy(),
                fourtyMinutesStrategy: W.getFourtyMinutesStrategy(),
                itIsStrategy: W.getItIsStrategy()
            },
            message: 'Expected all values to be set to one of the given strategies.'
        })
    }
}

module.exports = {
    getWordSettings: getWordSettings,
    setWordStrategies: setWordStrategies
}
