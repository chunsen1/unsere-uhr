const yargs = require('yargs'),
      S = require('./configuration/settings')

// range function
let range = (a, b) => Array.from(Array(b - a + 1), (x, i) => i + a) 

// scale function
const output_min = 1    // todo: move to settings or close to ws281x
const output_max = 100  // or: scale(x).from(min, max).to(1, 100) ... :)

let scale = x => {
    let y = output_min + (output_max - output_min) * (x - S.light.getMinimum()) / (S.light.getMaximum() - S.light.getMinimum())

    y = Math.max(output_min, y)
    y = Math.min(output_max, y)

    return y
}

// yargs
let argv = yargs
    .option('port', {
        alias: 'p',
        describe: 'Der Port für den http-Server',
        default: 8080,
        type: 'number'
    })
    .help()
    .example('$0 -p 1337')
    .completion()
    .epilogue('Mehr informationen gibt es auf https://github.com/chunsen1/unsere-uhr')
    .argv

module.exports = {
    range: range,
    scale: scale,
    argv: argv
}
