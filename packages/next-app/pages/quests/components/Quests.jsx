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
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../../context/loading";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import truncateMiddle from "truncate-middle";
import Blockies from "react-blockies";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineCash } from "react-icons/hi";
import { GrMoney } from "react-icons/gr";
import { useRouter } from "next/router";

import { useContractRead, useSigner, useWaitForTransaction } from "wagmi";
import { questsAddress } from "../../../utils/contractAddress";
import questContractAbi from "../../../contracts/ABI/Quests.json";
import { ethers } from "ethers";

function Courses() {
  const [length, setLength] = useState(0);
  const { setLoading } = useLoadingContext();
  const { data: signer } = useSigner();
  const router = useRouter();
  const toast = useToast();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    console.log(fetchData);
  }, []);

  const {
    data: fetchData,
    isError: fetchIsError,
    isFetching,
  } = useContractRead(
    {
      addressOrName: questsAddress,
      contractInterface: questContractAbi,
    },
    "fetchQuest",
    {
      watch: true,
    }
  );

  useEffect(() => {
    setLength(fetchData?.length);
  }, [isFetching]);

  async function fund(price, questId, numId) {
    const contract = new ethers.Contract(
      questsAddress,
      questContractAbi,
      signer
    );

    let overrides = {
      value: price,
    };

    const result = await contract.fundQuest(questId, numId, overrides);
    console.log(result.hash);
    setHash(result.hash);
  }

  const { data, isError, isLoading, isFetched, isSuccess } =
    useWaitForTransaction({
      hash: hash,
    });

  useEffect(() => {
    isLoading &&
      toast({
        title: "Transaction Sent",
        description: hash,
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "subtle",
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

    isSuccess && setHash("");
  }, [isSuccess, isLoading]);

  return (
    <>
      <Navbar />

      <Container my={"4rem"} maxW={"1200px"}>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Heading fontSize={"2.25rem"} lineHeight={"2.5rem"}>
                Quests
              </Heading>
              <Heading
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
                {length}
              </Heading>
            </Flex>
            <Button
              borderWidth={"2px"}
              borderColor={"rgb(10 10 10/1)"}
              borderRadius={"0.625rem"}
              bg={"rgb(10 10 10/1)"}
              py={"0.375rem"}
              px={"1rem"}
              colorScheme={"black"}
              onClick={() => {
                setLoading(true);
                router.push("/quests/new");
              }}
            >
              New Quest
            </Button>
          </Flex>

          {isFetching ? (
            <>
              <Flex my="10rem" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
              </Flex>
            </>
          ) : fetchData?.length ? (
            <>
              <Grid
                mt={"1.5rem"}
                templateColumns={"repeat(3, minmax(0px, 1fr))"}
                gap={"2rem"}
              >
                {fetchData?.map((list, index) => {
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
                          transition:
                            "transform 0.2s cubic-bezier(0.4, 0, 1, 1)",
                        }}
                      >
                        <Box
                          h={"100px"}
                          overflow={"hidden"}
                          borderBottomWidth={"2px"}
                        >
                          <Image
                            alt={list.questName}
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
                            {list.questName}
                          </Heading>
                          <Text
                            fontSize={"0.875rem"}
                            lineHeight={"1.25rem"}
                            color={"#888888"}
                            mt={"0.5rem"}
                            mb={"1em"}
                          >
                            {list.questDescription}
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
                              {ethers.utils.formatEther(
                                list.questPrice.toString()
                              )}{" "}
                              Matic
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
                                seed={list.uploader}
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
                              {truncateMiddle(list.uploader || "", 5, 4, "...")}
                              d
                            </Text>
                          </Flex>

                          <Progress
                            my={"1.7rem"}
                            size="xs"
                            hasStripe
                            value={
                              (list.questAmountRaised.toString() /
                                list.questGoal.toString()) *
                              100
                            }
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
                                  {ethers.utils.formatEther(
                                    list.questAmountRaised.toString()
                                  )}
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
                                  {ethers.utils.formatEther(
                                    list.questGoal.toString()
                                  )}
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
                            onClick={() =>
                              list.questAmountRaised.toString() ===
                              list.questGoal.toString()
                                ? toast({
                                    title: "Funded",
                                    status: "info",
                                    duration: 4000,
                                    isClosable: true,
                                    position: "top",
                                    variant: "subtle",
                                  })
                                : fund(
                                    list.questPrice.toString(),
                                    list.questId,
                                    list.id
                                  )
                            }
                            cursor={
                              list.questAmountRaised.toString() ===
                              list.questGoal.toString()
                                ? "not-allowed"
                                : "pointer"
                            }
                          >
                            <Flex alignItems={"center"}>
                              {" "}
                              <HiOutlineCash />
                              <Text ml={"5px"} fontWeight={600}>
                                {list.questAmountRaised.toString() ===
                                list.questGoal.toString()
                                  ? "Funded"
                                  : "Fund"}
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
            </>
          ) : (
            <>
              <Flex
                my="10rem"
                justifyContent="center"
                flexDir="column"
                alignItems="center"
              >
                <Image
                  src={"/assets/page-not-found.png"}
                  height={100}
                  width={100}
                />
                <Heading fontSize="1.5em" fontWeight={500} pt="1em">
                  No Quests Found
                </Heading>
              </Flex>
            </>
          )}
        </Box>
      </Container>

      <Footer />
    </>
  );
}

export default Courses;
