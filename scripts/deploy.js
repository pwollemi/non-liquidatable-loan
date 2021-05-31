const { ethers } = require("hardhat");

async function main() {
  const [deployer ] = await ethers.getSigners();

  const RULER = await ethers.getContractFactory("RULER");
  const ruler = await RULER.deploy();
  await ruler.deployed();
  console.log("RULER address:", ruler.address); // eslint-disable-line no-console

  const RERC20 = await ethers.getContractFactory("RERC20");
  const rerc20 = await RERC20.deploy();
  await rerc20.deployed();
  await rerc20.initialize("RERC20 token", "RERC20", 18);
  console.log("RERC20 address:", rerc20.address); // eslint-disable-line no-console

  const RulerCore = await ethers.getContractFactory("RulerCore");
  const rulercore = await RulerCore.deploy();
  await rulercore.deployed();
  await rulercore.initialize(rerc20.address, deployer.address);
  console.log("RulerCore address:", rulercore.address); // eslint-disable-line no-console

  const RulerMiniting = await ethers.getContractFactory("BonusRewards");
  const bonusRewards = await RulerMiniting.deploy();
  await bonusRewards.deployed();
  console.log("BonusRewards address:", bonusRewards.address); // eslint-disable-line no-console

  const RulerOracle = await ethers.getContractFactory("Oracle");
  const oracle = await RulerOracle.deploy();
  await oracle.deployed();
  console.log("Oracle address:", oracle.address); // eslint-disable-line no-console

  const mdexRouter = "0x7964E55BBdAECdE48c2C8ef86E433eD47FEcB519"
  const RulerZap = await ethers.getContractFactory("RulerZap");
  const rulerZap = await RulerZap.deploy(rulercore.address, mdexRouter);
  await rulerZap.deployed();
  console.log("RulerZap address:", rulerZap.address); // eslint-disable-line no-console
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
