const { ethers } = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
  //compile them in our code
  //compile them separately
  const provider = new ethers.providers.JsonRpcProvider(process.env.LOCALHOST)
  // const encryptedJson = fs.readFileSync("./.encryptdKey.json", "utf-8");

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PASSWORD
  // );

  // wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./_SimpleStorage_sol_SimpleStorage.abi", "utf-8")
  const binary = fs.readFileSync(
    "./_SimpleStorage_sol_SimpleStorage.bin",
    "utf-8",
  )
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("Deploying, Please wait....")
  const contract = await contractFactory.deploy()
  await contract.deployTransaction.wait(1)
  console.log(`Contract Address: ${contract.address}`)
  // console.log("Here is the deployemt transaction: ");
  // console.log(contract.deployTransaction);
  // console.log("Here is the transaction receipt: ");
  // console.log(transactionReceipt);

  // console.log("Let's deploy with only transaction data!");
  // const nonce = await wallet.getTransactionCount();
  // const tx = {
  //   nonce: nonce,
  //   gasPrice: 20000000000,
  //   gasLimit: 6721975,
  //   to: null,
  //   value: 0,
  //   data: `0x${binary}`,
  //   chainId: 1337,
  // };

  // const sendTxResponce = await wallet.sendTransaction(tx);
  // await sendTxResponce.wait(1);
  // console.log(sendTxResponce);

  const currentFavoriteNumber = await contract.retrview()
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`)

  const transactionResponse = await contract.store(7)
  const transactionReceipt = await transactionResponse.wait(1)

  const updatedFavoriteNumber = await contract.retrview()
  console.log(`Updated Favorite Number: ${updatedFavoriteNumber.toString()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
