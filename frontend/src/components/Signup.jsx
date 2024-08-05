import React, { useState } from 'react'
import TextInput from './shared/TextInput'
import { Link, useNavigate } from 'react-router-dom'
const FormSignup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const dataToSend = {
    firstName,
    lastName,
    email: email.trim().toLowerCase(),
    username,
    password,
  }
  return (
    <div className=" flex flex-col text-white  rounded-2xl  justify-center items-center">
      <h1 className="font-semibold text-center text-2xl">
        Create an Account on Medishop
      </h1>

      <div className="text-base w-full text-white rounded-lg  ">
        <TextInput
          label={'First Name'}
          placeholder={'Enter your First Name'}
          type={'text'}
          value={firstName}
          onChange={setFirstName}
        />

        <TextInput
          label={'Last Name'}
          placeholder={'Enter your Last Name'}
          type={'text'}
          value={lastName}
          onChange={setLastName}
        />
        <TextInput
          label={'Email Address'}
          placeholder={'Enter your email address'}
          type={'text'}
          value={email}
          onChange={setEmail}
        />

        <TextInput
          label={'What should we call you ?'}
          placeholder={'Enter your Username '}
          type={'text'}
          value={username}
          onChange={setUsername}
        />
        <TextInput
          label={'Create Password'}
          placeholder={'Enter a strong Password'}
          type="password"
          value={password}
          onChange={setPassword}
        />

        <div className="flex items-center justify-between mt-4">
          <h5 className="text-sm group">
            Already Have an account?{' '}
            <Link
              to={'/signin'}
              className="group-hover:text-blue-500 hover:text-blue-400 underline"
            >
              Login
            </Link>
          </h5>

          <button
            className="relative w-[150px]  my-4  px-4 py-1 rounded-full bg-zinc-900 isolation-auto z-10 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-600 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
            onClick={() => alert('submitted')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

const Signup = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full md:w-10/12 gap-4 flex-col md:flex-row flex h-fit p-2  bg-[#111518]  rounded-xl overflow-hidden">
        <div className="md:hidden w-full md:w-1/2 text-black my-auto flex justify-center items-center h-full max-h-[700px]">
          <FormSignup />
        </div>
        <div className="w-full flex justify-center my-auto items-center relative md:w-1/2 h-full max-h-[700px] overflow-hidden rounded-xl">
          <img className="rounded-xl " src={'/illus1.jpg'} alt="" />
          <div className=" capitalize flex flex-col justify-center items-baseline absolute p-6 top-0 left-0 w-full h-full">
            <h1 className="text-white lg:text-[5vw] text-6xl font-bold">
              Join us &
            </h1>
            <h1 className="text-white lg:text-[5vw] text-6xl font-bold">
              Experience Something New.
            </h1>
          </div>
        </div>
        <div className="  hidden md:flex w-full md:w-1/2 text-black my-auto  justify-center items-center h-fit max-h-[700px]">
          <FormSignup />
        </div>
      </div>
    </div>
  )
}
export default Signup
