import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // For HTTP requests
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email,
        password,
      };

      console.log("All environment variables:", import.meta.env);
      const baseUrl = import.meta.env.VITE_BASE_URL;
      console.log("VITE_BASE_URL:", baseUrl);
      if (!baseUrl) {
        throw new Error("VITE_BASE_URL is not defined");
      }

      // API request to register the user
      const response = await axios.post(
        `${baseUrl}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;

        // Save user data to context
        setUser(data.user);
        localStorage.setItem("token", data.token); //basically for useProtect wrapper stuff , if user reload the page the data will go away so instead of on user we are being depend on tokens !//

        // Redirect to home
        navigate("/home");

        // Reset form fields
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
      }
    } catch (error) {
      console.error(error);
      // Handle errors from the server
      if (error.response) {
        setErrorMessage(error.response.data.message || "Registration failed!");
      } else {
        setErrorMessage("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="mb-2 font-lg medium">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              className="px-4 py-2 text-base bg-[#eeeeee] border rounded placeholder:text-sm w-1/2"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              required
              className="px-4 py-2 text-base bg-[#eeeeee] border rounded placeholder:text-sm w-1/2"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="mb-2 font-lg medium">What's your email</h3>
          <input
            required
            className="w-full px-4 py-2 text-base bg-[#eeeeee] border rounded placeholder:text-sm mb-5"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="mb-2 font-lg medium">Enter Password</h3>
          <input
            required
            className="w-full px-4 py-2 text-base bg-[#eeeeee] border rounded placeholder:text-sm mb-5"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && (
            <p className="mb-3 text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-lg bg-[#111] rounded placeholder:text-base mb-3 text-white font-semibold"
          >
            Create Account
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px]">
          By proceeding, you consent to get calls, SMS or Whatsapp including by
          automated means, from Uber and its affiliate to the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;