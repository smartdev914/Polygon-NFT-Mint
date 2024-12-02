import { Box, Image } from "@chakra-ui/react";

type Props = {
    item: any
}

const BurnItem = ({ item }: Props) => {
    const { id, uri } = item;
    return item !== -1 ? (
        <Box
            bg="#35363a"
            width={"60px"}
            height={"60px"}
            borderRadius="5px"
            color="white"
        >
            <Image src={`${uri}`} borderRadius="5px" />
        </Box>
    ) : (
        <Box
            bg="#35363a"
            minWidth="60px"
            minHeight="60px"
            borderRadius="5px"
        > </Box>
    )
}

export default BurnItem;
