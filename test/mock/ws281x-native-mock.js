const log = (msg) => console.log(`[ws281x-mock] ${msg}`)
let brightness = null

module.exports = {
    init: (count) => log(`init with ${count} leds`),
    setBrightness: (newValue) => {
        if (newValue !== brightness) {
            log(`changing brightness from ${brightness} to ${newValue}`)
            brightness = newValue
        }
    },
    render: (p) => log(`setting values for ${p.filter(x => x > 0).length} LEDs`),
    reset: () => log("RESET!")
}