import React, { useState, useRef } from "react";
import {
  Flex,
  Text,
  chakra,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  useColorModeValue,
  Textarea,
  Spinner,
  Progress,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

function AccountSetting({ isOpen, onClose, update }) {
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [checker, setChecker] = useState(false);

  async function updateProfile(bio, name, setChecker) {
    if (!bio && !name) {
      alert("error... no profile information submitted");
      return;
    }
    setChecker(true);
    const user = { name: name, bio: bio };
    // if (bio) user.bio = bio;
    // if (name) user.name = name;
    await idxRef.current.set("basicProfile", user);
    setLocalProfileData();
    console.log("profile updated...");
    alert("Profile Updated !👍");
    setChecker(false);
  }

  return (
    <>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="Raleway">Setting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="soft-rounded" colorScheme="purple">
              <TabList>
                <Tab>Profile</Tab>
                <Tab cursor="not-allowed" isDisabled>
                  Subscription
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>
                    <chakra.form
                      // method="POST"
                      shadow="base"
                      rounded={[null, "md"]}
                      overflow={{ sm: "hidden" }}
                    >
                      <Stack
                        px={3}
                        py={5}
                        bg={useColorModeValue("white", "gray.700")}
                        spacing={6}
                        p={{ sm: 6 }}
                      >
                        <FormControl>
                          <Flex justifyContent="space-between">
                            <FormLabel
                              fontSize="md"
                              fontFamily="Inter"
                              fontWeight="md"
                              color={useColorModeValue("gray.700", "gray.50")}
                            >
                              Your Tier :
                            </FormLabel>
                            <FormLabel
                              fontSize="md"
                              fontFamily="Inter"
                              fontWeight="md"
                              color={useColorModeValue("gray.500", "gray.50")}
                            >
                              Free
                            </FormLabel>
                          </Flex>
                        </FormControl>

                        <FormControl>
                          <FormLabel
                            fontSize="md"
                            fontFamily="Inter"
                            fontWeight="md"
                            color={useColorModeValue("gray.700", "gray.50")}
                          >
                            Name
                          </FormLabel>
                          <InputGroup size="sm">
                            <Input
                              fontFamily="Inter"
                              type="text"
                              focusBorderColor="gray.700"
                              rounded="md"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            fontSize="md"
                            fontFamily="Inter"
                            fontWeight="md"
                            color={useColorModeValue("gray.700", "gray.50")}
                          >
                            Bio
                          </FormLabel>
                          <InputGroup size="sm">
                            <Textarea
                              fontFamily="Inter"
                              type="text"
                              focusBorderColor="gray.700"
                              rounded="md"
                              onChange={(e) => setBio(e.target.value)}
                              value={bio}
                            />
                          </InputGroup>
                        </FormControl>
                      </Stack>
                    </chakra.form>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn"
              onClick={async () => {
                setChecker(true);
                await update(name, bio);
                setChecker(false);
                setTimeout(() => {
                  onClose();
                }, 500);
              }}
            >
              {checker && <Spinner mr={4} />}
              {checker ? "Saving.." : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AccountSetting;
