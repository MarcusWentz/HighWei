# HighWei 🌉🚦🚚🚙🚗🛻🏎️🚓

Tollbooth smart contract with ultrasonic sensors and servo motors. Chainlink node scrapes,filters,scales and aggregates MTA toll fee data with Adapter.js. Chainlink pricefeeds remove need for ERC20 payments. Chainlink Keepers used to close gate [servo] 15 seconds after opened. Ultrasonic sensor sends closeServoGate() Tx with web3.py when distance under 30cm AND gate open.

<img src="https://github.com/MarcusWentz/HighWei/blob/main/images/overview.png" alt="Overview"/>

## MTA Price Data and Chainlink Adapter.js Price Aggregator:

💲MTA toll website being XPATH scraped (with Puppeteer https://www.npmjs.com/package/puppeteer) inside Chainlink Adapter.js oracle

⚖️ Aggregate 7 toll values and get the median: https://github.com/MarcusWentz/HighWei/blob/main/scripts/AggregateScrapeTollMTAwithAdapter.js 

🚚Trucks: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks
 
🚙Cars: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/cars

📹 Video Presentation: https://www.youtube.com/watch?v=jvCM2UdRnPQ

🎁 Presentation slides: https://docs.google.com/presentation/d/1grKpwfnQWYyvnZJFkbXsvQHCDB3aD3WPl4F8A57xDPo/edit?usp=sharing

💬 Presentation script: https://docs.google.com/document/d/1xou47e2uuRkUaCJxHnUU8RqjhUjnS7SlTPMjKBxHsyo/edit?usp=sharing

🚧 Verified in Hardhat using commands: 
```
npx hardhat clean
npx hardhat verify --network <network_name> <contract_address>
```

📬 IPFS Storage CID (bafybeigvfcksysrsazvghy3l3wvpho4mzacyi7ty7mwidexoacp4nplwba) logic for Adapter.js request with Fleek:

Original storage storage URL (Fleek): https://storageapi.fleek.co/marcuswentz-team-bucket/webScrapeMTAChainlinkRequest.js

🕸️ Website:

IPFS/Filecoin (Fleek): https://highwei.on.fleek.co/

GitHub pages (source): https://marcuswentz.github.io/HighWei/

## Hardware: ⚙️

<img src="https://github.com/MarcusWentz/HighWei/blob/main/images/wiring2.png" alt="Wiring"/>

-Raspberry Pi 4 🫐 🍓

-Ultrasonic sensor [Model: HC-SR04] (TRIGGER GPIO 18, ECHO GPIO 24)

-1k and 2k ohm resisors for ultrasonic pin voltage protection

-Servo motor [Model: SG90] (GPIO 22) 

Note: web3.py does not have easy WSS event reading access like web3.js yet.
Therefore, we use web3.js and pi-blaster.js for reading and controlling servo state events.

[pi-blaster.js: build from source https://github.com/sarfata/pi-blaster then install https://github.com/sarfata/pi-blaster.js/]

⚠️ Run the following CMD commands if your servo motor locks up with pi-blaster.js ⚠️
```
cd pi-blaster
sudo ./pi-blaster
```
Or automate commands by inserting and writing inside shell with CMD:
```
vim .bashrc
```
