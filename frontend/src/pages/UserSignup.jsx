import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userData, setUserData] = useState({})

  //two way binding//
  const submitHandler = (e)=>{

    setUserData({
      fullName:{
        firstName:firstName,
        lastName:lastName,
      },   
        email:email,
        password:password,
     
    })
    
    e.preventDefault()
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
    
  }
  
  return (
    <div>
       <div className="flex flex-col justify-between h-screen p-7">
      <div>
      <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        
        <h3 className="mb-2 font-lg medium text-">What's your name</h3>
        <div className='flex gap-4 mb-5'>
        <input 
          required
          className=" px-4 py-2 text-base bg-[#eeeeee] border rounded placeholder:text-sm w-1/2"
          type="text"
          placeholder="First Name" 
          value={firstName}
          onChange={(e)=>{
            setFirstName(e.target.value)
          }}/>
          
          <input 
          required
          className=" px-4 py-2 text-base bg-[#eeeeee] border rounded placeholder:text-sm w-1/2"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e)=>{
            setLastName(e.target.value)
          }} />
          
        </div>

        
        <h3 className="mb-2 font-lg medium text-">What's your email</h3>
        <input 
          required
          className="w-full px-4 py-2 text-base bg-[#eeeeee] border rounded placeholder:text-sm mb-5"
          type="email"
          placeholder="email@example.com" 
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }} />

          
        <h3 className="mb-2 font-lg medium text-">Enter Password</h3>
        <input 
          required 
          
          className="w-full px-4 py-2 text-base bg-[#eeeeee] border rounded placeholder:text-sm mb-5"
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }} />
          
          
        <button className="w-full px-4 py-2 text-lg bg-[#111] rounded placeholder:text-base mb-3 text-white font-semibold"
        >Login</button>

        <p className="text-center">
          Already have an account? <Link to="/login" className="text-blue-600">login here</Link>
        </p>
      </form>
      </div>
      <div>
          <p className='text-[10px]'>By proceeding, you consent to get calls, SMS or Whatsapp including by automated means, from Uber and its affilate to the number provided.</p>
      </div>
    </div>
    </div>
   
  )
}

export default UserSignup