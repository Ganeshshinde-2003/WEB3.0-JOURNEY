// const ethers = require("ethers")
// const fs = require("fs-extra")
// require("dotenv").config()

import {ethers} from "ethers"
import * as fs from "fs-extra"
import "dotend/config"

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!)
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY!,
    process.env.PASSWORD,
  )

  console.log(encryptedJsonKey)
  fs.writeFileSync("./.encryptdKey.json", encryptedJsonKey)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
