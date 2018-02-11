const settings = require('../../../utils/settings')

let getColor = (req, res) => res.status(200).json(settings.color.getAll())

let setColor = (req, res) => {
    if (req.body) {
        let success = settings.color.setAll(req.body)
        res.status(success ? 200 : 400).json({ success: success })
    } else {
        res.status(400).json({ success: false })
    }
}

module.exports = {
    getColor: getColor,
    setColor: setColor
}
