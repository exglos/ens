const { ethers } = require('hardhat');

async function main() {
  // get contract to deploy
  const SubdomainRegistrar = await ethers.getContractFactory('SubdomainRegistrar')
  // https://docs.ens.domains/ens-deployments
  const SepoliaENSAddress = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85', sepoliaResolverAddress = '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD';


  const subdomainRegistrar = await SubdomainRegistrar.deploy([SepoliaENSAddress, sepoliaResolverAddress])
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
