# HighWei

Tollbooth with ultrasonic sensors and servo motors. Chainlink node scrapes MTA transit fee data using Adapter.js.
Chainlink pricefeeds also used to remove need for ERC20 stablecoins. Chainlink Keepers can be used assuming large vehicles take over 15 seconds to fully cross path.

MTA toll website being XPATH scraped with Chainlink Adapter.js oracle: https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks

Next steps: 

Backend:

-Test ultrasonics with Node.js/Web3 communication

-Chainlink Keepers feature if you don't want to use ultrasonics [risk, variance in travel time]

-Save gas with packing storage slots

Frontend: 

-Single page, lightweight site to access with Metamask

-Host page using IPFS/Filecoin on Fleek
