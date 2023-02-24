import notfound from "../assets/notfound.svg";

function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <img className="h-1/2" src={notfound}></img>
            <h1 className="mt-4 text-xl text-gray-300">404 Not Found.</h1>
        </div>
    );
}

export default NotFound;