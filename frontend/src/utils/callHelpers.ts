import { 
    CelestialMartianContractAddress,
    CHAIN_ID,
    MetaMartianIPFS
} from "../config";

export const getMetaMartianNFTsByAccount = async (contract: any, account: string) => {
    const resIds = await contract.methods.tokensOfOwner(account).call();
    const items = [];
    for(let i = 0;i<resIds.length;i++){
        const resUri = await contract.methods.tokenURI(resIds[i]).call();
        /* 
        const res = await fetch( resUri, { method: 'Get' });
        const resJson = await res.json();
        console.log("res: ", resJson);
        */
        items.push({
            name: "Meta Martian",
            id: parseInt(resIds[i]),
            uri: `${MetaMartianIPFS}/${parseInt(resIds[i])+1}.png`
        })
    }
    return items;
}

export const setApprovalForAll = async (contract:any, account: string, approved: boolean) => {
    const res = await contract.methods.setApprovalForAll(CelestialMartianContractAddress[CHAIN_ID], approved).send({
        from: account
    });
    return res;
}

export const redeemCelestialNFT = async (contract: any, account: string, tokenIds: any) => {
    const resTotal = await contract.methods.totalSupply().call();
    const resRedeem = await contract.methods.redeem(tokenIds, resTotal).send({
        from: account
    });
    console.log("resRedeem = ", resRedeem);
    return resRedeem;
}