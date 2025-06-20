// Import ethers (if using Node.js, otherwise use a script tag in browser)
const { ethers } = require("ethers");

// Replace with your deployed contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

// ABI for the DecentralizedVotingSystem contract
const contractABI = [
  "function addCandidate(string memory _name) public",
  "function vote(uint _candidateId) public",
  "function getCandidate(uint _candidateId) public view returns (string memory, uint)",
  "function candidatesCount() public view returns (uint)"
];

async function main() {
  // Connect to Ethereum node (using local node or provider)
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // or use Infura, Alchemy URL

  // Replace with your wallet private key (for signing transactions)
  const privateKey = "YOUR_PRIVATE_KEY";
  const wallet = new ethers.Wallet(privateKey, provider);

  // Contract instance
  const votingContract = new ethers.Contract(contractAddress, contractABI, wallet);

  // Add candidate (only admin can do this)
  try {
    const tx = await votingContract.addCandidate("Alice");
    await tx.wait();
    console.log("Candidate 'Alice' added.");
  } catch (error) {
    console.error("Failed to add candidate:", error);
  }

  // Get total number of candidates
  const count = await votingContract.candidatesCount();
  console.log(`Total candidates: ${count.toString()}`);

  // Vote for candidate 1
  try {
    const tx = await votingContract.vote(1);
    await tx.wait();
    console.log("Successfully voted for candidate 1");
  } catch (error) {
    console.error("Voting failed:", error);
  }

  // Fetch candidate 1 details
  const candidate = await votingContract.getCandidate(1);
  console.log(`Candidate 1: Name = ${candidate[0]}, Votes = ${candidate[1].toString()}`);
}

main().catch(console.error);
