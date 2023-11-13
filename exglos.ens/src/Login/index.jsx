import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAuth } from '../Redux/authSlice'
import { Nav } from '../components'
import { Navigate, useLocation } from 'react-router-dom'
import Home from '../Home'
import UserHome from '../UserHome'

function UserLogin() {
  // const auth = useSelector((state) => state?.auth)
  const auth = localStorage.getItem('token')
  const dispatch = useDispatch()
  const location = useLocation()
  const [token, setToken] = useState(null)
  const [isAuth, setIsAuth] = useState(true)
  const [user, setUser] = useState(null)

  const handleLoginWithGoogle = async () => {
    const authRes = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    console.log(authRes.user)
    const token = await authRes.user.getIdToken()
    console.log(token)
    dispatch(updateAuth({ jwt: token, isAuth: true }))

  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (authState) => {
      setUser(user)
      authState.getIdToken().then((token) => {
        setToken(token)
        localStorage.setItem('token', token)
        setIsAuth(true)
      })
    })
  }, [])

  return (
    <>
      {!isAuth ? (<div>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-md-5 mx-auto" style={{ marginTop: "8rem" }}>
              <div className="card p-4">
                <div className="form-group m-2 mx-auto">
                  <h2 className="">Login</h2>
                  <p>Please use Google to prevent spam and abuse.</p>
                  <button onClick={handleLoginWithGoogle} type="submit" className="btn btn-primary mx-auto">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" /> | Login with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>) : <UserHome user={user} />}
    </>
  )
}

export default UserLogin