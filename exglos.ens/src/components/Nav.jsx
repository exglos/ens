
import React, { useEffect } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'

import { getSigner } from '../ens';

const ONBOARD_TEXT = 'Click here to install MetaMask!'
const CONNECT_WALLET = 'Connect Metamask Wallet'

export function Nav() {
    // onboarding button text
    const [buttonText, setButtonText] = React.useState('')

    const onboarding = React.useRef()
    const [accounts, setAccounts] = React.useState([])

    const [account, setCurrentAccount] = React.useState('')
    const [signer, setSigner] = React.useState('')

    useEffect(() => {
        if (!onboarding.current) {
            // create an instance fo MetamaskOnboarding class when component mounts for the first time
            onboarding.current = new MetaMaskOnboarding()
        }
    }, [])

    useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            setButtonText(CONNECT_WALLET)
            onboarding.current?.stopOnboarding()
        } else {
            setButtonText(ONBOARD_TEXT)
        }
    }, [])

    // connect initialize onboarding or connect wallet
    const connectWallet = async () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            try {

                const [_signer, provider] = await getSigner()
                const address = await _signer.getAddress()
                setSigner(_signer)
                setButtonText(address)
                setCurrentAccount(address)
            } catch (e) {
                alert(e.message)
                console.log(e)
            }
        } else {
            // opens a new tab to the <chrome | firefox> store for user to install the MetaMask browser extension
            onboarding.current?.startOnboarding()
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Exglos ENS
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/#pricing">
                                Pricing
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/join">
                                Sign Up
                            </a>
                        </li>


                    </ul>
                </div>
                <span className="badge rounded-pill text-bg-primary">{accounts[0]}</span>
                <button type="button"
                    onClick={connectWallet}
                    className="btn btn-outline-primary">
                    {buttonText}
                </button>
            </div>
        </nav>
    )
}
