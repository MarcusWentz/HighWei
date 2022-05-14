# HighWei 🌉🚦🚚🚙🚗🛻🏎️🚓

Tollbooth smart contract with ultrasonic sensors and servo motors. Chainlink node scrapes,filters,scales and aggregates MTA toll fee data with Adapter.js. Chainlink pricefeeds remove need for ERC20 payments. Chainlink Keepers used to close gate [servo] 15 seconds after opened. Ultrasonic sensor sends closeServoGate() Tx with web3.py when distance under 30cm AND gate open.

## MTA Price Data and Chainlink Adapter.js Price Aggregator:

💲MTA toll website being XPATH scraped (with Puppeteer https://www.npmjs.com/package/puppeteer) inside Chainlink Adapter.js oracle

⚖️ Aggregate 7 toll values and get the median: https://github.com/MarcusWentz/HighWei/blob/main/scripts/AggregateScrapeTollMTAwithAdapter.js 

🚚Trucks: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks
 
🚙Cars: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/cars

📹 Video Presentation: https://www.youtube.com/watch?v=jvCM2UdRnPQ

🎁 Presentation slides: https://docs.google.com/presentation/d/1grKpwfnQWYyvnZJFkbXsvQHCDB3aD3WPl4F8A57xDPo/edit?usp=sharing

💬 Presentation script: https://docs.google.com/document/d/1xou47e2uuRkUaCJxHnUU8RqjhUjnS7SlTPMjKBxHsyo/edit?usp=sharing

🔭 Verified contract on Etherscan [pick one compiler version in contract to avoid potential issue with bytecode differences]: https://mumbai.polygonscan.com/address/0x18d5112c6602e5a4badfe75da4ec223379ea2404#code

🚧 Verified in Hardhat using commands: 

      npx hardhat clean
      npx hardhat verify --network mumbai 0x18d5112C6602E5a4bAdFe75dA4ec223379EA2404

🟦 Chainlink Keepers Log: https://keepers.chain.link/mumbai/1332

🕸️ Data hosting:

Website:

IPFS/Filecoin (Fleek): https://highwei.on.fleek.co/

GitHub pages (source): https://marcuswentz.github.io/HighWei/

IPFS Storage CID (bafybeigvfcksysrsazvghy3l3wvpho4mzacyi7ty7mwidexoacp4nplwba) logic for Adapter.js request 

⚠️ Do not wrap quotes around the Javascript code for IPFS storage file, use raw code ⚠️

https://storageapi.fleek.co/marcuswentz-team-bucket/webScrapeMTAChainlinkRequest.js

CID Logic Updates Custom Adapter.js Contract: https://mumbai.polygonscan.com/address/0x1f421dB9C6A1F8B0f48AfDCDd9031e5EA9593E50#code

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

    cd pi-blaster
    sudo ./pi-blaster

Or automate commands by inserting and writing inside shell with CMD:

    vim .bashrc

