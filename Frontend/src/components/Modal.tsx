/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MdOutlineCancel } from "react-icons/md";

function Modal({ isOpen, onClose, children }: any) {
    if (!isOpen) return null;

    return (
        //@ts-ignore
        <div className="fixed top-0 left-0 w-full h-screen bg-[#fffcf3cc] z-[999] flex justify-center items-center">
            <div className=" bg-white px-32 h-[80%] shadow-lg flex justify-center items-center relative">
                <button className="absolute top-1 right-32 sm:right-2" onClick={onClose}>
                    <MdOutlineCancel className="text-3xl text-slate-800" />
                </button>
                {children}
            </div>
        </div>
    );
};


export default Modal