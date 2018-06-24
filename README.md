# Ethlantis
Trustless Esports Betting Platform

## Dependencies/Applications used:
  * Truffle
  * Ganache
  * npm
  * Metamask
   
## Get it up and running:
  - Clone the repository
  - npm install
  - Open ganache. On settings, change port number to 7545
  - Run script truffle migrate
  - Run script npm run start
  - Open webapp, use metamask extension with the network set to 127.0.0.1:7545 
  - Sign in to metamask with pnemonic given from ganache.
  - To populate the contract with matches, go to localhost:3000/admin
  
## Folder Structure
 This project uses the Fractal Pattern for ReactJS. Read more about the pattern here 
 https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af
  
## Scripts:
  - npm run start // start the local development
  - truffle test  // run tests with mochajs
