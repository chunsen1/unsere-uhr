const ws281x = require('rpi-ws281x-native')
const light = require('./light')
const settings = require('../configuration/settings')
const LED_COUNT = require('../configuration/led-layout').getLedCount()

// reset LEDs on exit
process.on('SIGINT', () => {
    ws281x.reset()
    process.nextTick(() => process.exit(0))
})

// initialize the LED strip
ws281x.init(LED_COUNT)

// initialize status array
let pixels = new Uint32Array(LED_COUNT)

let lightLeds = (indices) => {
    indices
	    .filter(x => !!x)
        .reduce((acc, cur) => cur.concat(acc), [])
        .forEach(x => pixels[x] = settings.color.get(x))
}

let clearLeds = () => {
    for (var i = 0; i < pixels.length; i += 1) {
        pixels[i] = 0
    }
}

let render = () => {
    ws281x.setBrightness(light.getBrightness())
    ws281x.render(pixels)
}

module.exports = {
    lightleds: (data) => lightLeds(data),
    clear: () => clearLeds(),
    render: () => render()
}
