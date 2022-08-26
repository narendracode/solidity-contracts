import dotenv from "dotenv"
dotenv.config()

import { ethers } from "hardhat";
const functionSelectorAddress: string = process.env.FUNCTION_SELECTOR as string;

import FunctionSelectorABI from './functionSelector.json';

async function main() {
    const accounts = await ethers.getSigners();
    const user = accounts[0];
    const functionSelector = new ethers.Contract(functionSelectorAddress, FunctionSelectorABI, user);
    console.log(`Sending request for reading function selector`)
    const result = await functionSelector.getSelector('cancelList(address,uint256)')
    console.log(`result  : ${result}`)
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});