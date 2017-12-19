# unsere-uhr

## W-Lan Verbindung konfigurieren
1. SD-Karte an einen Rechner stecken
2. Boot-Partition öffnen (geht auch unter Windows)
3. Die Datei ```wpa.txt``` bearbeiten
    * Ins Feld ```ssid``` den Netzwerknamen eintragen
    * Ins Feld ```psk``` das Passwort eintragen
4. Die Datei speichern und schließen
5. Die Datei ```wpa.txt``` kopieren und im selben Ordner als ```wpa_supplican.conf``` speichern
6. Hardware sicher entfernen ;)
7. Raspberry PI mit der Karte booten und Daumen drücken

PS: die Datei wpa_supplicant.conf wird bei jedem Bootvorgang wegkopiert, wenn es nicht geklappt hat also wieder mit der wpa.txt beginnen.

## Bei Zeitproblemen
* sudo raspi-config -> Localization -> Zeitzone -> Europa -> Berlin
* sudo apt install ntpdate
* Manuelles Update

## Bootscript
* rc.local bearbeite ```sudo nano /etc/rc.local```
* ```sudo /usr/local/bin/node /home/pi/unsere-uhr/app.js``` vor ```exit 0``` eintragen

