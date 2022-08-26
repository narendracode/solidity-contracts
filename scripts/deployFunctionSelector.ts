import { ethers } from "hardhat";

async function main() {
    const FunctionSelectorContract = await ethers.getContractFactory("FunctionSelector");
    const FunctionSelector = await FunctionSelectorContract.deploy();
    await FunctionSelector.deployed();
    console.log("FunctionSelector deployed to:", FunctionSelector.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});