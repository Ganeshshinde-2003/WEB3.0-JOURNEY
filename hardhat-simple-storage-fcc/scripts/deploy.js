const {ethers, run} = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract....")
  const simpleStorage = await SimpleStorageFactory.deploy();
  // await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  
}

async function verify(contractAddress, args){
  console.log("Verifying contract...")
  try {
    await run("verify:verify",{
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error) {
    if(error.message.toLowerCase().includes("already verified")){
      console.log("Already Verified")
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
