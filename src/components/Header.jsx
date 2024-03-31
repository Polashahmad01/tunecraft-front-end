import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { logoutMutation } from "../services/auth.service";
import { clearDataFromLocalStorage } from "../utils/localStorage";
import { useNotification } from "../hooks/useNotification";

export default function Header({ open, setOpen, openSidebar, setOpenSidebar }) {
  const { userId } = useSelector((state) => state.auth);
  const { notifySuccess, notifyError } = useNotification();
  const navigate = useNavigate();
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["logout-mutate-key"],
    mutationFn: logoutMutation,
    onSuccess: (state) => {
      navigate("/auth/login");
    },
    onError: (state) => {
      console.log("Error", state);
    }
  });

  const logoutHandler = () => {
    mutate({ userId });
    clearDataFromLocalStorage("user");
  }

  if(data?.success === true && data?.statusCode === 200) {
    notifySuccess(data?.message);
  }

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
      <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8" aria-label="Global">
        <div className="me-5 lg:me-0 lg:hidden">
          <button type="button" onClick={() => setOpenSidebar(!openSidebar)} className="text-gray-500 mt-1 hover:text-gray-600">
            <span className="sr-only">Toggle Navigation</span>
            <svg className="flex-shrink-0 size-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
          </button>
        </div>

        <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
          <div />

          <div className="flex flex-row items-center justify-end gap-2">

            <div className="relative inline-flex [--placement:bottom-right]">
              <button onClick={() => setOpen(!open)} type="button" className="w-[2.375rem] h-[2.375rem] focus:ring-4 focus:ring-gray-300 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                <img className="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description" />
              </button>

              <div className={`transition-[opacity,margin] absolute right-0 top-11 duration opacity-100 ${open ? "block" : "hidden"} min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700`}>
                <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-300">john.doe@gmail.com</p>
                </div>
                <div className="mt-2 py-2 first:pt-0 last:pb-0">
                  {!isPending && <button
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 w-full hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    onClick={logoutHandler}
                  >
                    <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
                    Log Out
                  </button>}
                  {isPending && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
