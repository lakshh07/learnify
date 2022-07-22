import React, { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import Backward from "./Backward";
import Module from "./Module";

import { newUploadMarkdownData, uploadToIpfs } from "../../../utils/ipfs";
import { useSigner } from "wagmi";
import { getCourseContract } from "../../../utils/courseContract";
import { useRouter } from "next/router";

function NewRequest() {
  const { setLoading } = useLoadingContext();
  const [moduleDetails, setModuleDetails] = useState({
    title: "",
    description: "",
    tokens: "",
  });
  const [courseModuleList, setCourseModuleList] = useState([]);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState();
  const [versions, setVersions] = useState();
  const { data: signer } = useSigner();
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  function onChange(e) {
    setModuleDetails(() => ({
      ...moduleDetails,
      [e.target.name]: e.target.value,
    }));
  }

  const getModules = async (version) => {
    const contract = await getCourseContract(id, signer);
    const modulesToReturn = [];
    const returnedModules = await contract.returnModules(version - 1);
    const [names, descriptions, materials, questions] = returnedModules;
    for (let i = 0; i < names.length; i++) {
      const materialsText = await getTextFromIPFS(materials[i]);
      const questionsText = await getTextFromIPFS(questions[i]);
      const modulee = {
        id: 1,
        name: names[i],
        description: descriptions[i],
        materials: materialsText,
        questions: questionsText,
      };
      modulesToReturn.push(module);
    }
    setModules(modulesToReturn);
    setIsLoading(false);
  };

  const getLatestVersion = async () => {
    const contract = await getCourseContract(id, signer);
    const version = await contract.index();
    const versionInt = version.toNumber();
    const possibleVersions = Array.from(Array(versionInt).keys());
    setSelectedVersion(versionInt);
    setVersions(possibleVersions);
  };

  useEffect(() => {
    getLatestVersion();
  }, []);

  const processModuleData = async () => {
    let names = [];
    let descriptions = [];
    let materials = [];
    let questions = [];

    for (const moduli of courseModuleList) {
      names.push(moduli.moduleName);
      descriptions.push(moduli.moduleDes);
      const materialsURL = await newUploadMarkdownData(moduli.moduleMaterial);
      const questionsURL = await newUploadMarkdownData(moduli.moduleQues);
      materials.push(materialsURL);
      questions.push(questionsURL);
    }
    return { names, descriptions, materials, questions };
  };

  const createRequestHandler = async () => {
    setModuleLoading(true);
    const { names, descriptions, materials, questions } =
      await processModuleData();

    const contract = await getCourseContract(id, signer);

    const tx = await contract.createRequest(
      moduleDetails.title,
      moduleDetails.description,
      moduleDetails.tokens,
      names,
      descriptions,
      materials,
      questions,
      selectedVersion
    );
    await tx.wait();
    setTimeout(() => {
      toast({
        title: "Transaction Success",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
      });
      setModuleLoading(false);
    }, 500);
    setTimeout(() => {
      setLoading(true);
      router.push(`/courses/${id}`);
    }, 1000);
  };

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
            <Input isDisabled placeholder={selectedVersion} />
          </FormControl>
          <FormControl isRequired mt={"1em"}>
            <FormLabel>PR Title</FormLabel>
            <Input
              name="title"
              value={moduleDetails.title}
              onChange={onChange}
            />
          </FormControl>
          <FormControl isRequired mt={"1em"}>
            <FormLabel>Description of changes</FormLabel>
            <Input
              name="description"
              value={moduleDetails.description}
              onChange={onChange}
            />
          </FormControl>
          <FormControl isRequired mt={"1em"}>
            <FormLabel>Requested course shares (out of 1000 total)</FormLabel>
            <Input
              name="tokens"
              value={moduleDetails.tokens}
              onChange={onChange}
            />
          </FormControl>
        </Box>

        <Module setCourseModuleList={setCourseModuleList} />

        <Button
          borderWidth={"2px"}
          borderColor={"rgb(10 10 10/1)"}
          borderRadius={"0.625rem"}
          bg={"rgb(10 10 10/1)"}
          py={"0.375rem"}
          px={"1rem"}
          colorScheme={"black"}
          mt={"1.5em"}
          isLoading={moduleLoading}
          onClick={createRequestHandler}
        >
          Submit
        </Button>
      </Container>
    </>
  );
}

export default NewRequest;
