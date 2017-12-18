# unsere-uhr


## Bei Zeitproblemen
* sudo raspi-config -> Localization -> Zeitzone -> Europa -> Berlin
* sudo apt install ntpdate
* Manuelles Update

## Bootscript
* rc.local bearbeite ```sudo nano /etc/rc.local```
* ```sudo /usr/local/bin/node /home/pi/unsere-uhr/app.js``` vor ```exit 0``` eintragen

