import { useEffect } from "react";
import { Button, Box, Text, useToast } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import { ellipseAddress } from "../utils";

type Props = {
    handleOpenModal: any;
}

const ConnectButton = ({ handleOpenModal }:Props) => {
    const toast = useToast();
    const { activateBrowserWallet, account, error } = useEthers();
    const etherBalance = useEtherBalance(account);

    useEffect(() => {
        if(error) {
            toast({
                description: "Connect to Polygon network!!!",
                position: "top-right",
                status: "error"
            })
            console.log("error: ", error);
        }
    }, [error, toast])

    const handleConnectWallet = () => {
        activateBrowserWallet();
    }

    return account ? (
        <Box
            display="flex"
            alignItems="center"
            background="gray.700"
            borderRadius="xl"
            py="0"
        >
            <Box px="3">
                <Text color="white" fontSize="md">
                    {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} MATIC    
                </Text>
            </Box>
            <Button
                onClick={handleOpenModal}
                bg="gray.800"
                border="1px solid transparent"
                _hover={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "blue.400",
                    backgroundColor: "gray.700"
                }}
                borderRadius="xl"
                m="1px"
                px={3}
                height="38px"
            >
                <Text color="white" fontSize="md" fontWeight="medium" mr="2">
                    {account && ellipseAddress(account)}
                </Text>
                <Identicon />
            </Button>
        </Box>
    ) : (
        <Button 
            color="black"
            onClick={handleConnectWallet}
        >Connect to a wallet</Button>
    );
}

export default ConnectButton;