const settings = require('../../configuration/settings')

function ctn(r, g, b) {
    return (r << 16) + (g << 8) + (b)
}
  
function ntc(number) {
    const r = (number & 0xff0000) >> 16
    const g = (number & 0x00ff00) >> 8
    const b = (number & 0x0000ff)
    
    return [r, g, b]
}

let getColor = (req, res) => res.status(200).json([...settings.color.getAll()].map(x => {
    [g, r, b] = ntc(x)
    return ctn(r, g, b)
}))

let setColor = (req, res) => {
    if (req.body) {
        let success = settings.color.setAll(req.body.map(x => {
            [r, g, b] = ntc(x)
            return ctn(g, r, b)
        }))
        settings.trySaveConfig()
        res.status(success ? 200 : 400).json({ success: success })
    } else {
        res.status(400).json({ success: false })
    }
}

module.exports = {
    getColor: getColor,
    setColor: setColor
}
