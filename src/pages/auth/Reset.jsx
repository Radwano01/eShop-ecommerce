import React, { useState } from 'react'
import "./auth.scss"
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import resetImg from "../../assets/forgot.png"
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';

const Reset = () => {

  const [Email, setEmail] = useState()
  const [loading, setLoading] = useState(false)

  const handleResetPassword =(e)=>{
    e.preventDefault()
    setLoading(true)
    sendPasswordResetEmail(auth, Email)
    .then(()=>{
      setLoading(false)
      alert("Check your email for a reset link")
    })
    .catch((err)=>{
      alert(err.message)
      setLoading(false)
    })

  }

  return (
    <>
    {loading && <Loader/>}
      <section className={`container ${"auth"}`}>
        <div className="img">
          <img src={resetImg} alt="Reset Password" width="400" />
        </div>

        <Card>
          <div className="form">
            <h2>Reset Password</h2>

            <form onSubmit={handleResetPassword}>
              <input
                type="text"
                placeholder="Email"
                required
                value={Email}
                onChange={(e)=> setEmail(e.target.value)}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Reset Password
              </button>
              <div className="links">
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
}

export default Reset