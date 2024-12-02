# MetaMartian Extraction Contract
## About
Users can replace 4 Meta Martians to one new Celestial Martian.
MetaMartianNFT contract is already deployed on Polygon. Need to deploy CelestialNFT contract for new event 'MetaMartian Extraction'.
## Installation
```shell
$ yarn install
```
## Usage
### Build
```shell
$ yarn compile
$ npx hardhat compile
```
### Test
```shell
$ yarn test
$ npx hardhat Test
```

## Deploying contracts to Testnet (Public)

### Deploy CLI
```shell
$ yarn deploy [NETWORK_NAME]
$ npx hardhat run scripts/deploy.ts --network [NETWORK_NAME]
```

### Verify Contract
```shell
$ yarn verify [NETWORK_NAME] [CONTRACT_ADDRESS] [...CONSTRUCTOR_PARAMS]
$ npx hardhat verify --network [NETWORK_NAME] [CONTRACT_ADDRESS] [...CONSTRUCTOR_PARAMS]
```
### Environment variable

Create a `.env` using `.env.example` file.

- .env.example
```
INFURA_API_KEY = "INFURA_API_KEY"
PRIVATE_KEY = "YOUR_PRIVATE_KEY"
MNEMONIC = "YOUR MNEMONIC"
REPORT_GAS = true/false
```