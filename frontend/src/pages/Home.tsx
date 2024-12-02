import { Flex, Spacer, Box, useCheckboxGroup } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import BurnPanel from "../components/BurnPanel";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import NFTItemList from "../components/NFTItemList";
import Footer from "../components/Footer";
import "./Home.css";
import { CHAIN_ID, CelestialMartianContractAddress } from "../config";
import { useEffect, useState } from "react";
import { useCelestialMartianContract, useMetaMartianContract } from "../utils/useContract";
import { 
    getMetaMartianNFTsByAccount,
    redeemCelestialNFT,
    setApprovalForAll
} from "../utils/callHelpers";
import { MartianMeta } from "../config/types";

const Home = () => {
    const { account } = useEthers();
    const metaMartianContract = useMetaMartianContract();
    const celestialContract = useCelestialMartianContract();

    const [ myItems, setMyItems ] = useState<Array<MartianMeta>>([]);
    const { value: selected, getCheckboxProps, onChange, setValue } = useCheckboxGroup();
    const [ selItems, setSelItems ] = useState<Array<MartianMeta>>([]);

    useEffect(() => {
        if(account) {
            console.log("Home: account = ", account);
            const loadInfo = async () => {
                const orgItems = await getMetaMartianNFTsByAccount(metaMartianContract, account);
                console.log("Items: ", orgItems);
                setMyItems(orgItems);
                setValue([]);
            }
            loadInfo();
        } else{
            console.log("Home: nothing");
            setMyItems([]);
        }
    }, [account]);

    const getUriFromInfo = (id:number): string => {
        for(let i = 0;i<myItems.length;i++){
            if(myItems[i].id === id) 
                return myItems[i].uri;
        }
        return '';
    }

    useEffect(() => {
        let list = [];
        for(let i = 0;i<selected.length;i++) {
            const id = parseInt(`${selected[i]}`);
            const uri = getUriFromInfo(id);
            list.push({
                id: id,
                uri: uri
            });
        }
        setSelItems(list);
    }, [selected]);

    const onExtractMartian = async () => {
        console.log("Home: onExractMartian()")
        if(account) {
            const resApproval = await setApprovalForAll(celestialContract, account, true);
            console.log("resApproval = ", resApproval);
            if(resApproval) {
                const res = await redeemCelestialNFT(celestialContract, account, selected);
                console.log("onExtractMartian.res = ", res);
            }
        }
    }

    return (
        <Flex direction="column">
            <Header />
            <Navbar
                contractAddress = {CelestialMartianContractAddress[CHAIN_ID]}
            />
            <Flex direction={["column-reverse", "row"]}>
                <Box
                    className="nft-images"
                    mt="50px"
                    flex="7"
                    height={[null, "500px"]}
                    overflowY={[null, "auto"]}
                >
                    <NFTItemList
                        items={myItems}
                        getCheckboxProps={getCheckboxProps}
                        onChange={onChange}
                        selectedCount={selected.length}
                    />
                </Box>
                <Spacer>
                    <Box 
                        height="100%"
                        width="2px"
                        bg="#35363a"
                        ml="3px"
                    ></Box>
                </Spacer>
                <Box
                    flex="4"
                >
                    <BurnPanel
                        items={selItems}
                        onExtractMartian={onExtractMartian}
                    />
                </Box>
            </Flex>
            <Footer />
        </Flex>
    )
}

export default Home;