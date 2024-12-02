import { Flex, Box, Image, Checkbox, Text, Spacer } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MartianMeta } from "../../config/types";

const NFTItem = ({item, ...props}: any) => {
    const { name, id, uri } = item;
    const { selectedCount, getCheckboxProps, onChange } = props;
    const checkboxRef = useRef<HTMLInputElement>()
    
    const onItemClick = () => {
        if(checkboxRef.current !== undefined) {
            if(selectedCount < 4 || (selectedCount == 4 && checkboxRef.current.checked == true))
                checkboxRef.current.click();
        }
    }

    const onCheckboxChange = (e:any) => {
        if(selectedCount == 4 && e.target.checked == true)
            return;
        onChange(e);        
    }

    return (
        <Flex
            direction="column"
            onClick={onItemClick}
        >
            <Box
                margin="auto"
            >
                <Image src={`${uri}`} borderRadius={"8px"} />
            </Box>
            <Flex
                direction="column"
                height="80px"
                mt="15px"
                border="1px solid #39DC2D"
                pl={["10px", "10px", "8px", "15px"]}
                pt="10px"
                pb="10px"
                pr={["5px", "5px", "2px", "5px"]}
                bg="#35363a"
                justifyContent="center"
            >
                <Checkbox
                    colorScheme="green"
                    bg={"#39dc2d40"}
                    width="16px"
                    borderColor={"transparent"}
                    {...getCheckboxProps({value: id})}
                    ref={checkboxRef}
                    onChange={onCheckboxChange}
                />
                <Text color="white" fontSize={["sm", "sm", "xs", "sm"]} mt="8px">{`${name}#${id + 1}`}</Text>
            </Flex>
        </Flex>
    )
}

export default NFTItem;