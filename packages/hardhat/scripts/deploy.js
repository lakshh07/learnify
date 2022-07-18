const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Quests = await hre.ethers.getContractFactory("Quests");
  const quests = await Quests.deploy();

  await quests.deployed();

  console.log("Quests deployed to:", quests.address);

  fs.writeFileSync(
    "../next-app/utils/contractAddress.js",
    `export const questsAddress = "${quests.address}"`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
