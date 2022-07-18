import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ImRadioChecked } from "react-icons/im";
import { useLoadingContext } from "../../../context/loading";
import Backward from "./Backward";

function ViewCourse() {
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
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Button
            borderWidth={"2px"}
            borderColor={"rgb(10 10 10/1)"}
            borderRadius={"0.625rem"}
            bg={"rgb(10 10 10/1)"}
            py={"0.375rem"}
            px={"1rem"}
            colorScheme={"black"}
            isDisabled
          >
            Previous
          </Button>
          <Button
            borderWidth={"2px"}
            borderColor={"rgb(10 10 10/1)"}
            borderRadius={"0.625rem"}
            bg={"rgb(10 10 10/1)"}
            py={"0.375rem"}
            px={"1rem"}
            colorScheme={"black"}
          >
            Next
          </Button>
        </Flex>

        <Box
          borderWidth={"2px"}
          borderColor={"rgb(10 10 10/1)"}
          borderRadius={"0.625rem"}
          p={"1em 1.5em 1.4em"}
          mt={"1.5em"}
        >
          <Text fontWeight={500} fontSize={"26px"}>
            Scratching a kitten behind the ears
          </Text>
          <Text mt={"0.5em"} lineHeight={"28px"}>
            Kittens just love to be scratched behind the ears, so learn how to
            do it properly in this module
          </Text>

          <Heading mt={"1em"} fontWeight={600} fontSize={"24px"}>
            Learning Materials
          </Heading>
          <Text lineHeight={"28px"} pl={"1.5em"} mt={"0.5em"}>
            Make sure to use your index or ring finger, and gently scratch the
            kitten behind the ears. Keep going until they love you!
          </Text>

          <Heading fontWeight={600} mt={"1em"} fontSize={"24px"}>
            Questions
          </Heading>
          <List spacing={1} pl={"1.5em"} mt={"0.5em"}>
            <ListItem lineHeight={"28px"}>
              <ListIcon as={ImRadioChecked} />
              What part of your body should you use to scratch the kitten.
            </ListItem>
            <ListItem lineHeight={"28px"}>
              {" "}
              <ListIcon as={ImRadioChecked} />
              What part of the kitten should you scratch
            </ListItem>
            <ListItem lineHeight={"28px"}>
              {" "}
              <ListIcon as={ImRadioChecked} />
              How long should you do it for.
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
}

export default ViewCourse;
