# HighWei 🚦🚚🚙🚗🛻🏎️🚓

Tollbooth with ultrasonic sensors and servo motors. Chainlink node scrapes and aggregates MTA transit fee data using Adapter.js.
Chainlink pricefeeds also used to remove need for ERC20 stablecoins. Chainlink Keepers can be used assuming large vehicles take over 15 seconds to fully cross path.

MTA toll website being XPATH scraped with Chainlink Adapter.js oracle: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks

Ultrasonic demo: https://www.youtube.com/watch?v=8jDGe1ou2r0

## Next steps: 🔭

### Backend: 🔨

-Servo motor starting state and event listener in web.js (web.py does not support event listener without polling wasting API calls)

### Frontend: 🪟 

-Single page, lightweight site to access with Metamask

-Host page using IPFS/Filecoin on Fleek

### Testing: 🚧

-Hardhat Integration testing (100% Unit Solidity Coverage complete)

### Hardware: ⚙️

(wiring diagram coming soon)

-Raspberry Pi 4 🫐 🍓

-Ultrasonic sensor [Model: HC-SR04] (TRIGGER GPIO 18, ECHO GPIO 24)

-Servo motor [Model: SG90] (GPIO 22)

-1k and 2k ohm resistor (voltage divider for ultrasonics)
