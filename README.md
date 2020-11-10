# unsere-uhr

## Bauteile

### Elektronik

* 12 VLLV Steckernetzteil
* Steckdose für Netzteil
* ~10A DCDC von 12V auf 5V Wandler
* LED-Licherkette (60 RGB LED Strip mit WS2812B 5050 SMD)
* Raspberry Pi Nano v3 mit WLAN
* 16 GB SD-Karte
* 50-100k Ohm Lichtsensor
* 1M Ohm Widerstände
* Litzen, Kabel
* AD-Wandler MCP-3008
* verschiedene Elektronik (@Sven, @Christian A.)

### Gehäuse

* Stahlfrontplatte
  * Außenmaß: 50cm
  * Abstand Eck-LEDs zueinander: 45cm
* Holz (Rahmen, Rückwand, Abtrennung) oder https://www.ikea.com/de/de/p/ribba-rahmen-weiss-20378440/
  * Gehäuse Außenmaß: 49cm
  * Innenmaß: 45,5cm
* Winkel für Wandbefestigung
* Montagekleber
* Magnete (supermagnete.de S-10-20-N Stabmagnet Ø 10 mm, Höhe 20 mm, Neodym, N45, vernickelt)
* Ballistol, um den Rost zu stoppen https://www.amazon.de/dp/B005VCNC52/ref=cm_sw_r_wa_awdo_t1_I.boAbRNR6019

## Uhr installieren

* Raspberry Pi OS (previously called Raspbian) [herunterladen](https://www.raspberrypi.org/downloads/raspberry-pi-os/)
* Mit Tool wie Etcher SD-Karte oder [Raspberry Pi Imager](https://www.raspberrypi.org/downloads/) flashen
* W-Lan Verbindung konfigurieren
* SSH aktivieren (auf der SD-Speicherkarte in der Boot-Partition eine leere Datei mit dem Namen "ssh" erstellen)
* Raspbian aktualisieren 
* Helligkeitssensor aktivieren
* Uhr-Git-Projekt installieren
* Bootscript einfügen

__Alternativ__  
* fertig konfiguriertes Image mit [Win32DiskImager](https://www.heise.de/download/product/win32-disk-imager-92033) flashen
* WLAN-Verbindung anpassen (s. u.)

### W-Lan Verbindung konfigurieren
1. SD-Karte an einen Rechner stecken
2. Boot-Partition öffnen (geht auch unter Windows)
3. Die Datei ```wpa.txt``` bearbeiten
    * Ins Feld ```ssid``` den Netzwerknamen eintragen
    * Ins Feld ```psk``` das Passwort eintragen
4. Die Datei speichern und schließen
5. Die Datei ```wpa.txt``` kopieren und im selben Ordner als ```wpa_supplicant.conf``` speichern
6. Hardware sicher entfernen ;)
7. Raspberry PI mit der Karte booten und Daumen drücken

PS: die Datei wpa_supplicant.conf wird bei jedem Bootvorgang wegkopiert, wenn es nicht geklappt hat also wieder mit der wpa.txt beginnen.

**Falls Fehler auftreten**
* Eine Fehlerquelle liegt darin, dass Windows Dateiendungen ausblendet. Stellt sicher, dass die Datei ```wpa_supplicant.conf``` und nicht ```wpa_supplicant.conf.txt``` heißt
* Eine weitere Fehlerquelle könnt ihr vermeiden, wenn ihr die Datei nicht mit Notepad sondern mit Notepad++ oder ähnlichen Tools bearbeitet. Stellt hier sicher, dass ihr die Datei mit folgenden Eigenschaften speichert:
    * UTF-8 als Encoding
    * Keine Byte Order Mark (BOM)
    * UNIX Zeilenenden
* WPA2 Netzwerke benötigen ggfs. weitere Einstellungen. Verwendet in diesem Fall bitte [diese Datei](documentation/etc/wpa_supplicant.conf2) und speichert sie als ```wpa_supplicant.conf```

### Update
```sudo raspi-config```  
-> 8 Update

### Passwort ändern
```sudo raspi-config```  
Dann im Menü den Befehl "Passwort ändern" auswählen

### Hostname ändern
```sudo raspi-config```  
-> 1 System options  
-> S4 Hostname " wortuhrpi"

### Helligkeitssensor aktivieren
```sudo raspi-config```  
-> 3 Interface Options
-> P4 SPI aktivieren

```
sudo nano /boot/config.txt
```
/boot/config.txt -> "dtparam=audio=on" -> Auskommentieren "# dtparam=audio=on"

### Raspbian aktualisieren

```bash
sudo apt update
sudo apt upgrade
sudo reboot
```

### Uhr-Git-Projekt installieren

```bash
sudo apt install git
wget https://nodejs.org/dist/v8.9.3/node-v8.9.3-linux-armv6l.tar.xz
tar -xf node-*
sudo cp -R node-*/* /usr/local
export PATH=$PATH:/usr/local/bin


git clone https://github.com/chunsen1/unsere-uhr.git
cd unsere-uhr
npm install
```

### Bootscript einfügen

> Diese Prozedur sollten wir mit [PM2](https://github.com/Unitech/pm2) vereinfachen, da die jetzige Variante nicht zuverlässig funktioniert.

rc.local bearbeiten:

```bash
sudo nano /etc/rc.local
```

Folgendes in diese Datei eintragen (als Zeile vor ```exit 0```)

> ```sudo /usr/local/bin/node /home/pi/unsere-uhr/app.js```

### Bei Zeitproblemen
* sudo raspi-config -> Localization -> Zeitzone -> Europa -> Berlin
* sudo apt install ntpdate
* Manuelles Update

## Uhr Updaten

### Software aktualisieren

1. SSH-Verbindung zur Uhr aufbauen
2. ```cd unsere-uhr```
3. ```git fetch --all --tags```
3. ```git checkout tags/v0.2```
4. ```npm install```
4. ```sudo reboot now```

### Sonstige Software updaten

1. Per SSH verbinden
2. ```sudo apt update```
3. ```sudo apt upgrade```
4. ```sudo npm i -g npm```
5. ```sudo reboot now```
