const yargs = require('yargs')

module.exports = yargs
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