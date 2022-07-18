import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLoadingContext } from "../../../context/loading";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Blockies from "react-blockies";
import truncateMiddle from "truncate-middle";
import PullRequests from "./PullRequests";
import Backward from "./Backward";

function Course() {
  const router = useRouter();
  const { setLoading } = useLoadingContext();
  const { id } = router.query;
  const [courseVersion, setCourseVersion] = useState("1");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Navbar />

      <Container my={"4rem"} maxW={"1200px"}>
        <Backward />

        <Flex px={"1em"} justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Heading fontWeight={600}>How to cuddle kittens</Heading>
          </Box>

          <Menu autoSelect={false}>
            <MenuButton as={Button}>
              <Flex alignItems={"center"}>
                <Text>Version</Text>
                <Text
                  w={"1.5rem"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  fontSize={"1rem"}
                  lineHeight={"1.5rem"}
                  bg={"black"}
                  color={"white"}
                  textAlign={"center"}
                  borderRadius={"50%"}
                  ml={"0.75rem"}
                  fontWeight={600}
                >
                  {courseVersion}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={(e) => setCourseVersion(e.target.value)}
                value={"1"}
              >
                1
              </MenuItem>
              <MenuItem
                onClick={(e) => setCourseVersion(e.target.value)}
                value={"2"}
              >
                2
              </MenuItem>
              <MenuItem
                onClick={(e) => setCourseVersion(e.target.value)}
                value={"3"}
              >
                3
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Flex
          borderWidth={"2px"}
          borderColor={"rgb(10 10 10/1)"}
          alignItems={"center"}
          borderRadius={"0.3125rem"}
          bg={"rgb(198 201 246)"}
          py={"0.25rem"}
          px={"0.75rem"}
          w={"max-content"}
          my={"1.3em"}
          mx={"1em"}
        >
          <Box
            borderRadius={"50%"}
            borderWidth={"1.5px"}
            borderColor={"rgb(10 10 10/1)"}
            overflow={"hidden"}
          >
            <Blockies
              seed={"0x7b1C1702A09521b4160f79f853b7F54ba6b35a59"}
              color="#dfe"
              bgcolor="#aaa"
              default="-1"
              size={10}
              scale={2}
            />
          </Box>
          <Text
            ml={"10px"}
            fontSize={"0.75rem"}
            lineHeight={"1rem"}
            fontWeight={600}
          >
            {truncateMiddle(
              "0x7b1C1702A09521b4160f79f853b7F54ba6b35a59" || "",
              5,
              4,
              "..."
            )}
          </Text>
        </Flex>

        <Box>
          <Box
            p={"1em"}
            mt={"2em"}
            mb={"2em"}
            borderWidth={"2px"}
            borderColor={"rgb(10 10 10/1)"}
            borderRadius={"0.625rem"}
            maxH={"600px"}
          >
            <Box
              bg={"white"}
              w={"100%"}
              h={"500px"}
              backgroundImage={"/assets/gradiant.png"}
              backgroundPosition={"center"}
              backgroundColor="#662EA7"
              backgroundRepeat={"no-repeat"}
              backgroundSize={"cover"}
            />
          </Box>

          <Box px={"1em"}>
            <Text fontSize={"18px"} lineHeight={"28px"}>
              Kittens are so damn cute and you need to know how to get them to
              love you back! Take this course to find out everything you could
              every possibly need.
            </Text>

            <Flex alignItems={"center"} mt={"3.5em"} mb={"0.2em"}>
              <Heading fontSize={"34px"} fontWeight={600}>
                Modules
              </Heading>
              <Text
                w={"2rem"}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"1.2rem"}
                lineHeight={"2rem"}
                bg={"black"}
                color={"white"}
                textAlign={"center"}
                borderRadius={"50%"}
                ml={"0.75rem"}
                fontWeight={600}
              >
                2
              </Text>
            </Flex>

            <Divider />
            <Box>
              <Box
                borderWidth={"2px"}
                borderColor={"rgb(10 10 10/1)"}
                borderRadius={"0.625rem"}
                p={"1em"}
                mt={"1em"}
              >
                <Heading fontWeight={500} fontSize={"24px"}>
                  Een kitten achter de oren krabben
                </Heading>
                <Text fontSize={"16px"} mt={"10px"} color={"#888888"}>
                  Kittens vinden het heerlijk om achter de oren gekrabd te
                  worden, dus leer hoe je dit op de juiste manier doet in deze
                  module
                </Text>
              </Box>
              <Box
                borderWidth={"2px"}
                borderColor={"rgb(10 10 10/1)"}
                borderRadius={"0.625rem"}
                p={"1em"}
                mt={"1rem"}
              >
                <Heading fontWeight={500} fontSize={"24px"}>
                  Een kitten achter de oren krabben
                </Heading>
                <Text fontSize={"16px"} mt={"10px"} color={"#888888"}>
                  Kittens vinden het heerlijk om achter de oren gekrabd te
                  worden, dus leer hoe je dit op de juiste manier doet in deze
                  module
                </Text>
              </Box>
            </Box>

            <Button
              borderWidth={"2px"}
              borderColor={"rgb(10 10 10/1)"}
              borderRadius={"0.625rem"}
              bg={"rgb(10 10 10/1)"}
              py={"0.375rem"}
              px={"1rem"}
              colorScheme={"black"}
              mt={"2em"}
            >
              Enroll Now
            </Button>

            <Button
              borderWidth={"2px"}
              borderColor={"rgb(10 10 10/1)"}
              borderRadius={"0.625rem"}
              bg={"rgb(10 10 10/1)"}
              py={"0.375rem"}
              px={"1rem"}
              colorScheme={"black"}
              mt={"2em"}
              onClick={() => {
                setLoading(true);
                router.push(`/courses/${id}/version/${courseVersion}`);
              }}
            >
              Go to Course
            </Button>

            <PullRequests setLoading={setLoading} id={id} />
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
}

export default Course;
