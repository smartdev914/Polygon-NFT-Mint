import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
    children?: ReactNode;
}

const Layout = ({children}: Props) => {
    return (
        <Flex
            flexDirection="column"
            bg="url('assets/img/back_star.png')"
            bgRepeat={"repeat-y"}
            pt="5"
            pl={["8", "8", "16"]}
            pr={["8", "8", "16"]}
        >
            {children}
        </Flex>
    )
}

export default Layout;