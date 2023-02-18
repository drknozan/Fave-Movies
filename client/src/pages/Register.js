import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from 'yup';
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const { user } = useAppContext();

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 2500);
        }
    }, [user]);

    const schema = yup.object().shape({
        username: yup.string()
            .min(6, "Username must be 6 characters or more")
            .max(15, "Username must be 14 characters or less")
            .required("Username is required"),
        password: yup.string()
            .min(8, "Password must be 6 characters or more")
            .max(18, "Password must be 18 characters or less")
            .required("Password is required")
    })

    return(
        <div className="w-screen flex">
                <div className="w-4/5 mx-auto">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-1/2 h-1/2 bg-slate-900 rounded-lg flex flex-col p-4 shadow-xl">
                            <span className="text-slate-300 text-center mt-6 text-2xl">Register</span>
                            <Formik
                                initialValues={{ username: "", password: "" }}
                                validationSchema={schema}
                                onSubmit={async (values) => {
                                    try {
                                        const res = await axios.post("http://localhost:5000/api/auth/register", { username: values.username, password: values.password }, { withCredentials: true });
                                    } catch (error) {
                                        
                                    }
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    isSubmitting,
                                }) => (
                                    <form className="flex flex-col flex-1 items-center justify-center gap-y-5" onSubmit={handleSubmit}>
                                        <input className="w-1/2 px-3 py-2 rounded bg-slate-300 text-slate-900 text-sm focus:outline-none" onChange={handleChange} onBlur={handleBlur} placeholder="Username" type="text" name="username"></input>
                                        <input className="w-1/2 px-3 py-2 rounded bg-slate-300 text-slate-900 text-sm focus:outline-none" onChange={handleChange} onBlur={handleBlur} placeholder="Password" type="password" name="password"></input>
                                        <button className="w-1/4 p-2 rounded border-2 border-slate-400 text-slate-400 text-sm hover:border-slate-100 hover:text-slate-100" type="submit" disabled={isSubmitting}>Register</button>
                                        <div className="m-1 text-sm flex flex-col gap-1 text-center">
                                            { errors.username && touched.username && <div className="text-rose-400">{ errors.username }</div> }
                                            { errors.password && touched.password && <div className="text-rose-400">{ errors.password }</div> }
                                        </div>
                                        <div className="text-slate-400 cursor-pointer" onClick={() => navigate("/login")}>
                                            <span>Already have an account?</span><a className="ml-2">Login.</a>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Login;