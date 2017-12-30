var mcpadc = require('mcp-spi-adc')

var tempSensor = mcpadc.open(0, {speedHz: 1350000}, e => {
  if (e) {
	console.log(e)
	return;
  }

  setInterval(() => {
    tempSensor.read((err, reading) => {
      if (err) throw err;

      //console.log((reading.value * 3.3 - 0.5) * 100)
      console.log(reading.value)
    })
  }, 1000)
})

