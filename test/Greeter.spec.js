const {expect} = require('chai')
const {ethers } = require('hardhat')

describe('Greeter', () => {
  it('should return the new greeting onces it has been changed', async () => {
    const Greeter = await ethers.getContractFactory('Greeter')
    const greeter = await Greeter.deploy('Hello world!')
    await greeter.deployed() // wait for the depoyment

    expect(await greeter.greet()).to.equal('Hello world!')

    /// a signing tx
    const setGreetingTx = await greeter.setGreeting("Hola senor pinyata!")
    console.log(typeof setGreetingTx)
    await setGreetingTx.wait() // wait for tx to be mined


    expect(await greeter.greet()).to.equal('Hola senor pinyata!')
  })
})