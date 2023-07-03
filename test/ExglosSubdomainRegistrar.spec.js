const { expect } = require('chai')
const { ethers } = require('hardhat')
const { namehash } = require('ethers/lib/utils')

describe('ExglosSubdomainRegistrar', () => {
    let exglosSubdomainRegistrar, ens
    const rootNode = namehash('exglos.eth')
    console.log(rootNode)

    before(async () => {
        const ExglosSubdomainRegistrarFactory = await ethers.getContractFactory('ExglosSubdomainRegistrar')

        const TestENSRegistrar = await ethers.getContractFactory('ENS')

        ens = await TestENSRegistrar.deploy()
        await ens.deployed()

        exglosSubdomainRegistrar = await ExglosSubdomainRegistrarFactory.deploy(ens.address, rootNode)
        await exglosSubdomainRegistrar.deployed()

    })

    it('should should register a contract with 1 symbol', async () => {
        const [signer, accountOne] = await ethers.getSigners()

    })
})