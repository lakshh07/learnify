const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Quests = await hre.ethers.getContractFactory("Quests");
  const quests = await Quests.deploy();

  await quests.deployed();

  console.log("Quests deployed to:", quests.address);

  const CourseFactory = await hre.ethers.getContractFactory("CourseFactory");
  const courseFactory = await CourseFactory.deploy();

  await courseFactory.deployed();

  console.log("Course Factory deployed to:", courseFactory.address);

  const LearnifyMembership = await hre.ethers.getContractFactory(
    "LearnifyMembership"
  );
  const learnifyMembership = await LearnifyMembership.deploy();

  await learnifyMembership.deployed();

  console.log("LearnifyMembership deployed to:", learnifyMembership.address);

  fs.writeFileSync(
    "../next-app/utils/contractAddress.js",
    `export const questsAddress = "${quests.address}";
    export const courseFactoryAddress = "${courseFactory.address}";
    export const learnifyMembershipAddress = "${learnifyMembership.address}";
    `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
