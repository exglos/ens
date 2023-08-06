import { ethers } from 'ethers'


export async function getSigner() {
    let provider

    if (window.ethereum === null) {
        provider = ethers.getDefaultProvider()
    }

    try {
        provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        return [signer, provider]

    } catch (error) {
        throw new Error(`Failed, please Install MetaMask Wallet before you proceed.`)
    }
}

export async function getExglosInstance() {
    const [signer, provider] = await getSigner()
    // const exglosInstance = new ethers.Contract('', abi, signer)
    // return signer
}
