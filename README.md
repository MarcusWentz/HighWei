# HighWei 🚦🚚🚙🚗🛻🏎️🚓

Tollbooth with ultrasonic sensors and servo motors. Chainlink node scrapes and aggregates MTA transit fee data using Adapter.js.
Chainlink pricefeeds also used to remove need for ERC20 stablecoins. Chainlink Keepers can be used assuming large vehicles take over 15 seconds to fully cross path.

## MTA Price Data and Chainlink Adapter.js Price Aggregator:

💲MTA toll website being XPATH scraped (with Puppeteer https://www.npmjs.com/package/puppeteer) inside Chainlink Adapter.js oracle

⚖️ 7 unique values with the median taken to aggregate prices: 

🚚Trucks: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks
 
🚙Cars: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/cars

📹 Full Video Presentation: 🔴 Ultrasonic Video Demo: https://www.youtube.com/watch?v=8jDGe1ou2r0

🟦 Chainlink Keepers Log: https://keepers.chain.link/mumbai/1255

🕸️ Website hosted on 

GitHub pages: 🟢 https://marcuswentz.github.io/HighWei/
IPFS/Filecoin with Fleek: 🔴  https://marcuswentz.github.io/HighWei/ 

## Status: 👁️ 👁️

### 🟢 Backend: 🔨

✔️

### 🟢 Testing: 🚧
  
✔️

### 🟡Hardware: ⚙️

-🔴GPIO wiring diagram with ultrasonic/servo

-Raspberry Pi 4 🫐 🍓

-Ultrasonic sensor [Model: HC-SR04] (TRIGGER GPIO 18, ECHO GPIO 24)

-Servo motor [Model: SG90] (GPIO 22)

-1k and 2k ohm resistor (voltage divider for ultrasonics)

### 🟡 Frontend: 🪟 

🟢Draft Template Layout Complete

🟢Template hosted on GitHub Pages: https://marcuswentz.github.io/HighWei/

🟢Connect with Metamask web3 provider on Mumbai Chain ID: 80001

🟢web3.js GET values [events on Infura provider might not work for Mumbai yet due to lack of WSS]

🔴Connect DOM elements to console.log GET values

🔴web3.js SET buttons

🔴Host page using IPFS/Filecoin on Fleek

🔴Verify contract with Hardhat
https://mumbai.polygonscan.com/address/0xDA6a9bf11ab5d0F630F6c8417948B1B81E7Da94a
