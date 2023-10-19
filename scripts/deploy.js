const { ethers } = require('hardhat');

async function main() {
  // get contract to deploy
  const SubdomainRegistrar = await ethers.getContractFactory('SubdomainRegistrar')
  const SepoliaENSAddress = '', sepoliaResolverAddress = '';


  const subdomainRegistrar = await SubdomainRegistrar.deploy([SubdomainRegistrar, sepoliaResolverAddress])
  console.log(`Deployed to : ${subdomainRegistrar.address}`)

}

main().then(() => {
  console.log('Deploying smart contracts:')
  process.exit(0)
  console.log('Deployed!')
}).catch((error) => {
  console.error(error)
  process.exit(1)
})

// deploy via terminal:
// npx hardhat run --network <your-network> scripts/deploy.js
