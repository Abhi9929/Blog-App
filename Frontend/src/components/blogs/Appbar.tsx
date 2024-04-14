/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Modal from "../Modal";
import SigninModal from "../auth/SigninModal";
import Account from "../Account";

function Appbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if (token) {
      setIsModalOpen(false);
    } 
  }, [])
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  }


  return (
    <>
      <header className='w-full py-6 bg-[#FFC017] lg:bg-transparent border-b-[1px] border-black'>
        <div className='flex justify-between px-5 md:px-0 md:max-w-3xl lg:max-w-7xl mx-auto  '>
          <div className="logo w-fit flex items-center justify-center">
            <Link to={'/blogs'} className='text-xl font-bold '>Dev.Blogs</Link> 
          </div>
          <div className="flex gap-3">
            <button className='bg-green-400 hover:bg-[#1fda63] font-semibold text-base lg:text-lg py-2 px-4 rounded-full h-fit'
              onClick={(e) => {
                token === null ? handleClick(e) : navigate('/write')
              }
              }
            >
              Write
            </button>
            {token ? <Account /> : (
              <button className="Btn  rounded-full px-4 py-2 bg-black text-white font-md text-sm lg:text-lg w-fit"
                onClick={handleClick}
              >
                Get Started
              </button>)}
          </div>
        </div>
      </header >

      {/* Modal Box */}
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SigninModal />
        </Modal>
      </div >
    </>
  )
}

export default Appbar