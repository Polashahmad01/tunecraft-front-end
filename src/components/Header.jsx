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
                  <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Team Account
                  </a>
                  <button 
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    onClick={logoutHandler}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
