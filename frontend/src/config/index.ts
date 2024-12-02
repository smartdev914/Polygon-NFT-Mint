import { ChainId } from "@usedapp/core";
/* export enum ChainId {
    Mumbai = 80001,
    Mainnet = 137
} */

export const CHAIN_ID = ChainId.Mumbai;

export const RpcUrl = {
    80001: 'https://matic-mumbai.chainstacklabs.com',
    137: 'https://rpc-mainnet.matic.network'
}

export const ExplorerUrl = {
    80001: 'https://mumbai.polygonscan.com',
    137: 'https://polygonscan.com'
}

export const MetaMartianContractAddress = {
    80001: "0x2afc08b10628cD4d51523d5A50E63311C9cbB7B7",
    137: ""
}

export const CelestialMartianContractAddress = {
    80001: "0x841cC9051D716FEeEC511EEdE9F348da1E3A6ED4",
    137: ""
}

export const MetaMartianIPFS = "https://ipfs.io//ipfs//QmYmSSQMHaKBByB3PcZeTWesBbp3QYJswMFZYdXs1H3rgA/";
export const CelestialIPFS = "https://ipfs.io//QmYmSSQMHaKBByB3PcZeTWesBbp3QYJswMFZYdXs1H3rgA/";