import courseContractAbi from "../contracts/ABI/CourseContract.json";
import courseFactoryContractAbi from "../contracts/ABI/CourseFactory.json";
import { ethers } from "ethers";

export const getCourseContract = (courseAddress, signerOrProvider) => {
  return new ethers.Contract(
    courseAddress,
    courseContractAbi,
    signerOrProvider
  );
};

export const getCourseFactoryContract = (courseAddress, signerOrProvider) => {
  return new ethers.Contract(
    courseAddress,
    courseFactoryContractAbi,
    signerOrProvider
  );
};
