import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../context/appContext";

function Alert() {
    const { showAlert, alertText, alertType } = useAppContext();

    return (
        showAlert &&
        <div className={`absolute flex justify-center z-20 items-center bottom-0 right-0 ${ alertType === "danger" ? "bg-red-500 text-white" : "bg-green-500 text-white" } w-96 h-16 text-center text-sm text-center rounded-md mr-8 mb-8`}>
            <div className="mr-2">
                {
                    alertType === "danger" ?
                        <XCircleIcon className="w-6 h-6" />
                    :
                        <CheckCircleIcon className="w-6 h-6" />
                }
            </div>
            <p>{ alertText }</p>
        </div>
    );
}

export default Alert;