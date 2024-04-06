import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks";

function Account() {
    const navigate = useNavigate();
    const { userDetails } = useGetUser();

    let firstLetter = userDetails?.user.name;
    firstLetter = firstLetter?.split('')[0];
    const handleClick = () => {
        localStorage.removeItem("token");
        navigate('/blogs');
    }
    return (
        <div className="flex gap-4 items-center">
            
            <div className="w-10 h-10 flex justify-center items-center bg-black text-white rounded-full font-semibold uppercase">{firstLetter}</div>
            <button
                className="bg-black text-white hover:bg-gray-900 py-2 px-4 border-none rounded-full shadow text-base font-normal"
                onClick={handleClick}
            >
                Logout
            </button>
        </div>
    )
}

export default Account