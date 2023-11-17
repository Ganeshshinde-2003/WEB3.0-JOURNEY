const { ethers, run, network } = require("hardhat");

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract....");

    // Deploy the contract
    const simpleStorage = await SimpleStorageFactory.deploy();

    console.log(`Deployed contract to: ${simpleStorage.target}`);

    // Additional verification if needed
    if (network.name === "sepolia" && process.env.ETHERSCAN_API_KEY) {
        try {
            await simpleStorage.deployTransaction.wait(6);
            await verify(simpleStorage.address, []);
        } catch (error) {
            console.error("Error during verification:", error);
        }
    }

    // Interaction with the contract
    try {
        const currentValue = await simpleStorage.retrview();
        console.log(`Current Value is: ${currentValue}`);

        const transactionResponse = await simpleStorage.store(10);
        await transactionResponse.wait(1);

        const updatedValue = await simpleStorage.retrview();
        console.log(`Updated value is: ${updatedValue}`);
    } catch (error) {
        console.error("Error during contract interaction:", error);
    }
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
    });
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
