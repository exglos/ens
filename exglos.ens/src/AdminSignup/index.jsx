import React from 'react'
import { Nav } from '../components'


function AdminSignup() {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto" style={{ marginTop: "8rem" }}>
            <div className="card p-4">
              <h2 className="mx-auto">Sign Up</h2>
              <form>
                <div className="form-group m-4">
                  <label htmlFor="exampleInputEmail1">Email address | Ethereum Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group m-4">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
               <div className="form-group m-4">
               <button type="submit" className="btn btn-primary mx-2">
                  Submit
                </button>
               </div>
                <div className="form-group mx-4">
                  <small>Got an account already? <a href="/join">Login</a></small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSignup
