const ws281x = require('./ws281x-native-mock')
const LED_COUNT = 164

ws281x.init(LED_COUNT)

let pixels = new Uint32Array(LED_COUNT)
let getColour = () => 0xffffff

let lightLeds = (indices) => {
    indices.forEach(x => pixels[x] = getColour());
}

let clearLeds = () => {
    for (var i = 0; i < pixels.length; i += 1) {
        pixels[i] = 0
    }
}

let render = () => {
    ws281x.render(pixels)
}

let esIst = [0, 1, 2, 3, 4],
    eins = [5, 6, 7, 8],
    ein = [5, 6, 7],
    zwei = [9, 10, 11, 12, 14, 15],
    drei = [29, 20, 21, 22, 24, 25],
    vier = [39, 30, 31, 32, 34, 35],
    fuenf = [49, 40, 41, 42, 44, 45],
    sechs = [59, 50, 51, 52, 54, 55],
    sieben = [69, 60, 61, 62, 64, 65],
    acht = [79, 70, 71, 72, 74, 75],
    neun = [89, 80, 81, 82, 84, 85],
    zehn = [99, 90, 91, 92, 94, 95],
    elf = [109, 100, 101, 102, 104, 105],
    zwoelf = [119, 110, 111, 112, 114, 115],
    mZwanzig = [129, 120, 121, 122, 124, 125],
    mFuenf = [139, 130, 131, 132, 134, 135],
    mZehn = [149, 140, 141, 142, 144, 145],
    viertel = [159, 150, 151, 152, 154, 155],
    vor = [9, 10, 11, 12, 14, 15],
    nach = [9, 10, 11, 12, 14, 15],
    halb = [9, 10, 11, 12, 14, 15],
    uhr = [9, 10, 11, 12, 14, 15],
    und = [9, 10, 11, 12, 14, 15],
    
    undEins = [9],
    undZwei = [9, 10],
    undDrei = [9, 10, 11],
    undVier = [9, 10, 11, 12]

module.exports = {
    esIst: () => lightLeds(esIst),
    eins: () => lightLeds(eins),
    zwei: () => lightLeds(zwei),
    drei: () => lightLeds(drei),
    vier: () => lightLeds(vier),
    fuenf: () => lightLeds(fuenf),
    sechs: () => lightLeds(sechs),
    sieben: () => lightLeds(sieben),
    acht: () => lightLeds(acht),
    neun: () => lightLeds(neun),
    zehn: () => lightLeds(zehn),
    elf: () => lightLeds(elf),
    zwoelf: () => lightLeds(zwoelf),

    clear: () => clearLeds(),
    render: () => render()
}