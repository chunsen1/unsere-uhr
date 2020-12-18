const settings = require('../../configuration/settings')

function getSchedule(req, res) {
    res.status(200).json(settings.schedule)
}

function validateTime(time) {
    return !!time 
        && Number.isInteger(time.h)
        && Number.isInteger(time.m)
        && Number.isInteger(time.s)
        && time.h >= 0
        && time.h <= 24
        && time.m >= 0
        && time.m < 60
        && time.s >= 0
        && time.s < 60
}

function validateContent(content) {
    return !!content
        && Array.isArray(content)
        && content.length > 0
        && content.every(item => {
            return !!item 
                && Number.isInteger(item.startDay)
                && Number.isInteger(item.endDay)
                && validateTime(item.startTime)
                && validateTime(item.endTime)
        })
}

function setSchedule(req, res) {
    if (req && req.body && validateContent(req.body)) {
        settings.schedule = req.body
        res.status(200).json({
            success: true
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'The request did not contain any content or the content could not be parsed.'
        })
    }
}

module.exports = {
    getSchedule, setSchedule
}
