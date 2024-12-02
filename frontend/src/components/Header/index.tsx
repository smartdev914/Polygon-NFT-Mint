import { Flex,Spacer, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import ConnectButton from "../ConnectButton";
import AccountModal from "../AccountModal";

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <Flex
            direction={["column", "row"]}
            color="white"
            mt="5"
        >
            <Flex
                p="4"
                alignItems="center"
                justifyContent="center"
            >
                <img src="assets/img/logo.png" alt="logo"/>
                <Text fontSize='2xl' ml="3">META MARS</Text>
            </Flex>
            <Spacer />
            <Flex
                p="4"
                alignItems="center"
                justifyContent="center"
            >
                <ConnectButton handleOpenModal={onOpen} />
                <AccountModal isOpen={isOpen} onClose={onClose} />
            </Flex>
        </Flex>
    )
}

export default Header;