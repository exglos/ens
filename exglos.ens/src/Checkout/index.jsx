import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Nav } from '../components'
import { ethers } from 'ethers'
import { getSigner } from '../ens';
import EmailRegex from 'email-regexp'

function calculateMeta(subdomain) {

  const delimiter = ".";
  const index = subdomain.indexOf(delimiter);

  let label = '';
  let labelSize = 0;

  if (index == -1) {

    label = subdomain
  } else {
    label = subdomain.substring(0, index)
  }
  // pick up from here:
  // should take both .exglos.eth
  const secondaryLevelDomain = subdomain.substring(index + 1)
  labelSize = label.length


  if (labelSize === 2) {
    return { label, labelSize, charge: 1 }
  }

  if (labelSize === 3) {
    return { label, labelSize, charge: 0.1 }
  }

  if (labelSize === 4) {

    return { label, labelSize, charge: 0.01 }

  }
  if (labelSize === 5) {

    return { label, labelSize, charge: 0.001 }

  }
  if (labelSize >= 6) {

    return { label, labelSize, charge: 0 }

  }
  return { label, labelSize, charge: 0 }
}


function formatLabelData(subdomain) {
  const { label, labelSize, charge } = calculateMeta(subdomain)
  const output = calculateMeta(subdomain)
  console.log(output)
  let labelBytes = ""
  if (!label) return { label, labelSize, labelBytes, charge }
  // labelBytes = ethers.keccak256(label)
  console.log(labelBytes)

  return { labelBytes, label, labelSize, charge }

}

function Claim() {
  const { subdomain } = useParams()
  const { labelBytes, labelSize, label, charge } = formatLabelData(subdomain)
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    const [signer, provider] = await getSigner()
    // replace with contract call
    const txObj = {
      to: '0x484ffaa4c9a777f9df5cef36bd96e3bb44716d5c',
      value: charge === 0 ? "free" : ethers.parseUnits(`${charge}`, 'ether')
    }

    if (txObj.value === "free") {
      const claimObj = {
        txObj,
        email
      }
      try {
        const result = await fetch(process.env.REACTAPP_API, JSON.stringify(claimObj))
        console.log(result)
        alert(`${label} transfered to ${signer.address}`)
      } catch (error) {
        alert("Unkown error occured, try again")
      }
    } else {
      try {
        const tx = await signer.sendTransaction(txObj)
        const claimObj = {
          tx,
          txObj,
          email
        }

        const result = await fetch(process.env.REACTAPP_API, JSON.stringify(claimObj))
        const res = await result.json()
        alert(tx)
        alert(`${label} transfered to ${signer.address}`)
      } catch (error) {
        alert(`Failed ${error?.message}`)
      }
    }
  }

  const handleChange = (e) => {
    if (EmailRegex.isValid(e.target.value)) {
      setEmail(e.target.value)
    }
  }

  // fetch price info
  return (
    <main>
      <Nav />
      <div className="container" style={{ marginTop: "5rem" }}>
        <div className="row">
          <div className="col-md-6 col-sm-7 mx-auto">
            <div className="card p-3">
              <h3 className="">Confirm purchase of "{subdomain}.exglos.eth"</h3>
              <div className="card-body">
                <span><b>Summary</b></span>
                <p>Claiming: <b>{label}.exglos.eth</b></p>
                <p>1. Symbol size: <b>{labelSize} characters </b></p>
                <p>2. Total cost(Gas fee not included): <b>{charge === 0 ? "free" : `${charge} eth`}</b></p>
                <div className="form-group mb-4 mt-4">
                  <label htmlFor="exampleInputEmail1">3. Valid email Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                </div>

                <div class="d-grid gap-2">
                  <button type="button"
                    name="" id=""
                    class="btn btn-primary"
                    disabled={email ? false : true}
                    onClick={handleSubmit}>Claim {label}.exglos.eth now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Claim