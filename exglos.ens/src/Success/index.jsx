import { useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import { ethers } from 'ethers'

function Success() {
    const { txHash } = useParams()

    return (
        <main>
            <Nav />
            <div className="container" style={{ marginTop: "5rem" }}>
                <div className="row">
                    <div className="col-md-6 col-sm-7 mx-auto">
                        <div className="card p-3">
                            <h3 className="">Confirm</h3>
                            <div className="card-body">
                                <p>Claim submitted! <pre>{txHash}</pre></p>
                                <p>exglos.eth shall issue the claimed subdomain in not less than 24hours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Success