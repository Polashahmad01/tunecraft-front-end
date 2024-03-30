import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";

import { loginFormSchema } from "../utils/formValidationSchema";
import { loginMutation, socialLoginMutation } from "../services/auth.service";
import { useNotification } from "../hooks/useNotification";
import { auth } from "../config/firebaseConfig";
import { login } from "../store/slice/authSlice";
import { addDataToLocalStorage } from "../utils/localStorage";

export default function LoginForm() {
  const [passwordType, setPasswordType] = useState(false);
  const [isSignInWithGoogleLoading, setIsSignInWithGoogleLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched"
  })
  const { mutate, data, isPending } = useMutation({
    mutationFn: loginMutation
  })
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotification();
  const { mutate: socialLoginMutate, data: socialLoginResultData, isPending: socialLoginIsPending } = useMutation({
    mutationFn: socialLoginMutation
  })
  const dispatch = useDispatch();

  const togglePasswordType = () => {
    setPasswordType(passwordType ? false : true);
  }

  const onSubmitHandler = formData => {
    mutate(formData);
  }
  
  if(data?.success === true && data?.statusCode === 200 && data?.message === "User successfully logged in.") {
    notifySuccess(data?.message);
    dispatch(login(data));
    addDataToLocalStorage("user", { token: data.token, userId: data.data._id });
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
      setIsSignInWithGoogleLoading(true);
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(!credential) {
        console.log("Error in credential");
        return
      }
      
      // const token = credential.accessToken;
      const user = {
        fullName: result.user.displayName,
        email: result.user.email,
        emailVerified: result.user.emailVerified,
        profilePicture: result.user.photoURL
      };

      socialLoginMutate(user);
      setIsSignInWithGoogleLoading(false);
    } catch(error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      socialLoginIsPending
      notifyError("Unable to log in with google. Please try again later.");
      setIsSignInWithGoogleLoading(false);
    }
  }

  if(socialLoginResultData?.success && socialLoginResultData.statusCode === 200) {
    notifySuccess(socialLoginResultData?.message);
    navigate("/");
  }

  return (
    <div className="mx-4 max-w-sm p-6 m-auto sm:w-full sm:mx-0 bg-white rounded-lg shadow-md border dark:bg-gray-800">
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
            className="block w-full px-4 py-2 text-sm mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
              className="block w-full px-4 py-2 text-sm mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="******"
            />
            <div onClick={togglePasswordType} className=" absolute right-[12px] top-[12px]">
              {passwordType === true && <IoMdEye />}
              {passwordType === false && <IoMdEyeOff />}
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>
        </div>

        <div className="text-right">
          <Link to="/auth/forgot-password" className="text-xs text-right text-gray-600 dark:text-gray-300 hover:underline">Forget Password?</Link>
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 dark:bg-black">
            {!isPending && "Login"}
            {isPending && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>}
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-2/5 border-b border-gray-800/60 dark:border-gray-600 lg:w-2/5"></span>
        <span href="#" className="text-sm text-center font-medium text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or
        </span>
        <span className="w-2/5 border-b border-gray-800/60 dark:border-gray-400 lg:w-2/5"></span>
      </div>

      <div className="flex items-center mt-6 -mx-2">
        <button
          type="button"
          className="flex items-center justify-center w-full px-6 py-2.5 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 dark:bg-black"
          onClick={signInWithGoogleHandler}
        >
          {!isSignInWithGoogleLoading && <svg className="hidden sm:inline w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
            </path>
          </svg>}
          {!isSignInWithGoogleLoading && <span className="mx-2 inline">Continue with Google</span>}
          {isSignInWithGoogleLoading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>}
        </button>
      </div>
      <p className="mt-8 text-sm font-light text-center text-gray-700 dark:text-gray-300">
        Don't have an account? <Link to="/auth/register" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Register Now</Link>
      </p>
    </div>
  )
}
