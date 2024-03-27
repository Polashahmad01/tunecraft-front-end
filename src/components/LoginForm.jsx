import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { loginFormSchema } from "../utils/formValidationSchema";
import { loginMutation } from "../services/auth.service";
import { useNotification } from "../hooks/useNotification";
import { auth } from "../config/firebaseConfig";

export default function LoginForm() {
  const [passwordType, setPasswordType] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched"
  })
  const { mutate, data, isPending } = useMutation({
    mutationFn: loginMutation
  })
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotification();

  const togglePasswordType = () => {
    setPasswordType(passwordType ? false : true);
  }

  const onSubmitHandler = formData => {
    mutate(formData);
  }
  
  if(data?.success === true && data?.statusCode === 200 && data?.message === "User successfully logged in.") {
    notifySuccess(data?.message);
    navigate("/");
  }

  if(data?.success === false && data?.statusCode === 401 && data?.message?.includes("A user with")) {
    notifyError(data?.message);
  }

  if(data?.success === false && data?.statusCode === 401 && data?.message?.includes("Wrong password")) {
    notifyError(data?.message);
  }

  const signInWithGoogleHandler = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(!credential) {
        console.log("Error in credential");
        return
      }
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)

    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log("errorCode", errorCode)
      console.log("errorMessage", errorMessage)
      console.log("email", email)
      console.log("credential", credential)
    }
  }

  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md border dark:bg-gray-800">
      <h1 className="mt-3 text-xl font-semibold text-gray-800 dark:text-white md:text-2xl">Log in to your account</h1>

      <form className="mt-6" onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Email
          </label>
          <input
            autoComplete="email"
            id="email" {...register("email")} 
            type="text" 
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="john.doe@gmail.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="mt-4">
          <label
            htmlFor="password" 
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Password
          </label>
          <div className="relative">
            <input
              autoComplete="current-password"
              id="password" {...register("password")}
              type={passwordType ? "text" : "password"}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="******"
            />
            <div onClick={togglePasswordType} className=" absolute right-[12px] top-[15px]">
              {passwordType === true && <IoMdEye />}
              {passwordType === false && <IoMdEyeOff />}
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>
        </div>

        <div className="text-right">
          <Link to="/auth/forgot-password" className="text-xs text-right text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</Link>
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            {isPending ? "Please wait..." : "Login"}
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-3/5 border-b border-gray-800/60 dark:border-gray-600 lg:w-2/5"></span>
        <span href="#" className="text-sm text-center font-medium text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or
        </span>
        <span className="w-1/5 border-b border-gray-800/60 dark:border-gray-400 lg:w-2/5"></span>
      </div>

      <div className="flex items-center mt-6 -mx-2">
        <button
          type="button"
          className="flex items-center justify-center w-full px-6 py-2.5 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          onClick={signInWithGoogleHandler}
        >
          <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
            </path>
          </svg>
          <span className="hidden mx-2 sm:inline">Continue with Google</span>
        </button>
      </div>
      <p className="mt-8 text-sm font-light text-center text-gray-700">
        Don't have an account? <Link to="/auth/register" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Register Now</Link>
      </p>
    </div>
  )
}
