const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const CourseFactory = await hre.ethers.getContractFactory("CourseFactory");
  const courseFactory = await CourseFactory.deploy();

  await courseFactory.deployed();

  console.log("Quests deployed to:", courseFactory.address);

  fs.writeFileSync(
    "../next-app/utils/contractAddress.js",
    `export const courseAddress = "${courseFactory.address}"`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
