import React, { useEffect } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding'
import Web3 from 'web3'

import './App.css';
import { getSigner } from './ens';

const ONBOARD_TEXT = 'Click here to install MetaMask!'
const CONNECT_WALLET = 'Connect Wallet'

function App() {
  // onboarding button text
  const [buttonText, setButtonText] = React.useState('')


  // state to store the web3 instance
  const [web3, setWeb3] = React.useState(null)

  const [accounts, setAccounts] = React.useState([])

  const [account, setCurrentAccount] = React.useState('')
  const [signer, setSigner] = React.useState('')

  const onboarding = React.useRef()

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

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setButtonText(account)
        const [_signer, provider] = await getSigner()
        setSigner(_signer)
        handleAccounts(accounts)
        setCurrentAccount(accounts[0])
      } catch (e) {
        alert(e.message)
        console.log(e)
      }
    } else {
      // opens a new tab to the <chrome | firefox> store for user to install the MetaMask browser extension
      onboarding.current?.startOnboarding()
    }
  }

  const handleAccounts = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      alert('Please connect to MetaMask.')
    } else if (accounts[0] !== account) {
      setCurrentAccount(accounts[0])
      setAccounts(accounts)
      console.debug(web3)
      console.debug(account)
      console.debug(accounts)
    }
  }

  return (
    <>

      <main>
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
                  <a className="nav-link" href="#pricing">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <span className="badge rounded-pill text-bg-primary">{accounts[0]}</span>
            <button type="button"
              onClick={() => connectWallet()}
              className="btn btn-outline-primary">
              {buttonText}
            </button>
          </div>
        </nav>
        <div className="container" style={{ marginTop: "5rem" }}>
          <div className="row my-8">
            <div className="col-md-6 col-sm-7 my-8 mx-auto">
              <div className="card my-8 p-3">
                <h3 className="mx-auto">Exglos subdomains</h3>
                <p>
                  Search your favorite <small>.exglos.eth</small> Subdomain
                </p>
                <form className="d-flex">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        check subdomain
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder=""
                        aria-describedby="helpId"
                      />
                      <div className="d-grid gap-2 mb-2 mt-1">
                        <button
                          type="button"
                          name=""
                          id=""
                          className="btn btn-primary"
                        >
                          Search
                        </button>
                      </div>
                      <small id="helpId" className="text-muted">
                        Search your favorite exglos ENS subdomain(eg foo.exglos.eth)
                      </small>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: "5rem" }}>
          <div className="row">
            <h3>Pricing</h3>
            <p className="p3-m-3">
              Get your own ens domain{" "}
              <yourname>
                .exglos.eth Only for exglos holders. Do not rent, buy forever!
                Simple purchase without auctions and time delays. Price (not
                including gas price):
              </yourname>
            </p>
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
          </div>
        </div>
      </main>
    </>

  );
}

export default App;
