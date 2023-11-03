const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
  //compile them in our code
  //compile them separately
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "0x0bcde1ad8d4100044cb2842cd71354debaf17912723919bccc1eaf05e7887d4a",
    provider
  );

  const abi = fs.readFileSync(
    "./_SimpleStorage_sol_SimpleStorage.abi",
    "utf-8"
  );
  const binary = fs.readFileSync(
    "./_SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying, Please wait....");

  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
