const range = require('../utils/range')
const LED_COUNT = 224

module.exports = {
    getLedCount: () => LED_COUNT,

    esIst: [1, 2, 3, 4, 7, 8, 9, 10, 11, 12],

    ein: range(128, 133),
    eins: range(126, 133),
    zwei: range(112, 119),
    drei: range(134, 141),
    vier: range(148, 155),
    fuenf: range(104, 111),
    sechs: range(168, 177),
    sieben: range(178, 189),
    acht: range(156, 163),
    neun: range(209, 216),
    zehn: range(215, 222),
    elf: range(100, 105),
    zwoelf: range(190, 199),

    mZwanzig: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    mFuenf: [15, 16, 17, 18, 19, 20, 21, 22],
    mZehn: [38, 39, 40, 41, 42, 43, 44, 45],

    viertel: range(54, 67),
    dreiviertel: range(46, 67),
    vor: range(84, 89),
    nach: range(68, 75),
    halb: range(90, 97),
    uhr: range(201, 206),
    
    undEins: [0],
    undZwei: [0, 23],
    undDrei: [0, 23, 200],
    undVier: [0, 23, 200, 223]
}
