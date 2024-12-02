import { CheckboxGroup, SimpleGrid, useCheckboxGroup } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import { MartianMeta } from "../../config/types";
import NFTItem from "./NFTItem";

type Props = {
    items: Array<MartianMeta>,
    getCheckboxProps: any,
    onChange: any,
    selectedCount: number
}

const NFTItemList = ({ items, getCheckboxProps, selectedCount, onChange } : Props) => {
    const { account } = useEthers();
    return (
        <SimpleGrid
            columns={[2, 2, 3]}
            spacing="40px"
            padding="20px"
        >
            {items.map((item, index) => {
                return (
                    <NFTItem
                        key={item.id + index}
                        item={item}
                        getCheckboxProps={getCheckboxProps}
                        onChange={onChange}
                        selectedCount={selectedCount}
                    />
                )
            })}
        </SimpleGrid>
    )
}

export default NFTItemList;