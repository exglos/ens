import { ethers } from 'ethers'


export async function getSigner() {
    let provider

    if (window.ethereum == null) {
        provider = ethers.getDefaultProvider()
    }

    provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    return [signer, provider]
}

export async function getExglosInstance() {
    const [signer, provider] = await getSigner()
    // const exglosInstance = new ethers.Contract('', abi, signer)
    // return signer
}

