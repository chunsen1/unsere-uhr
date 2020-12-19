const later = require('later')
      clock = require('./app/clock'),
      settings = require('./app/configuration/settings'),
      server = require('./app/http/server')

// schedule the clock
let schedule = later.parse.text('every 1 seconds')
later.setInterval(clock, schedule)

// start the http server
server.startServer()
