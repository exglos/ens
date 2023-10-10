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

function UserHome({token}) {

    return (<>
        <Nav/>
        <div className="container p-2" style={{ marginTop: "5rem" }}>
            <div className="row">
                <h3>Pricing</h3>
                <div className="col-md-2">
                    <div className="card mt-2 p-2">
                        <h4>2 symbols</h4>
                        <p>1eth</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card mt-2 p-2">
                        <h4>3 symbols</h4>
                        <p>0.1eth</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card mt-2 p-2">
                        <h4>4 symbols</h4>
                        <p>0.01eth</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card mt-2 p-2">
                        <h4>5 symbols</h4>
                        <p>0.001eth</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card mt-2 p-2">
                        <h4>6(or more)</h4>
                        <p>free</p>
                    </div>
                </div>
                <div className="col-md-2" />
                <table className="table table-hover" style={{ marginTop: "5rem" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Subdomain</th>
                            <th scope="col">Price in Eth</th>
                            <th scope="col">Issued</th>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    </>)
}

export default UserHome
