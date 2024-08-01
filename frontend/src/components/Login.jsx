import React, { useState } from 'react'
import TextInput from './shared/TextInput'
import { GoogleLogin } from '@react-oauth/google'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dataToSend = {
    email: email.trim().toLowerCase(),
    password,
  }
  return (
    <div className=" mx-auto flex flex-col  rounded-2xl  justify-center items-center">
      <h1 className="mt-4 font-semibold text-3xl">Login to Medishop</h1>
      <div className="max-w-xl bg-[#F6F7F8] border-2 border-red-200 m-8 w-full p-4 text-black rounded-lg  ">
        <TextInput
          label={'Email Address'}
          placeholder={'Enter your email address'}
          type={'text'}
          value={email}
          onChange={setEmail}
        />

        <TextInput
          label={'Password'}
          placeholder={'Enter Password'}
          type="password"
          value={password}
          onChange={setPassword}
        />

        <div className="flex items-center justify-between mt-4">
          <h5 className="text-sm group">
            Don't Have an account?{' '}
            <a
              href=""
              className="group-hover:text-blue-500 hover:text-blue-400 underline"
            >
              Register
            </a>
          </h5>
          <button
            className="relative w-[150px]  my-4  px-4 py-1 rounded-full bg-zinc-900 isolation-auto z-10 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-600 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
            onClick={() => alert('submitted')}
          >
            Login
          </button>
        </div>

        <div>
          <h1 className="w-full text-sm text-zinc-400 text-center">- OR -</h1>
          <div className="p-4 w-full items-center justify-center flex">
            <GoogleLogin
              theme="filled_black"
              onSuccess={async (credentialResponse) => {
                const { credential } = credentialResponse
                try {
                  const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/user/google`,
                    { token: credential },
                    {
                      withCredentials: true,
                    }
                  )
                  // Handle success (e.g., save token, redirect, etc.)
                  console.log('User authenticated successfully', res.data)
                } catch (error) {
                  console.error('Google authentication failed', error)
                }
              }}
              onError={() => {
                console.log('Login Failed')
              }}
            />
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default Login
