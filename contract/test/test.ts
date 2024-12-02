import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { solidity } from 'ethereum-waffle'
import { expect } from "chai"
import hre, { ethers } from "hardhat"

import { MetaMartianNFT } from "../build/typechain/MetaMartianNFT"
import { CelestialNFT } from "../build/typechain/CelestialNFT"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

chai.use(solidity)
chai.use(chaiAsPromised)

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

describe ("Token Contract", () => {
  let mintedAmount = 0;
  let metaMartianAddress: string
  let metaMartianFactory
  let metaMartianContract : MetaMartianNFT
  let celestialFactory
  let celestialContract :CelestialNFT
  let owner: SignerWithAddress;
  let owner2: SignerWithAddress;
  let accountList: SignerWithAddress[];

  const loadTokenIdsFromMetaMartianContract = async (addr: string) => {
    let tokenIds:any = []
    let res = await metaMartianContract.functions.tokensOfOwner(addr)
    res[0].map(tokenId => {
      tokenIds.push(parseInt(tokenId.toString()))
    })  
    return tokenIds
  }

  const loadTokenIdsFromCelestialContract = async (addr: string) => {
    let tokenIds:any = []
    let res = await celestialContract.functions.tokensOfOwner(addr)
    res[0].map(tokenId => {
      tokenIds.push(parseInt(tokenId.toString()))
    })  
    return tokenIds
  }

  before(async () => {
    [owner, ...accountList] = await hre.ethers.getSigners();
    
    // Contract Deployment
    metaMartianFactory = await ethers.getContractFactory("MetaMartianNFT");
    metaMartianContract = await metaMartianFactory.deploy() as MetaMartianNFT
    await metaMartianContract.deployed()

    metaMartianAddress = metaMartianContract.address

    celestialFactory = await ethers.getContractFactory("CelestialNFT", owner);
    celestialContract = await celestialFactory.deploy(
      "CELESTIAL MARTIAN NFT",
      "CMN",
      "https://mmac-meta-martian.communitynftproject.io/",
      metaMartianAddress
    ) as CelestialNFT;
    await celestialContract.deployed();

    // Mint MetaMartianNFTs to accounts
    const amountAry = [4, 3, 5];
    console.log("Owner = ", owner.address);
    for(let i = 0;i<amountAry.length;i++)
    {
      console.log("Account", i+1)
      const accAddress = accountList[i].address;
      for(let j = 0;j<amountAry[i];j++) {
        await metaMartianContract.functions.mint(accAddress, mintedAmount)
        console.log(mintedAmount, " minted to ", accAddress)
        mintedAmount ++;
      }
    }
    console.log("Totally minted amount: ", mintedAmount)
  })

  describe("MetaMartianNFT", async() => {
    it("TotalSupply of MetaMartianNFT", async() => {
      const res = await metaMartianContract.functions.totalSupply();
      console.log("parseInt = ", parseInt(res.toString()));
      expect(parseInt(res.toString())).to.eq(12)
    })
    it("BalanceOf MetaMartianNFT", async() => {
      const res1 = await metaMartianContract.functions.balanceOf(accountList[0].address)
      expect(parseInt(res1.toString())).to.eq(4)
    })
  })

  describe("Celestial NFT", async() => {
    it("Should redeem if user has 4 MetaMartianNFTs, with account[0]", async () => {
      const accTokenIds = await loadTokenIdsFromMetaMartianContract(accountList[0].address)
      const contractTokenIds = await loadTokenIdsFromMetaMartianContract(celestialContract.address)
      console.log("Account[0] tokenIds:", accTokenIds)
      console.log("CelestialContract:", contractTokenIds)
      for(let i = 0;i<accTokenIds.length;i++)
        await metaMartianContract.connect(accountList[0]).approve(celestialContract.address, accTokenIds[i])
      await celestialContract.connect(accountList[0]).redeem(accTokenIds, 0)
      const updatedAccTokenIds = await loadTokenIdsFromMetaMartianContract(accountList[0].address)
      console.log("updatedAccTokenIds:", updatedAccTokenIds)
      const updatedTokenIds = await loadTokenIdsFromMetaMartianContract(celestialContract.address)
      console.log("CelestialContract tokenIds:", updatedTokenIds)
      const newTokenIds = await loadTokenIdsFromCelestialContract(accountList[0].address)
      console.log("Account[0] celestialTokenIds:", newTokenIds)
    })

    it("Should redeem if user has 4 MetaMartianNFTs, with account[2]", async () => {
      const accTokenIds = await loadTokenIdsFromMetaMartianContract(accountList[2].address)
      const contractTokenIds = await loadTokenIdsFromMetaMartianContract(celestialContract.address)
      console.log("Account[2] tokenIds:", accTokenIds)
      console.log("CelestialContract:", contractTokenIds)
      let redeemIds = []
      for(let i = 0;i< accTokenIds.length;i++){
        if(i<4) redeemIds.push(accTokenIds[i])
        await metaMartianContract.connect(accountList[2]).approve(celestialContract.address, accTokenIds[i])
      }
      await celestialContract.connect(accountList[2]).redeem(redeemIds, 1)
      const updatedAccTokenIds = await loadTokenIdsFromMetaMartianContract(accountList[2].address)
      console.log("updatedAccTokenIds:", updatedAccTokenIds)
      const updatedTokenIds = await loadTokenIdsFromMetaMartianContract(celestialContract.address)
      console.log("CelestialContract tokenIds:", updatedTokenIds)
      const newTokenIds = await loadTokenIdsFromCelestialContract(accountList[2].address)
      console.log("Account[2] celestialTokenIds:", newTokenIds)
    })

    it("Should withdraw if user has admin role", async () => {
      await celestialContract.withdraw(0);
      const contractTokenIds = await loadTokenIdsFromMetaMartianContract(celestialContract.address)
      console.log("CelestialContract tokenIds:", contractTokenIds)
    })

    it("Should not withdraw if user has admin role, but token id not exist", async () => {
      const revertedString = "TokenId not exist";
      await expect(celestialContract.withdraw(0)).to.revertedWith(revertedString);
      const updatedTokenIds = await loadTokenIdsFromMetaMartianContract(celestialContract.address)
      console.log("CelestialContract tokenIds:", updatedTokenIds)
    })

    it("Should not withdraw if user hasn't admin role", async () => {
      const revertedString = "AccessControl: account " + accountList[0].address.toLowerCase() + " is missing role " + "0x0000000000000000000000000000000000000000000000000000000000000000";
      await expect(celestialContract.connect(accountList[0]).withdraw(0)).to.revertedWith(revertedString);      
    })
  })
  
})