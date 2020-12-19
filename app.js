#!/usr/bin/env node

const later = require('later')
const isRoot = require('is-root')
const clock = require('./app/clock')
const server = require('./app/http/server')

if (isRoot()) {
    // schedule the clock
    let schedule = later.parse.text('every 1 seconds')
    later.setInterval(clock, schedule)

    // start the http server
    server.startServer()
} else {
    console.log('The LED-API needs root access, try using sudo.')
}
