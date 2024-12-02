import MetaMartianAbi from "../config/abis/MetaMartianNFT.json";
import CelestialMartianAbi from "../config/abis/CelestialNFT.json";
import { useWeb3 } from "./useWeb3";
import { CelestialMartianContractAddress, CHAIN_ID, MetaMartianContractAddress } from "../config";

export const useContract = (abi: any, address: any) => {
    const web3 = useWeb3();
    return new web3.eth.Contract(abi, address);
}

export const useMetaMartianContract = () => {
    return useContract(MetaMartianAbi, MetaMartianContractAddress[CHAIN_ID]);
}

export const useCelestialMartianContract = () => {
    return useContract(CelestialMartianAbi, CelestialMartianContractAddress[CHAIN_ID]);
}