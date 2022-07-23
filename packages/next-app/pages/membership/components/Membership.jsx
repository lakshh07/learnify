import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../../context/loading";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import Lottie from "react-lottie";
import search from "../../../public/assets/search.json";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import membershipAbi from "../../../contracts/ABI/LearnifyMembership.json";
import { learnifyMembershipAddress } from "../../../utils/contractAddress";

import { Steps } from "antd";

function Membership() {
  const { setLoading } = useLoadingContext();
  const { width, height } = useWindowSize();
  const router = useRouter();
  const toast = useToast();
  const [current, setCurrent] = useState(0);
  const { address } = useAccount();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const { data } = useContractRead({
    addressOrName: learnifyMembershipAddress,
    contractInterface: membershipAbi,
    functionName: "balanceOf",
    args: [address, 1],
  });

  const { data: postData, write } = useContractWrite({
    addressOrName: learnifyMembershipAddress,
    contractInterface: membershipAbi,
    functionName: "mint",
    args: [address, 1, 1],
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: postData?.hash,
  });

  useEffect(() => {
    isLoading &&
      toast({
        title: "Transaction Sent",
        description: postData?.hash,
        status: "info",
        duration: 3000,
        isClosable: true,
        variant: "subtle",
        position: "top",
      });

    isSuccess &&
      toast({
        title: "Transaction Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "subtle",
      });

    isSuccess &&
      setTimeout(() => {
        setCurrent(2);
      }, 4000);
  }, [isSuccess, isLoading, postData, toast]);

  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData: search,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    data?.toNumber() >= 1 &&
      setTimeout(() => {
        setCurrent(2);
      }, 3500);
  });

  const firstContent = () => {
    return (
      <Box mt={"4rem"} align={"center"}>
        <Heading fontSize={"2.25rem"} fontWeight={500} lineHeight={"2.5rem"}>
          Checking membership NFT in your wallet
        </Heading>

        <Box pointerEvents={"none"} h={"min-content"}>
          <Lottie options={defaultOptions} height={400} width={400} />
        </Box>
      </Box>
    );
  };

  const secondContent = () => {
    return (
      <Box my={"4rem"} align={"center"}>
        <Heading
          textTransform={"capitalize"}
          fontWeight={600}
          fontSize={"2.25rem"}
          lineHeight={"2.5rem"}
        >
          Mint your free Learnify Membership NFT
        </Heading>
        <Button
          borderWidth={"2px"}
          borderColor={"rgb(10 10 10/1)"}
          borderRadius={"0.625rem"}
          py={"0.375rem"}
          px={"1rem"}
          colorScheme="whatsapp"
          mt={"3em"}
          isLoading={isLoading}
          onClick={() => write()}
        >
          {" "}
          Mint
        </Button>
      </Box>
    );
  };
  const thirdContent = () => {
    return (
      <Box my={"4rem"} align={"center"}>
        <Confetti width={width} height={height} />
        <Heading
          fontSize={"2.25rem"}
          fontWeight={600}
          mb={"1em"}
          lineHeight={"2.5rem"}
        >
          You have got your membership badge!!
        </Heading>

        <Image src={"/assets/badge.png"} boxSize={"150px"} />

        <Button
          borderWidth={"2px"}
          borderColor={"rgb(10 10 10/1)"}
          borderRadius={"0.625rem"}
          bg={"rgb(10 10 10/1)"}
          py={"0.375rem"}
          px={"1rem"}
          colorScheme={"black"}
          mt={"3em"}
          onClick={() => {
            setLoading(true);
            router.push("/courses");
          }}
        >
          Let&apos;s Go..
        </Button>
      </Box>
    );
  };

  const { Step } = Steps;
  const steps = [
    {
      // title: "First",
      content: firstContent(),
    },
    {
      // title: "Second",
      content: secondContent(),
    },
    {
      // title: "Last",
      content: thirdContent(),
    },
  ];

  return (
    <>
      <Container maxW={"1200px"} my={"4rem"}>
        <Box>
          <Steps current={current}>
            {steps.map((item, index) => (
              <Step key={index} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </Box>
      </Container>
    </>
  );
}

export default Membership;
