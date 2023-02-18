import { useAppContext } from "../context/appContext";

function Alert() {
    const { showAlert, alertText, alertType } = useAppContext();

    return (
        showAlert &&
        <div className={`${ alertType === "danger" ? "bg-red-500 text-white" : "bg-green-500 text-white" } w-1/4 text-center text-sm rounded-lg p-2 mb-4 mb-3`}>
            { alertText }
        </div>
    );
}

export default Alert;