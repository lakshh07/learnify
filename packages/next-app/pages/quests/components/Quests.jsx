import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Tag,
  Text,
  Flex,
  Progress,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLoadingContext } from "../../../context/loading";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import truncateMiddle from "truncate-middle";
import Blockies from "react-blockies";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineCash } from "react-icons/hi";
import { GrMoney } from "react-icons/gr";

function Courses() {
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const coursesList = [
    {
      name: "Talk more about Web3",
      description:
        " Support me in creating 5 episodes of my first catalan learning lessons!",
      address: "0x7b1C1702A09521b4160f79f853b7F54ba6b35a59",
      price: "10",
      raised: "4",
      goal: "10",
    },
    {
      name: "Talk more about Web3",
      description: " Powered by Encode",
      address: "0x7d5bacb1A2D08ffceAAB3F167e4f9c3A8ebc0169",
      price: "1",
      raised: "1",
      goal: "10",
    },
    {
      name: "Talk more about Web3",
      description:
        " Support me in creating 5 episodes of my first catalan learning lessons!",
      address: "0x563361c978C1630Af85E8AFd28821E8eF26b1Df8",
      price: "20",
      raised: "3",
      goal: "5",
    },
    {
      name: "How to cuddle kittens",
      description:
        " Kittens are so damn cute and uou need to know how to aet then to love uou back! Take this course to find out everuthina uou could everu possiblu neec",
      address: "0x46963bD08F3a21B820BA39bB216a2bc947115e89",
      price: "5.60",
      raised: "7",
      goal: "12",
    },
    {
      name: "How to cuddle kittens 2",
      description:
        " Kittens are so damn cute and uou need to know how to aet then to love uou back! Take this course to find out everuthina uou could everu possiblu neec",
      address: "0x46963bD08F3a21B820BA39bB216a2bc947115e89",
      price: "15.60",
      raised: "23",
      goal: "30",
    },
  ];

  return (
    <>
      <Navbar />

      <Container my={"4rem"} maxW={"1200px"}>
        <Box>
          <Flex alignItems={"center"}>
            <Heading fontSize={"2.25rem"} lineHeight={"2.5rem"}>
              Quests
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
              {coursesList?.length}
            </Text>
          </Flex>

          <Grid
            mt={"1.5rem"}
            templateColumns={"repeat(3, minmax(0px, 1fr))"}
            gap={"2rem"}
          >
            {coursesList &&
              coursesList.map((list, index) => {
                return (
                  <GridItem key={index}>
                    <Box
                      borderWidth={"2px"}
                      borderColor={"rgb(10 10 10/1)"}
                      borderRadius={"0.625rem"}
                      overflow={"hidden"}
                      cursor={"pointer"}
                      transform={"scale(1)"}
                      transition={"transform 0.2s cubic-bezier(0.4, 0, 1, 1)"}
                      _hover={{
                        backgroundColor: "rgb(248,248,248)",
                        transform: "scale(1.02)",
                        transition: "transform 0.2s cubic-bezier(0.4, 0, 1, 1)",
                      }}
                    >
                      <Box
                        h={"100px"}
                        overflow={"hidden"}
                        borderBottomWidth={"2px"}
                      >
                        <Image
                          alt={list.name}
                          objectFit={"cover"}
                          src={"/assets/gradiant.png"}
                          h={"100%"}
                          w={"100%"}
                        />
                      </Box>

                      <Box py={"1.2rem"} px={"1.5rem"}>
                        <Tag
                          borderWidth={"2px"}
                          borderColor={"rgb(10 10 10/1)"}
                          borderRadius={"9999px"}
                          textTransform={"uppercase"}
                          fontWeight={600}
                          fontSize={"0.75rem"}
                          lineHeight={"1rem"}
                          py={"0.25rem"}
                          px={"0.75rem"}
                          bg={"rgb(183 234 213)"}
                        >
                          quest
                        </Tag>
                        <Heading
                          mt={"1rem"}
                          fontSize={"1.5rem"}
                          lineHeight={"2rem"}
                          color={"#1a202c"}
                        >
                          {list.name}
                        </Heading>
                        <Text
                          fontSize={"0.875rem"}
                          lineHeight={"1.25rem"}
                          color={"#888888"}
                          my={"1rem"}
                        >
                          {list.description}
                        </Text>

                        <Flex
                          bg={"#EDF2F6"}
                          fontSize={"14px"}
                          lineHeight={"17px"}
                          w={"max-content"}
                          borderRadius={"0.375rem"}
                          px={"0.5rem"}
                          py={"0.25rem"}
                          alignItems={"center"}
                          mb={"1em"}
                        >
                          <Flex
                            alignItems={"center"}
                            px={"0.5rem"}
                            py={"0.25rem"}
                            bg={"#E4E7EB"}
                            borderRadius={"0.375rem"}
                            mr={"10px"}
                          >
                            <GrMoney fontSize={"12px"} />
                            <Text ml={"8px"} fontWeight={500}>
                              Price
                            </Text>
                          </Flex>
                          <Text fontWeight={600} textTransform={"capitalize"}>
                            4 Matic
                          </Text>
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
                          mt={"1.2rem"}
                        >
                          <Box
                            borderRadius={"50%"}
                            borderWidth={"1.5px"}
                            borderColor={"rgb(10 10 10/1)"}
                            overflow={"hidden"}
                          >
                            <Blockies
                              seed={list.address}
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
                            {truncateMiddle(list.address || "", 5, 4, "...")}
                          </Text>
                        </Flex>

                        <Progress
                          my={"1.7rem"}
                          size="xs"
                          hasStripe
                          value={(list.raised / list.goal) * 100}
                          borderRadius={"20px"}
                          colorScheme={"purple"}
                        />

                        <Flex
                          alignItems={"center"}
                          justifyContent={"space-around"}
                          py={"0.5rem"}
                        >
                          <Box>
                            <Text fontSize={"15px"} fontWeight={600}>
                              Fund Raised
                            </Text>
                            <Flex mt={"5px"} alignItems={"center"}>
                              <Text
                                fontWeight={500}
                                mr={"5px"}
                                fontSize={"17px"}
                              >
                                {list.raised}
                              </Text>
                              <Image w="75px" src={"/assets/matic.svg"} />
                            </Flex>
                          </Box>
                          <Box>
                            <Text fontSize={"15px"} fontWeight={600}>
                              Fund Goal
                            </Text>
                            <Flex mt={"5px"} alignItems={"center"}>
                              <Text
                                fontWeight={500}
                                mr={"5px"}
                                fontSize={"17px"}
                              >
                                {list.goal}
                              </Text>
                              <Image w="80px" src={"/assets/matic.svg"} />
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box>
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          borderColor={"rgb(10 10 10/1)"}
                          borderTopWidth={"2px"}
                          py={"1rem"}
                          px={"2rem"}
                          bg={"rgb(250 229 195)"}
                        >
                          <Flex alignItems={"center"}>
                            {" "}
                            <HiOutlineCash />
                            <Text ml={"5px"} fontWeight={600}>
                              Fund
                            </Text>
                          </Flex>

                          <FiArrowUpRight fontSize={"20px"} />
                        </Flex>
                      </Box>
                    </Box>
                  </GridItem>
                );
              })}
          </Grid>
        </Box>
      </Container>

      <Footer />
    </>
  );
}

export default Courses;
