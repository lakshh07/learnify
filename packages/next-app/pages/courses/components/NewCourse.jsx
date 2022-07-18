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
  Text,
} from "@chakra-ui/react";
import Backward from "./Backward";
import { AiOutlineInbox } from "react-icons/ai";
import { message, Upload } from "antd";
import "antd/dist/antd.css";
import Module from "./Module";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: false,

  onChange(info) {
    const { status } = info.file;

    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

function NewCourse() {
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

        <Heading>Create New Course</Heading>
        <Divider />

        <Box mt={"2em"}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input />
          </FormControl>
          <FormControl mt={"1em"} isRequired>
            <FormLabel>Description</FormLabel>
            <Input />
          </FormControl>
        </Box>

        <Box mt={"2em"}>
          <Dragger {...props}>
            <Box align={"center"} className="ant-upload-drag-icon">
              <AiOutlineInbox
                style={{
                  fontSize: "3rem",
                  color: "#3FA9FF",
                  marginBottom: "10px",
                }}
              />
            </Box>
            <Text
              color={"blackAlpha.700 !important"}
              className="ant-upload-text"
            >
              Click or drag cover image to this area to upload
            </Text>
          </Dragger>
        </Box>

        <Box>
          <Module />{" "}
        </Box>

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
      </Container>
    </>
  );
}

export default NewCourse;
