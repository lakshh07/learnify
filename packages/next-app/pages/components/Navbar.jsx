import React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <>
      <Flex px={"4em"} py={"1.5em"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Image alt="logo" boxSize={"30px"} src={"/assets/community.png"} />
          <Heading
            ml={"10px"}
            fontWeight={700}
            className={"h-shadow-black"}
            fontFamily={"Philosopher !important"}
          >
            Learnify
          </Heading>
        </Flex>

        <Box></Box>
        {/* <ConnectButton /> */}
      </Flex>
    </>
  );
}

export default Navbar;
