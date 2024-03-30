/* eslint-disable @typescript-eslint/no-explicit-any */

function Avatar({avatar}: {avatar: any}) {

    const authorName = avatar?.split('')[0].toUpperCase();
    
    return (
        <div className="profile-pic w-[2rem] h-[2rem] rounded-full bg-[#FFC017] flex justify-center items-center text-white font-semibold text-sm">{authorName}</div>)
}

export default Avatar