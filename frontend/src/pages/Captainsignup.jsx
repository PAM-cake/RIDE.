import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { UserDataContext } from "../context/UserContext";

const Captainsignup = () => {
  
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState(""); // Add this line

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')


  const { captain, setCaptain } = useContext( CaptainDataContext)
  const { setUser } = useContext(UserDataContext);

  //two way binding//
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      console.error(err);
      setError("Error occurred during registration. Please try again.");
    }
  
    // Clear the form fields after submission
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  
  return (
    <div className='flex flex-col justify-between h-screen px-5 py-5'>
    <div>
      <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

      <form onSubmit={(e) => {
        submitHandler(e)
      }}>

        <h3 className='w-full mb-2 text-lg font-medium'>What's our Captain's name</h3>
        <div className='flex gap-4 mb-7'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
            type="text"
            placeholder='First name'
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
          <input
            required
            className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
            type="text"
            placeholder='Last name'
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
        </div>

        <h3 className='mb-2 text-lg font-medium'>What's our Captain's email</h3>
        <input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
          type="email"
          placeholder='email@example.com'
        />

        <h3 className='mb-2 text-lg font-medium'>Enter Password</h3>

        <input
          className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          required type="password"
          placeholder='password'
        />

        <h3 className='mb-2 text-lg font-medium'>Vehicle Information</h3>
        <div className='flex gap-4 mb-7'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Vehicle Color'
            value={vehicleColor}
            onChange={(e) => {
              setVehicleColor(e.target.value)
            }}
          />
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Vehicle Plate'
            value={vehiclePlate}
            onChange={(e) => {
              setVehiclePlate(e.target.value)
            }}
          />
        </div>
        <div className='flex gap-4 mb-7'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="number"
            placeholder='Vehicle Capacity'
            value={vehicleCapacity}
            onChange={(e) => {
              setVehicleCapacity(e.target.value)
            }}
          />
          <select
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value)
            }}
          >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
          </select>
        </div>

        <button
          className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Create Captain Account</button>
        {error && <p className="error">{error}</p>} {/* Display error message */}
      </form>
      <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
    </div>
    <div>
      <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
    </div>
  </div>
)
}
export default Captainsignup