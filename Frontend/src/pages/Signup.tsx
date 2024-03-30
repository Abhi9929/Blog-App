/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MouseEvent, useState } from 'react'
import Header from "../components/auth/Header"
import SubHeading from '../components/auth/SubHeading'
import InputBox from '../components/auth/InputBox'
import Button from '../components/auth/Button'
import Bottom from '../components/auth/Bottom'
import { SignupType } from '@abhi.makedevs/common-01'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import InputBox2 from '../components/auth/InputBox2'

function Signup() {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const [nameError, setNameError] = useState('');
  const [mailError, setMailError] = useState<string>('');
  const [passError, setPassError] = useState<string>('');
  const [confirmPassError, setConfirmPassError] = useState<string>('');

  const [confirmPassword, setConfirmPassword] = useState<string>('');



  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    async function registerUser() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/signup`
          ,
          postInputs
        )
        const data = await response.data;
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.accessToken))
        navigate('/blogs');
      } catch (err) {
        //@ts-ignore
        const error = err?.response.data.error;
        setMailError(error)
      }
    }

    if (postInputs.password !== confirmPassword) {
      setConfirmPassError('Password didn\'t match');
      return;
    }
    if (postInputs.password.length < 8) {
      setPassError('password must be 8 characters')
      return;
    }
    if (postInputs.name?.length === 0) {
      setNameError('name is required');
      return;
    }
    else {
      registerUser();
      return;
    }
  }
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className='h-full w-full grid grid-cols-1 lg:grid-cols-2'>
        <div className=" flex flex-col justify-center items-center h-full">
          <div className=" rounded-lg bg-white  w-84 text-center p-2 h-max px-4">
            <Header label={"Create An Account"} />
            <SubHeading label={"Enter your Information to create an account"} />
            <InputBox
              type={"text"}
              label={"Name"}
              placeholder={"John"}
              value={postInputs.name}
              message={nameError}
              onchange={
                (event) => {
                  setPostInputs(prev => ({
                    ...prev,
                    name: event?.target.value
                  }))
                  setNameError('')
                }}
            />
            <InputBox
              type={"email"}
              label={"Email"}
              placeholder={"john@mail.com"}
              value={postInputs.email}
              message={mailError}
              onchange={
                (event) => {
                  setPostInputs(prev => ({
                    ...prev,
                    email: event?.target.value
                  }))
                  setMailError('')
                }}
            />
            <InputBox
              type={"password"}
              label={"Password"}
              placeholder={"123456"}
              value={postInputs.password}
              message={passError}
              onchange={
                (event) => {
                  setPostInputs(prev => ({
                    ...prev,
                    password: event?.target.value
                  }))
                  setPassError('')
                }}
            />
            <InputBox2
              type={"password"}
              label={"Confirm Password"}
              placeholder={"123456"}
              value={confirmPassword}
              message={confirmPassError}
              onchange={event => {
                setConfirmPassword(event?.target.value)
                setConfirmPassError('')
              }}
            />
            <Button
              label={"Sign up"}
              onclick={handleClick}
            />
            <Bottom
              warning={"Already have an account?"}
              to={"/signin"}
              label={"Sign in"}
            />
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


export default Signup