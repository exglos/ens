import React from 'react'

function Admin() {

  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Subdomains Management Pane
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
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

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
          {/* <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody> */}
        </table>

      </div>
    </div>
  </>)
}

export default Admin