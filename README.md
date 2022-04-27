# HighWei 🌉🚦🚚🚙🚗🛻🏎️🚓

Tollbooth with ultrasonic sensors and servo motors. Chainlink node scrapes and aggregates MTA transit fee data using Adapter.js.
Chainlink pricefeeds also used to remove need for ERC20 stablecoins. Chainlink Keepers can be used assuming large vehicles take over 15 seconds to fully cross path.

## MTA Price Data and Chainlink Adapter.js Price Aggregator:

💲MTA toll website being XPATH scraped (with Puppeteer https://www.npmjs.com/package/puppeteer) inside Chainlink Adapter.js oracle

⚖️ Aggregate 7 toll values and get the median: https://github.com/MarcusWentz/HighWei/blob/main/scripts/AggregateScrapeTollMTAwithAdapter.js 

🚚Trucks: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks
 
🚙Cars: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/cars

📹 Full Video Presentation: https://www.youtube.com/watch?v=7Tz0TTNr4fM

🎁 Presentation slides: https://docs.google.com/presentation/d/1grKpwfnQWYyvnZJFkbXsvQHCDB3aD3WPl4F8A57xDPo/edit?usp=sharing

🟦 Chainlink Keepers Log: https://keepers.chain.link/mumbai/1255

🕸️ Website hosted on 

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

    cd pi-blaster
    sudo ./pi-blaster

Or automate commands by inserting and writing inside shell with CMD:

    vim .bashrc

