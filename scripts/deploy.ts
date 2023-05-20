import {ethers} from 'hardhat';
async function main() {
  // get contract to deploy
  const Greeter = await ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy()
  console.log(`Deployed to : ${greeter.address}`)

}

main().then(() => {
 console.log('Deploying smart contracts:')
  process.exit(0)
  console.log('Deployed!')
}).catch((error) => {
  console.error(error)
  process.exit(1)
})