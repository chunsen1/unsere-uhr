const ipc = require('node-ipc')

ipc.config.id = 'unsere-uhr-proc-test';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.serve(() => ipc.server.on('set-config', message => console.log(message)))

ipc.server.start()