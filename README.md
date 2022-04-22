# HighWei

Concept:
Tollbooth smart contract with ultrasonic sensors and servo motors. Chainlink node scrapes MTA transit fee data using Adapter.js.
Chainlink pricefeeds also used to remove need for ERC20 stablecoins. Chainlink Keepers can be used assuming large vehicles take over 15 seconds to fully cross path.

Next steps: 
Backend:
-Adatper.js data in contract
-Test ultrasonics with Node.js/Web3 communication
-Chainlink MATIC pricefeed scale on Polygon
-Chainlink Keepers feature if you don't want to use ultrasonics [risk, variance in travel time]

Frontend: 
-Single page, lightweight site to access with Metamask
