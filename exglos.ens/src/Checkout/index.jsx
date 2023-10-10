import { useParams } from 'react-router-dom'
import { Nav } from '../components'
import { ethers } from 'ethers'
import { getSigner } from '../ens';

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

    return { label, labelSize, charge: 0.01 }

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

  const handleSubmit = async () => {
    const [signer, provider] = await getSigner()
    const txObj = {
      to: '0x484ffaa4c9a777f9df5cef36bd96e3bb44716d5c',
      value: ethers.parseUnits(`${charge}`, 'ether')
    }

    try {
      const tx = await signer.sendTransaction(txObj)
      const claimObj = {
        tx,
        txObj
      }
      

      const result = await fetch(process.env.REACTAPP_API, JSON.stringify(claimObj))
      const res = await result.json()
      alert(tx)
    } catch (error) {
      alert("Failed" + error?.message)
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
              <h3 className="">Confirm</h3>
              <div className="card-body">
                <span><b>Summary</b></span>
                <p>Claiming: <b>{label}.exglos.eth</b></p>
                <p>1. Symbol size: <b>{labelSize} characters </b></p>
                <p>2. Total cost(Gas fee not included): <b>{charge}eth</b></p>
                <div class="d-grid gap-2">
                  <button type="button" name="" id="" class="btn btn-primary" onClick={handleSubmit}>Claim {label}.exglos.eth now</button>
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