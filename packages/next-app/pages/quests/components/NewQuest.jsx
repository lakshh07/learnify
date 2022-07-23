import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../../context/loading";
import Backward from "../../courses/components/Backward";
import { useRouter } from "next/router";

import { useContractWrite, useWaitForTransaction, useAccount } from "wagmi";
import { questsAddress } from "../../../utils/contractAddress";
import questContractAbi from "../../../contracts/ABI/Quests.json";
import { v4 as uuidv4 } from "uuid";

function NewQuest() {
  const { setLoading } = useLoadingContext();
  const { data: account } = useAccount();
  const toast = useToast();
  const router = useRouter();
  const [questData, setQuestData] = useState({
    title: "",
    description: "",
    price: "0",
    goal: "0",
    fee: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  function onChange(e) {
    setQuestData(() => ({ ...questData, [e.target.name]: e.target.value }));
  }

  const {
    data: postData,
    isError: postIsError,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    write,
  } = useContractWrite({
    addressOrName: questsAddress,
    contractInterface: questContractAbi,
    functionName: "createQuest",
    args: [
      uuidv4(),
      questData.title,
      questData.description,
      (questData.price * Math.pow(10, 18)).toString(),
      (questData.goal * Math.pow(10, 18)).toString(),
      questData.fee,
    ],
  });

  const { data, isError, isLoading, isFetched, isSuccess } =
    useWaitForTransaction({
      hash: postData?.hash,
    });

  useEffect(() => {
    postIsSuccess &&
      setQuestData({
        title: "",
        description: "",
        price: "0",
        goal: "0",
        fee: "0",
      });

    isLoading &&
      toast({
        title: "Transaction Sent",
        description: postData?.hash,
        status: "info",
        duration: 4000,
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
        setLoading(true);
        router.push("/quests");
      }, 4000);
  }, [isSuccess, isLoading, postIsSuccess, setQuestData, postData, toast]);

  return (
    <>
      <Container maxW={"1200px"} my={"3.5rem"}>
        <Backward />

        <Heading>Create New Quest</Heading>
        <Divider />

        <Box mt={"2em"}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={questData.title} onChange={onChange} />
          </FormControl>
          <FormControl mt={"1em"} isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={questData.description}
              onChange={onChange}
            />
          </FormControl>
          <FormControl mt={"1em"}>
            <FormLabel>Select Currency</FormLabel>
            <Input placeholder="MATIC" isDisabled />
          </FormControl>
          <FormControl mt={"1em"} isRequired>
            <FormLabel>Contribution amount</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <Image ml={"20px"} w="105px" src={"/assets/matic.svg"} />
              </InputLeftElement>
              <NumberInput w={"100%"}>
                <NumberInputField
                  pl={"4em"}
                  name="price"
                  value={questData.price}
                  onChange={onChange}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl mt={"1em"} isRequired>
            <FormLabel>Funding Goal</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <Image ml={"20px"} w="105px" src={"/assets/matic.svg"} />
              </InputLeftElement>
              <NumberInput w={"100%"}>
                <NumberInputField
                  pl={"4em"}
                  name="goal"
                  value={questData.goal}
                  onChange={onChange}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl mt={"1em"}>
            <FormLabel>Funds recipient</FormLabel>
            <Input placeholder={account?.address} />
          </FormControl>
          <FormControl mt={"1em"}>
            <FormLabel>Referral Fee</FormLabel>
            <NumberInput>
              <NumberInputField
                name="fee"
                value={questData.fee}
                onChange={onChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button
            borderWidth={"2px"}
            borderColor={"rgb(10 10 10/1)"}
            borderRadius={"0.625rem"}
            bg={"rgb(10 10 10/1)"}
            py={"0.375rem"}
            px={"1rem"}
            colorScheme={"black"}
            mt={"1.5em"}
            isLoading={isLoading}
            onClick={() => write()}
          >
            Create
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default NewQuest;
