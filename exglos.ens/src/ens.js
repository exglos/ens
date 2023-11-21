import { ethers } from 'ethers'
// import { ENS } from '@ensdomains/ensjs'

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
        throw new Error(`Failed, please Install MetaMask Wallet before you proceed.` + error)
    }
}

export async function getExglosInstance() {
    const [signer, provider] = await getSigner()
    // const exglosInstance = new ethers.Contract('', abi, signer)
    // return signer
}

// export async function getENSInstance() {
//     try {
//         const [signer, provider] = await getSigner()
//         const ens = new ENS()
//         await ens.setProvider(provider)
//         return ens
//     } catch (error) {
//         throw new Error('Failed to create ENS instance')
//     }
// }

// export async function transferName(owner, subdomain) {
//     try {
//         // @Todo: autocreate with smart contract and autotransfer
//         const ensInstance = await getENSInstance()
//         const ensResult = await ensInstance.setName('exglos.eth')
//         const res = await ensInstance.createSubname(subdomain)
//         const result = await ensInstance.registerName()
//     } catch (error) {

//     }
// }