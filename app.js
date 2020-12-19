#!/usr/bin/env node

const isRoot = require('is-root')

if (isRoot()) {
    const later = require('later')
    const clock = require('./app/clock')
    const server = require('./app/http/server')

    // schedule the clock
    let schedule = later.parse.text('every 1 seconds')
    later.setInterval(clock, schedule)

    // start the http server
    server.startServer()
} else {
    console.log('The LED-API needs root access, try using sudo.')
    return;
}
