import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [searchTitle, setSearchTitle] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        navigate(`/search?title=${searchTitle}`);
    }

    return(
        <div className="w-screen flex justify-between px-8 py-4 bg-slate-900">
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                <img src={logo} className="" />
            </div>
            <form className="w-1/3" onSubmit={handleFormSubmit}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center ml-3">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-500" />
                    </div>
                    <input className="block w-full p-4 pl-10 pr-24 focus:outline-slate-700 text-sm text-gray-900 rounded-lg bg-slate-300" onChange={(e) => setSearchTitle(e.target.value)}/>
                    <button type="submit" className="text-white absolute right-2 bottom-2 bg-slate-900 focus:outline-none font-medium rounded-lg text-xs px-5 py-2.5 hover:bg-slate-800 active:bg-slate-600">Search</button>
                </div>
            </form>
            <div className="flex items-center cursor-pointer gap-x-2" onClick={() => navigate("/login")}>
                <UserCircleIcon className="h-7 w-7 text-white" />
                <span className="text-white">Login</span>
            </div>
        </div>
    )
}

export default Navbar;