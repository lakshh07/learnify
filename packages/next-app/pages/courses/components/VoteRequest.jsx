import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { ImRadioChecked } from "react-icons/im";
import { useLoadingContext } from "../../../context/loading";
import Backward from "./Backward";

function VoteRequest() {
  const status = "approved";
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
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Heading fontSize={"34px"} fontWeight={700}>
            Course Pull Request
          </Heading>
          <Button
            borderWidth={"2px"}
            borderColor={"rgb(10 10 10/1)"}
            borderRadius={"0.625rem"}
            bg={"rgb(10 10 10/1)"}
            py={"0.375rem"}
            px={"1rem"}
            colorScheme={"black"}
          >
            Vote to Request
          </Button>
        </Flex>

        <Text
          borderWidth={"2px"}
          borderColor={"rgb(10 10 10/1)"}
          alignItems={"center"}
          borderRadius={"9999px"}
          py={"0.25rem"}
          px={"0.75rem"}
          textTransform={"uppercase"}
          fontSize={"0.75rem"}
          lineHeight={"1rem"}
          fontWeight={600}
          w={"max-content"}
          mt={"2.2em"}
          bg={status === "approved" ? "rgb(183 234 213)" : "rgb(250 229 195)"}
        >
          {status}
        </Text>

        <Box my={"3em"}>
          <Heading fontSize={"34px"} fontWeight={600}>
            Add tummy tickling module
          </Heading>
          <Text
            fontSize={"18px"}
            lineHeight={"28px"}
            mt={"10px"}
            color={"#111111"}
          >
            Tummy tickling is a crucial part of forming a bond with your kitten,
            students of this course should be aware of it. This PR adds a module
            on tummy tickling for this reason.
          </Text>

          <Flex mt={"1em"} alignItems={"center"}>
            <Text
              borderWidth={"2px"}
              borderColor={"rgb(10 10 10/1)"}
              alignItems={"center"}
              borderRadius={"0.3125rem"}
              bg={"rgb(198 201 246)"}
              py={"0.25rem"}
              px={"0.75rem"}
              mr={"0.5em"}
              fontWeight={500}
            >
              1 votes
            </Text>
            <Text
              borderWidth={"2px"}
              borderColor={"rgb(10 10 10/1)"}
              alignItems={"center"}
              borderRadius={"0.3125rem"}
              bg={"rgb(198 201 246)"}
              py={"0.25rem"}
              px={"0.75rem"}
              ml={"0.5em"}
              fontWeight={500}
            >
              30 / 1000 requested share
            </Text>
          </Flex>
        </Box>

        <Box>
          <Heading fontSize={"32px"} fontWeight={600}>
            Modules
          </Heading>
          <Divider />
          <Box
            borderWidth={"2px"}
            borderColor={"rgb(10 10 10/1)"}
            borderRadius={"0.625rem"}
            p={"1em 1.5em 1.4em"}
            mt={"1em"}
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
        </Box>
      </Container>
    </>
  );
}

export default VoteRequest;
