import dotenv from "dotenv"
dotenv.config()

import { ethers } from "hardhat";
const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');
const erc721Address: string = process.env.ERC721_ADDRESS as string;

import ERC721ABI from './erc721abi.json';
const relayerAPIKey: string = process.env.RELAYER_API_KEY as string;
const relayerAPISecret: string = process.env.RELAYER_API_SECRET as string;
const credentials = { apiKey: relayerAPIKey, apiSecret: relayerAPISecret };
const provider = new DefenderRelayProvider(credentials);
const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
const erc721 = new ethers.Contract(erc721Address, ERC721ABI, signer);

async function main() {
    console.log(`Sending request for reading tokenURI`)
    const result = await erc721.tokenURI('3');
    console.log(`result  : ${result}`)
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});