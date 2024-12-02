import Web3 from "web3";
import { CHAIN_ID, RpcUrl } from "../config";

export const useWeb3 = () => {
    return new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(RpcUrl[CHAIN_ID]));
}