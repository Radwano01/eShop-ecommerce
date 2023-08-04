import React, { useState } from 'react'
import loginImg from "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import {FaGoogle} from "react-icons/fa"
import "./auth.scss"
import Card from "../../components/card/Card"
import Loader from '../../components/loader/Loader'
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_USER } from '../../redux/Slice'

const Login = () => {

  const [Email, setEmail] = useState("")
  const [Password , setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const previousURL = useSelector((state)=> state.cart.previousURL)

  const redirectUser = ()=>{
    if(previousURL.includes("cart")){
      return navigate("/cart")
    }
     navigate("/")
  }



  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth, Email, Password)
    .then((users)=>{
      const user = users.user
      setLoading(false)
      alert("Login Succesful...")
      dispatch(SET_ACTIVE_USER({
        email: user.email,
        userName: user.displayName,
        userID: user.uid,
        
      }))
      redirectUser()
    }).catch((err)=>{
      setLoading(false)
      alert(err.message)
    })
  }

    const provider = new GoogleAuthProvider()
    const handleSignWithGoogle =()=>{
      signInWithPopup(auth, provider)
      .then((result)=>{
        const user = result.user
        alert("Login Successfully")
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName,
          userID: user.uid,
        }))
        redirectUser()
      })
      .catch((err)=>{
        alert(err.message)
      })
    }

  return (
    <>
      {loading && <Loader/>}
      <section className={`container  ${"auth"}` }>
        <div className="img">
          <img src={loginImg} alt="" width="400"/>
        </div>
        <Card>
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Email'
              required
              value={Email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password'
              required
              value={Password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <button
            type='submit' className='--btn --btn-primary --btn-block'>Login</button>
          </form>
            <div className="links">
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>--or--</p>
            <button className='--btn --btn-danger --btn-block' onClick={handleSignWithGoogle}><FaGoogle color="#fff"/>Login with Google</button>
            <span className='register'>
              <p>Don't have an account? </p>
              <Link to="/register"> Register</Link>
            </span>
        </div>
        </Card>
      </section>
    </>
  )
}
export default Login