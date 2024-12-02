import { Flex, Text, Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MartianMeta } from "../../config/types";
import BurnItem from "./BurnItem";

type Props = {
    items: Array<MartianMeta>,
    onExtractMartian: any
}

const BurnPanel = ({items, onExtractMartian}: Props) => {
    const [burnList, setBurnList] = useState<Array<MartianMeta>>([{id: -1, uri: ''}]);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const list = [];
        let disabled = false;
        for(let i = 0;i<4;i++){
            if(i<items.length)
                list.push(items[i]);
            else{
                list.push({id: -1, uri: ''});
                disabled = true
            }
        }
        setBurnList(list)
        setIsDisabled(disabled)
    }, [items])
    return (
        <Flex direction="column" mb="20px" >
            <Text color="#0f0" mb="3">Celestial Martian</Text>
            <Text color="#ccc" mb="10">You'll need 4 Meta Martians to initiate extraction of Celestial Martian</Text>
            <Image
                src="assets/img/austin-logo.png"
                style={{
                    marginBottom: "20px",
                    maxWidth: "400px",
                    margin: "auto",
                    width: "100%"
                }}
                alt="austin"
            />
            <Flex
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                mt="10px"
                mb="20px"
            >
                {burnList.map( (item, index) => {
                    return (
                        index < 4 ? (
                            <BurnItem key={`${item.id}-${index}`} item={item} />
                        ) : (<></>)
                    )
                })}
            </Flex>
            <Button
                isDisabled={isDisabled}
                bgColor="#93E018"
                borderRadius="24px"
                _hover={{ }}
                _active={{
                    transform: "scale(0.98)"
                }}
                _disabled={{
                    bg: "#93e01866"
                }}
                onClick={onExtractMartian}
            >
                Initiate the Extraction
            </Button>
        </Flex>
    )
}

export default BurnPanel;