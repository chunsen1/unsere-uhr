// log function
const log = (msg) => console.log(`[ws281x-mock] ${msg}`)

// variables
let brightness = null,
    callbacks = {
        init: null,
        setBrightness: null,
        render: null,
        reset: null
    }

// exports
module.exports = {
    init: (count) => {
        log(`init with ${count} leds`)
        if (callbacks.init) {
            callbacks.init(count)
        }
    },
    setBrightness: (newValue) => {
        if (newValue !== brightness) {
            log(`changing brightness from ${brightness} to ${newValue}`)
            brightness = newValue

            if (callbacks.setBrightness) {
                callbacks.setBrightness(newValue)
            }
        }
    },
    render: (p) => {
        log(`setting values for ${p.filter(x => x > 0).length} LEDs`)

        if (callbacks.render) {
            callbacks.render(p, p.filter(x => x > 0).length)
        }
    },
    reset: () => {
        log("RESET!")
        
        if (callbacks.reset) {
            callbacks.reset()
        }
    },
    setCallbacks: (cb) => callbacks = cb
}