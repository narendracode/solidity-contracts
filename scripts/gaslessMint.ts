import dotenv from "dotenv"
dotenv.config()

const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');
import { ethers } from "hardhat";

const relayerAPIKey: string = process.env.RELAYER_API_KEY as string;
const relayerAPISecret: string = process.env.RELAYER_API_SECRET as string;
const erc721Address: string = process.env.ERC721_ADDRESS as string;
const credentials = { apiKey: relayerAPIKey, apiSecret: relayerAPISecret };
const provider = new DefenderRelayProvider(credentials);
const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
import ERC721ABI from './erc721abi.json';

const erc721 = new ethers.Contract(erc721Address, ERC721ABI, signer);

async function main() {
    console.log(`Sending request for minting new token.`)
    const tx = await erc721.functions.safeMint('0xa2AD2ad983779B2624cc9EA49188E96e4aF01F3B', 'ipfs://QmTPK5GQqo7EUgCEcWnN42bmjdrpa43gUKDDyHXFrdmdV8/24');
    console.log(`Waiting for token to be minted...`)
    await tx.wait();
    console.log(`minted : ${tx.hash}`)
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});