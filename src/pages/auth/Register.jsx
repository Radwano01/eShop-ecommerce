import React, { useState } from 'react'
import registerImg from "../../assets/register.png"
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import "./auth.scss"
import Loader from "../../components/loader/Loader"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase/config"

const Register = () => {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [CPassword, setCPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!Password === CPassword){
      alert("Password do not match")
    }
     setLoading(true)

     createUserWithEmailAndPassword(auth, Email, Password)
     .then((users)=>{
      const user = users.user
      console.log(user)
      setLoading(false)
      alert("Registration Succesfull")
      navigate("/login")
     }).catch((err)=>{
      alert(err.message)
      setLoading(false)
     })
  }

  return (
    <>
      {loading && <Loader/>}
      <section className={`container ${"auth"}`}>
        <Card>
          <div className="form">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email"
                required
                value={Email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={Password}
                onChange={(e)=> setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={CPassword}
                onChange={(e)=> setCPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className='register'>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className="img">
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
