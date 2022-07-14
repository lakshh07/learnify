import React from "react";
import { Flex, Heading, Image, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <>
      <Flex px={"4em"} py={"1.5em"} justifyContent={"space-between"}>
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Flex alignItems={"center"}>
            <Image
              className="rotate"
              alt="logo"
              boxSize={"30px"}
              src={"/assets/community.png"}
            />
            <Heading
              ml={"15px"}
              fontWeight={700}
              className={"h-shadow-black"}
              fontFamily={"Philosopher !important"}
            >
              Learnify
            </Heading>
          </Flex>
        </Link>

        <ConnectButton />
      </Flex>
    </>
  );
}

export default Navbar;
