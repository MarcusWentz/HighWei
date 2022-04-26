# HighWei 🌉🚦🚚🚙🚗🛻🏎️🚓

Tollbooth with ultrasonic sensors and servo motors. Chainlink node scrapes and aggregates MTA transit fee data using Adapter.js.
Chainlink pricefeeds also used to remove need for ERC20 stablecoins. Chainlink Keepers can be used assuming large vehicles take over 15 seconds to fully cross path.

## MTA Price Data and Chainlink Adapter.js Price Aggregator:

💲MTA toll website being XPATH scraped (with Puppeteer https://www.npmjs.com/package/puppeteer) inside Chainlink Adapter.js oracle

⚖️ Aggregate 7 toll values and get the median: https://github.com/MarcusWentz/HighWei/blob/main/scripts/AggregateScrapeTollMTAwithAdapter.js 

🚚Trucks: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks
 
🚙Cars: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/cars

📹 Full Video Presentation: 🔴 Ultrasonic Video Demo: https://www.youtube.com/watch?v=8jDGe1ou2r0

🟦 Chainlink Keepers Log: https://keepers.chain.link/mumbai/1255

🕸️ Website hosted on 

IPFS/Filecoin (Fleek): https://highwei.on.fleek.co/

GitHub pages (source): https://marcuswentz.github.io/HighWei/


## Status: 👁️ 👁️

### 🟢 Backend: 🔨

✔️

### 🟢 Testing: 🚧
  
✔️

### 🟢Hardware: ⚙️

<img src="https://github.com/MarcusWentz/HighWei/blob/main/images/wiring.png" alt="Wiring"/>

-Raspberry Pi 4 🫐 🍓

-Ultrasonic sensor [Model: HC-SR04] (TRIGGER GPIO 18, ECHO GPIO 24)

-Servo motor [Model: SG90] (GPIO 22)

-1k and 2k ohm resistor (voltage divider for ultrasonics)

### 🟡 Frontend: 🪟 

🔴Reload site after Tx to update page elements [timer after hash created or await Tx confirmed]

🔴Update hardware address/ABI and test UI/UX with frontend

🔴Verify contract with Hardhat
https://mumbai.polygonscan.com/address/0xDA6a9bf11ab5d0F630F6c8417948B1B81E7Da94a

### 🟢 Presentation: 🎁
https://docs.google.com/presentation/d/1grKpwfnQWYyvnZJFkbXsvQHCDB3aD3WPl4F8A57xDPo/edit?usp=sharing
