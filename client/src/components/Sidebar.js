import { HomeIcon, RocketLaunchIcon, ClipboardDocumentListIcon, Bars3Icon, BookmarkIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();

    return (
        <div className={`sticky h-screen top-0 ${ open ? "w-64" : "w-20" } bg-dark-purple p-5 bg-slate-900`} >
          <div className="flex items-center">
            <Bars3Icon className="w-6 h-6 ml-2 text-white cursor-pointer" onClick={() => setOpen(!open)} />
          </div>
          <ul className="mt-6">
            <li className="flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center gap-x-4 bg-light-white mt-2 hover:bg-slate-800" onClick={() => navigate("/")}>
                <HomeIcon className="h-6 w-6" />
                <span className={`${!open && "hidden"} origin-left`}>
                    Home
                </span>
            </li>
            <li className="flex  rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center gap-x-4 bg-light-white mt-2 hover:bg-slate-800" onClick={() => navigate("/discover")}>
                <RocketLaunchIcon className="h-6 w-6" />
                <span className={`${!open && "hidden"} origin-left`}>
                    Discover
                </span>
            </li>
            <li className="flex justify-between rounded-md p-2 cursor-pointer text-gray-300 text-sm bg-light-white mt-2 hover:bg-slate-800" onClick={() => setToggle(!toggle)}>
                <div className="flex gap-x-4">
                    <ClipboardDocumentListIcon className="h-6 w-6" />
                    <span className={`${!open && "hidden"} origin left`}>
                        Genre
                    </span>
                </div>
                { toggle ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" /> }
            </li>
            <li className={`${!toggle && "hidden"} flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center bg-light-white mt-2 hover:bg-slate-800`} onClick={() => { setToggle(!toggle); navigate("/search?genre=Sci-Fi") }}>
                <span className={`${!open && "hidden"} origin left`}>
                    Sci-Fi
                </span>
            </li>
            <li className={`${!toggle && "hidden"} flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center bg-light-white mt-2 hover:bg-slate-800`} onClick={() => { setToggle(!toggle); navigate("/search?genre=Action") }}>
                <span className={`${!open && "hidden"} origin left`}>
                    Action
                </span>
            </li>
            <li className={`${!toggle && "hidden"} flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center bg-light-white mt-2 hover:bg-slate-800`} onClick={() => { setToggle(!toggle); navigate("/search?genre=Drama") }}>
                <span className={`${!open && "hidden"} origin left`}>
                    Drama
                </span>
            </li>
            <li className={`${!toggle && "hidden"} flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center bg-light-white mt-2 hover:bg-slate-800`} onClick={() => { setToggle(!toggle); navigate("/search?genre=Comedy") }}>
                <span className={`${!open && "hidden"} origin left`}>
                    Comedy
                </span>
            </li>
            <li className={`${!toggle && "hidden"} flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center bg-light-white mt-2 hover:bg-slate-800`} onClick={() => { setToggle(!toggle); navigate("/search?genre=Horror") }}>
                <span className={`${!open && "hidden"} origin left`}>
                    Horror
                </span>
            </li>
            <li className={`${!toggle && "hidden"} flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center bg-light-white mt-2 hover:bg-slate-800`} onClick={() => { setToggle(!toggle); navigate("/search?genre=Fantasy") }}>
                <span className={`${!open && "hidden"} origin left`}>
                    Fantasy
                </span>
            </li>
            <li className="flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center gap-x-4 bg-light-white mt-2 hover:bg-slate-800">
                <BookmarkIcon className="h-6 w-6" />
                <span className={`${!open && "hidden"} origin-left`}>
                    Favorites
                </span>
            </li>
          </ul>
        </div>
    );
}

export default Sidebar;