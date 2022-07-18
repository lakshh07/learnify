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
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLoadingContext } from "../../../context/loading";
import Backward from "../../courses/components/Backward";

function NewQuest() {
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Container maxW={"1200px"} my={"3.5rem"}>
        <Backward />

        <Heading>Create New Quest</Heading>
        <Divider />

        <Box mt={"2em"}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input />
          </FormControl>
          <FormControl mt={"1em"} isRequired>
            <FormLabel>Description</FormLabel>
            <Input />
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
                <NumberInputField pl={"4em"} />
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
                <NumberInputField pl={"4em"} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl mt={"1em"}>
            <FormLabel>Funds recipient</FormLabel>
            <Input />
          </FormControl>
          <FormControl mt={"1em"}>
            <FormLabel>Referral Fee</FormLabel>
            <NumberInput>
              <NumberInputField />
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
          >
            Create
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default NewQuest;
