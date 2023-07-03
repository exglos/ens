const { expect } = require('chai')
const { ethers } = require('hardhat')
const { namehash } = require('ethers/lib/utils')

describe('ExglosSubdomainRegistrar', () => {
    let exglosSubdomainRegistrar, ens, exglosContractAddress
    const rootNode = namehash('exglos.eth')

    before(async () => {
        const ExglosSubdomainRegistrarFactory = await ethers.getContractFactory('ExglosSubdomainRegistrar')

        const TestENSRegistrar = await ethers.getContractFactory('ENSRegistry')

        ens = await TestENSRegistrar.deploy()
        await ens.deployed()

        exglosSubdomainRegistrar = await ExglosSubdomainRegistrarFactory.deploy(ens.address, rootNode)
        exglosContractAddress = exglosSubdomainRegistrar.address
        await exglosSubdomainRegistrar.deployed()
    })

    it('should should fail to register a contract with less than 2 symbols', async () => {
        const [signer, accountOne] = await ethers.getSigners()
        const label = 'f'
        const symbolLength = label.length // 1
        const labelHash = namehash(label) // ens bytes32 hash of the label
        const result = await exglosSubdomainRegistrar.connect(accountOne).setupExglosSubdomain(labelHash, symbolLength, accountOne.address)
        expect(result).to.be.revertedWith('Minimum symbol length is 2')
    })
})