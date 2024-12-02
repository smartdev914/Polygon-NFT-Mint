import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Text, Link } from "@chakra-ui/react";
import { CHAIN_ID, ExplorerUrl } from "../../config";
import { ellipseAddress } from "../../utils";

type Props = {
    contractAddress : string
}

const Navbar = ({contractAddress}:Props) => {
    return (
        <Flex direction="column" mb="10">
            <Link 
                width={"150px"}
                mb="2"
                href={`${ExplorerUrl[CHAIN_ID]}/address/${contractAddress}`}
                isExternal
            >
                <Flex
                    alignItems="center"
                >
                    <Text color="#0f0" fontSize="xl" mr="1">{ellipseAddress(contractAddress)}</Text>
                    {/* <img src="assets/img/out-icon.png" width="12" height="auto" alt="external"/> */}
                    <ExternalLinkIcon color="#0f0" />
                </Flex>
            </Link>
            <Flex alignItems="center" width="220px" pb="2" borderBottom={"1px solid gray"}>
                <Text color="white" fontSize="sm" mr="1">{ellipseAddress(contractAddress)}</Text>
                <CopyIcon color="white" mr="2" />
                <Link>
                    <img src="assets/img/opensea-icon.png" width="14" height="auto" alt="opensea" />
                </Link>
            </Flex>
        </Flex>
    )
}

export default Navbar;