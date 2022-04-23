# HighWei

Tollbooth with ultrasonic sensors and servo motors. Chainlink node scrapes MTA transit fee data using Adapter.js.
Chainlink pricefeeds also used to remove need for ERC20 stablecoins. Chainlink Keepers can be used assuming large vehicles take over 15 seconds to fully cross path.

MTA toll website being XPATH scraped with Chainlink Adapter.js oracle: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks

Next steps: 

Backend:

-Servo motor either written in web3.js (having trouble reinstalling) or write in Python (see if you can subscribe without polling API calls with events like web3.js)

Frontend: 

-Single page, lightweight site to access with Metamask

-Host page using IPFS/Filecoin on Fleek

Bonus:

-Hardhat Unit/Integration testing

Hardware: (wiring diagram coming soon)

-Raspberry Pi 4

-Ultrasonic sensor [Model: HC-SR04] (TRIGGER GPIO 18, ECHO GPIO 24)

-Servo motor [Model: SG90] (GPIO 22)

-1k and 2k ohm resistor (voltage divider for ultrasonics)
