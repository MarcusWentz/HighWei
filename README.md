# HighWei

Tollbooth with ultrasonic sensors and servo motors. Chainlink node scrapes MTA transit fee data using Adapter.js.
Chainlink pricefeeds also used to remove need for ERC20 stablecoins. Chainlink Keepers can be used assuming large vehicles take over 15 seconds to fully cross path.

MTA toll website being XPATH scraped with Chainlink Adapter.js oracle: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks

Next steps: 

Backend:

-Ultrasonics reading sensor data in python https://tutorials-raspberrypi.com/raspberry-pi-ultrasonic-sensor-hc-sr04/ but not with Node.js/Web3 communication https://www.npmjs.com/package/raspi-hc-sr04 or https://www.npmjs.com/package/pigpio . Might consider sending Tx in web3.py for this part if this continues.

-Save gas with packing storage slots

Frontend: 

-Single page, lightweight site to access with Metamask

-Host page using IPFS/Filecoin on Fleek

Hardware: (wiring diagram coming soon)

-Raspberry Pi 4

-Ultrasonic sensor [Model: HC-SR04] (TRIGGER GPIO 18, ECHO GPIO 24)

-Servo motor [Model: SG90] (GPIO 22)

-1k and 2k ohm resistor (voltage divider for ultrasonics)
