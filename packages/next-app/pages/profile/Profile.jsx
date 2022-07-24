import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../context/loading";
import { useRouter } from "next/router";
import Blockies from "react-blockies";

import { courseFactoryAddress } from "../../utils/contractAddress";
import courseContractFactoryAbi from "../../contracts/ABI/CourseFactory.json";
import { useContractRead, useProvider } from "wagmi";
import { getCourseContract } from "../../utils/courseContract";
import { FiArrowUpRight } from "react-icons/fi";
import truncateMiddle from "truncate-middle";
import { client } from "../../utils/data";

import ChangeProfile from "./ChangeProfile";

function Profile() {
  const { setLoading } = useLoadingContext();
  const provider = useProvider();
  const router = useRouter();
  const { add } = router.query;
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [courseData, setCourseData] = useState();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    setTimeout(() => {
      //   setLoading(false);
    }, 1500);
  }, []);

  const {
    data: fetchData,
    isLoading,
    isFetched,
    isFetching,
  } = useContractRead({
    addressOrName: courseFactoryAddress,
    contractInterface: courseContractFactoryAbi,
    functionName: "getDeployedCourses",
    watch: true,
  });

  async function getProfile() {
    const cdata = await client();
    const { did, idx, error } = cdata;
    const data = await idx.get("basicProfile", did.id);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setProfileData(data);
  }

  async function update(name, bio) {
    const cdata = await client();
    const { did, idx, error } = cdata;

    const user = { name: name, bio: bio };

    await idx.set("basicProfile", user);
    getProfile();
  }

  async function getEnrolledCourses() {
    let enrolled = [];

    for (const ca of fetchData) {
      let contract = getCourseContract(ca, provider);
      let userCourses = await contract.enrolled(add);
      if (userCourses) {
        enrolled.push(ca);
      }
    }
    return enrolled;
  }

  async function getCourseInfo(address) {
    const course = getCourseContract(address, provider);
    const courseInformation = await course.getSummaryInformation();
    const [name, description, imageURL, author] = courseInformation;
    return {
      name,
      description,
      imageURL,
      author,
      address,
    };
  }

  const getCourseSummaries = async () => {
    let courseInfo = [];
    const enrolledCourses = await getEnrolledCourses();
    for (const ca of enrolledCourses) {
      const info = await getCourseInfo(ca);
      courseInfo.push(info);
    }
    setCourseData(courseInfo);
  };

  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {}, []);

  useEffect(() => {
    getCourseSummaries();
  }, [isFetching]);

  return (
    <>
      <Container maxW={"1200px"} my={"4rem"} align={"center"}>
        <Box
          borderWidth={"2px"}
          borderColor={"rgb(10 10 10/1)"}
          borderRadius={"0.325rem"}
          p={"2rem"}
        >
          <Flex justifyContent={"flex-end"}>
            <Button
              alignItems={"right"}
              position={"absolute"}
              _hover={{ backgroundColor: "none" }}
              variant={"ghost"}
              onClick={onOpen}
            >
              Edit
            </Button>
            <ChangeProfile update={update} isOpen={isOpen} onClose={onClose} />
          </Flex>

          <Heading fontSize={"2.25rem"} lineHeight={"2.5rem"} fontWeight={600}>
            Hey, {profileData?.name}
          </Heading>
          <Text
            mt={"0.5em"}
            lineHeight={"1.25rem"}
            fontSize={"1rem"}
            color={"#111"}
          >
            {`(${profileData?.bio})`}
          </Text>

          <Heading
            fontSize={"2rem"}
            lineHeight={"2.5rem"}
            fontWeight={500}
            textAlign={"left"}
            mt={"3rem"}
          >
            Courses Enrolled
          </Heading>
          <Divider />
          <Box mt={"2em"}>
            {isLoading ? (
              <>
                <Flex my="10rem" justifyContent="center" alignItems="center">
                  <Spinner size="xl" />
                </Flex>
              </>
            ) : fetchData?.length ? (
              <>
                {courseData ? (
                  <>
                    <Grid
                      mt={"1.5rem"}
                      templateColumns={"repeat(3, minmax(0px, 1fr))"}
                      gap={"2rem"}
                    >
                      {courseData?.length &&
                        courseData
                          ?.slice(0)
                          .reverse()
                          .map((list, index) => {
                            return (
                              <GridItem key={index} align={"left"}>
                                <Box
                                  borderWidth={"2px"}
                                  borderColor={"rgb(10 10 10/1)"}
                                  borderRadius={"0.625rem"}
                                  overflow={"hidden"}
                                  cursor={"pointer"}
                                  transform={"scale(1)"}
                                  transition={
                                    "transform 0.2s cubic-bezier(0.4, 0, 1, 1)"
                                  }
                                  _hover={{
                                    backgroundColor: "rgb(248,248,248)",
                                    transform: "scale(1.02)",
                                    transition:
                                      "transform 0.2s cubic-bezier(0.4, 0, 1, 1)",
                                  }}
                                >
                                  <Box
                                    h={"200px"}
                                    overflow={"hidden"}
                                    borderBottomWidth={"2px"}
                                  >
                                    <Image
                                      alt={list.name}
                                      objectFit={"cover"}
                                      src={
                                        list.imageURL
                                          ? list.imageURL
                                          : "/assets/gradiant.png"
                                      }
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
                                      course
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
                                      {`${list.description.substring(
                                        0,
                                        100
                                      )}...`}
                                    </Text>
                                    <Flex
                                      borderWidth={"2px"}
                                      borderColor={"rgb(10 10 10/1)"}
                                      alignItems={"center"}
                                      borderRadius={"0.3125rem"}
                                      bg={"rgb(198 201 246)"}
                                      py={"0.25rem"}
                                      px={"0.75rem"}
                                      w={"max-content"}
                                    >
                                      <Box
                                        borderRadius={"50%"}
                                        borderWidth={"1.5px"}
                                        borderColor={"rgb(10 10 10/1)"}
                                        overflow={"hidden"}
                                      >
                                        <Blockies
                                          seed={list.author}
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
                                          list.author || "",
                                          5,
                                          4,
                                          "..."
                                        )}
                                      </Text>
                                    </Flex>
                                  </Box>
                                  <Box
                                    onClick={() => {
                                      setLoading(true);
                                      router.push(`/courses/${list.address}`);
                                    }}
                                  >
                                    <Flex
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      borderColor={"rgb(10 10 10/1)"}
                                      borderTopWidth={"2px"}
                                      py={"1rem"}
                                      px={"2rem"}
                                      bg={"rgb(250 229 195)"}
                                    >
                                      <Text fontWeight={600}>Go to course</Text>
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
                      alignItems="center"
                    >
                      <Spinner size="xl" />
                    </Flex>
                  </>
                )}
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
                    No Courses Enrolled
                  </Heading>
                </Flex>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
