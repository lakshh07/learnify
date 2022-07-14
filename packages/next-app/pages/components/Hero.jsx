import {
  Heading,
  Container,
  Flex,
  Box,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { useConnect } from "wagmi";
import Stripes from "./Stripes";
import { useLoadingContext } from "../../context/loading";

function Hero() {
  const { isConnected } = useConnect();
  const toast = useToast();
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    document.addEventListener("mousemove", parallax);
  }, []);

  useEffect(() => {
    // router.prefetch("/feed");
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        toast({
          title: "Loading...",
          status: "info",
          variant: "subtle",
          position: "top",
          duration: 3000,
          icon: <Spinner />,
        });
        setTimeout(() => {
          toast({
            title: "Signed In",
            status: "success",
            variant: "subtle",
            position: "top",
            duration: 4000,
          });
        }, 3000);
      }, 1700);
    }
  }, [isConnected]);

  function parallax(e) {
    document.querySelectorAll(".px-move").forEach(function (move) {
      let moving_value = move.getAttribute("data-value");
      let x = (e.clientX * moving_value) / 100;
      let y = (e.clientY * moving_value) / 100;
      move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
  }

  return (
    <>
      <Container maxW={"1400px"} h={"83vh"} px={"2rem"}>
        <Stripes />

        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
          w={"100%"}
          py={"4rem"}
          data-value="1"
          className="px-move"
        >
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Heading
              className={"h-shadow-black hero-center-text "}
              fontWeight={"700"}
              fontFamily={"PressStart2P"}
              fontSize={["1.4rem", "1rem", "2.5rem", "3rem", "4rem"]}
            >
              a <span className="hero-span h-shadow-purple">creative</span>{" "}
              platform allowing incentives for the creation of high-quality
              learning materials
            </Heading>
          </Flex>

          <Box mt={"3em"}>
            <ConnectButton label="Get Started" />
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default Hero;
