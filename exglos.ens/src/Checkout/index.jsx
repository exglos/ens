import { useParams } from 'react-router-dom'
import Nav from '../components/Nav'

function Claim() {
    const { subdomain } = useParams()
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
                                <p>Claiming: <b>{subdomain}</b></p>
                                <p>1. Symbol size: <b>0</b></p>
                                <p>2. Total cost(Gas fee not included): <b>0.1eth</b></p>
                                <div class="d-grid gap-2">
                                    <button type="button" name="" id="" class="btn btn-primary">Confirm Purchase</button>
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