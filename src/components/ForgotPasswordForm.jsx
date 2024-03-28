import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordFormSchema } from "../utils/formValidationSchema";
import { forgotPasswordMutation } from "../services/auth.service";
import { useNotification } from "../hooks/useNotification";

export default function ForgotPasswordForm() {
  const { notifySuccess, notifyError } = useNotification();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: "onTouched"
  });
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["forgot-password-key"],
    mutationFn: forgotPasswordMutation
  })

  const onSubmitHandler = formData => {
    mutate({ email: formData.email });
  }

  if(data?.success === true && data?.statusCode === 200) {
    notifySuccess(data?.message);
    navigate("/auth/login");
  }

  if(data?.success === false && data?.statusCode === 422) {
    notifyError(data?.message);
  }

  return (
    <div className="mx-4 max-w-sm p-6 m-auto sm:w-full sm:mx-0 bg-white rounded-lg shadow-md border dark:bg-gray-800">
      <h1 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white md:text-2xl">Forgot Password</h1>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Enter your email and we'll send you a link to reset your password.</p>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Email
          </label>
          <input
            autoComplete="email"
            id="email" 
            type="text" 
            className="block w-full px-4 py-2 text-sm mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="john.doe@gmail.com"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 dark:bg-black">
            {!isPending && "Send link"}
            {isPending && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>}
          </button>
        </div>
      </form>
      <p className="mt-6 text-sm font-light text-center text-gray-700 dark:text-gray-300">
        Already have an account? <Link to="/auth/login" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Login Now</Link>
      </p>
    </div>
  )
}
