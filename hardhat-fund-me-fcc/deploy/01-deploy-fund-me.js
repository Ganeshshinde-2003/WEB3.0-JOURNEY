const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployemt }) => {
  const { deploy, log } = deployemt;
  const { deployer } = await getNamedAccounts;
  const chainId = network.config.chainId;
};
