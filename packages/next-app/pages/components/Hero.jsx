import {
  Heading,
  Container,
  Flex,
  Box,
  useToast,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Stripes from "./Stripes";
import { useLoadingContext } from "../../context/loading";
import { useRouter } from "next/router";

function Hero() {
  const { isConnected, isDisconnected } = useAccount();
  const toast = useToast();
  const { setLoading } = useLoadingContext();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("mousemove", parallax);
    console.log(isConnected);
  }, []);

  useEffect(() => {
    router.prefetch("/membership");
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    console.log(isConnected);
  }, []);

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        toast({
          title: "Loading...",
          status: "info",
          variant: "subtle",
          position: "top",
          duration: 2800,
          icon: <Spinner />,
        });
        setTimeout(() => {
          toast({
            title: "Signed In",
            status: "success",
            variant: "subtle",
            position: "top",
            duration: 3500,
          });
        }, 3000);
        setTimeout(() => {
          // setLoading(true);
          setVisible(true);
          // router.push("/courses");
        }, 6000);
      }, 1700);
    }
    if (isDisconnected) {
      setVisible(false);
    }
  }, [isConnected, isDisconnected]);

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

          <Box mt={"3em"} align={"center"}>
            <ConnectButton label="Sign In" />

            <Button
              borderWidth={"2px"}
              borderColor={"rgb(10 10 10/1)"}
              borderRadius={"0.625rem"}
              bg={"rgb(10 10 10/1)"}
              py={"0.375rem"}
              px={"1rem"}
              colorScheme={"black"}
              mt={"2em"}
              display={visible ? "block" : "none"}
              onClick={() => {
                setLoading(true);
                router.push("/membership");
              }}
            >
              Gets Started
            </Button>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default Hero;
