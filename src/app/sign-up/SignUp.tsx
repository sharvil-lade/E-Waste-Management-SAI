/* eslint-disable react/no-unescaped-entities */
import React, { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState("buyer"); // State for role selection (buyer/seller)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const register = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://elocate-server.onrender.com/api/v1/auth/register",
        { ...formData, role }
      );

      toast.success("Registration Successful!");
      window.location.href = "/sign-in";
    } catch (error: any) {
      console.error("Register failed:", error);
      toast.error(`Registration Failed. ${error.response.data.message}`);
    }
  };

  return (
    <>
      <div className="my-3 text-center">
        <span className="text-4xl font-bold">Welcome to Elocate</span>
        <span className="font-light text-gray-400 mb-4">
          Please enter your details to register
        </span>
      </div>

      {/* Role Selection as Buttons */}
      <div className="mx-auto w-4/5 md:w-256">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-40 py-2 font-bold rounded-md ${
              role === "buyer"
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => handleRoleChange("buyer")}
          >
            Buyer
          </button>
          <button
            className={`px-40 py-2 font-bold rounded-md ${
              role === "seller"
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => handleRoleChange("seller")}
          >
            Seller
          </button>
        </div>

        <div className="relative flex flex-col p-6 bg-white shadow-2xl rounded-2xl">
          {/* Common Fields for Both Buyer and Seller */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="py-4">
              <span className="mb-2 text-md">UserName</span>
              <input
                type="text"
                className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                name="username"
                id="username"
                placeholder="User Name"
                onChange={handleInputChange}
                value={formData.username}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 px-4 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={handleInputChange}
                value={formData.password}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Phone Number</span>
              <input
                type="text"
                className="w-full p-2 px-4 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Full Name</span>
              <input
                type="text"
                className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                onChange={handleInputChange}
                value={formData.fullName}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Confirm Password</span>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={handleInputChange}
                value={formData.confirmPassword}
                required
              />
            </div>
          </div>

          {/* Additional Fields for Buyer */}
          {role === "buyer" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="py-4">
                <span className="mb-2 text-md">Preferred Pickup Location</span>
                <input
                  type="text"
                  className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="budgetRange"
                  placeholder="Preferred Pickup Location"
                  onChange={handleInputChange}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Type of E-Waste</span>
                <input
                  type="text"
                  className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="propertyType"
                  placeholder="Type of E-Waste"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between py-4">
          <label className="flex text-xl">
            <input
              type="checkbox"
              name="ch"
              id="ch"
              placeholder="checkbox"
              className="ml-8 p-1"
              onClick={togglePasswordVisibility}
            />
          </label>
          <span className="md:-ml-120"> Show Password</span>
          <Link href="/forget-password" className="font-bold text-black">
            Forgot Password?
          </Link>
        </div>

        {!passwordMatch && (
          <div className="text-red-600 text-sm">
            Password and Confirm Password do not match.
          </div>
        )}

        <button
          className="w-full bg-black mt-4 text-white p-2 rounded-lg mb-6 hover:bg-emerald-400 hover:text-black hover:border hover:border-gray-300"
          onClick={register}
        >
          Sign Up
        </button>

        <div className="text-center text-gray-400">
          Already have an account?
          <Link
            href="/sign-in"
            className="font-bold text-black hover:text-emerald-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
