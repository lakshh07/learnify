import React, { useEffect } from "react";
import { useLoadingContext } from "../../../context/loading";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Backward from "./Backward";
import Module from "./Module";

function NewRequest() {
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Container my={"3.5em"} maxW={"1200px"}>
        <Backward />

        <Heading>Create Pull Request</Heading>
        <Divider />

        <Box mt={"2em"}>
          <FormControl>
            <FormLabel>Base Version</FormLabel>
            <Input />
          </FormControl>
          <FormControl isRequired mt={"1em"}>
            <FormLabel>PR Title</FormLabel>
            <Input />
          </FormControl>
          <FormControl isRequired mt={"1em"}>
            <FormLabel>Description of changes</FormLabel>
            <Input />
          </FormControl>
          <FormControl isRequired mt={"1em"}>
            <FormLabel>Requested course shares (out of 1000 total)</FormLabel>
            <Input />
          </FormControl>
        </Box>

        <Module />

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
          Submit
        </Button>
      </Container>
    </>
  );
}

export default NewRequest;
