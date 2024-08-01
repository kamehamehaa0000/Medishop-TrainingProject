import React, { useState } from 'react'
import TextInput from './shared/TextInput'
const Signup = () => {
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
    <div className=" mx-auto flex flex-col  rounded-2xl  justify-center items-center">
      <h1 className="mt-4 font-semibold text-center text-3xl">
        Create an Account on Medishop
      </h1>

      <div className="max-w-xl bg-[#F6F7F8] border-green-200 m-8 w-full p-4 text-black rounded-lg border-2 ">
        <div className="flex">
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
        </div>
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
            <a
              href=""
              className="group-hover:text-blue-500 hover:text-blue-400 underline"
            >
              Login
            </a>
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

export default Signup
