const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", () => {
    let simpleStorageFactory
    let simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrview()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(7)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrview()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
