/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent } from 'react'
import Header from '../components/auth/Header'
import SubHeading from '../components/auth/SubHeading'
import InputBox from '../components/auth/InputBox'
import Button from '../components/auth/Button'
import Bottom from '../components/auth/Bottom'
import { useState } from 'react'
import { SigninType } from '@abhi.makedevs/common-01'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SigninType>({
    email: '',
    password: ''
  })
  const [error, setError] = useState('');
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    async function signInUser() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/signin`
          ,
          postInputs
        )
        const data = await response.data;
        localStorage.setItem("token", JSON.stringify(data.accessToken))
        navigate('/blogs');
      } catch (err) {
        //@ts-ignore
        const error = err?.response.data.error;
        setError(error)
        console.log("error occurs: ", error);
      }
    }
    signInUser();
  }

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className='h-full w-full grid grid-cols-1 lg:grid-cols-2'>
        <div className=" flex flex-col justify-center items-center h-full">
          <div className=" rounded-lg bg-white  w-80 text-center p-2 h-max px-4">
            <Header label={"Signin"} />
            <SubHeading label={"Enter your Information to login"} />
            <InputBox
              type='email'
              label={"Email"}
              placeholder={"john@mail.com"}
              value={postInputs.email}
              onchange={
                (event) => {
                  setPostInputs(prev => ({
                    ...prev,
                    email: event?.target.value
                  }))
                  setError('')
                }}
              message={error}
            />
            <InputBox
              type='password'
              label={"Password"}
              placeholder={"123456"}
              value={postInputs.password}
              onchange={
                (event) => {
                  setPostInputs(prev => ({
                    ...prev,
                    password: event?.target.value
                  }))
                  setError('')
                }}
              message={error}
            />
            <Button label={"Sign In"} onclick={handleClick} />
            <Bottom warning={"Create an account?"} to={"/signup"} label={"Sign up"} />
          </div>
        </div>
        <div className=' hidden lg:grid place-items-center bg-slate-100'>
          <div className=' max-w-2xl p-3'>
            <h2 className='font-bold text-3xl'>
              "The Customer service I received was exceptional. the support team went above and beyond two addresses my concerns."
            </h2>

            <p className='font-semibold text-lg mt-2'>Jules Winnfield</p>
            <p className='text-slate-800'>CEO, Acme inc</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin