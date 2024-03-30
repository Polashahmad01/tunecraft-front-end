import { Outlet, Link } from "react-router-dom";
import { forwardRef } from "react";

import useOutSideClick from "../hooks/useOutSideClick";

const RootLayout = forwardRef(({ open, openSidebar, setOpen, setOpenSidebar }, ref) => {

  return (
    <main ref={ref}>
      <section className="bg-gray-50 dark:bg-slate-900">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div className={`${openSidebar ? "translate-x-0" : "-translate-x-full hidden"} transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700`}>
          <div className="px-6">
            <a className="flex-none text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" aria-label="TuneCraft">TuneCraft</a>
          </div>

          <nav className="p-6 w-full flex flex-col flex-wrap">
            <ul className="space-y-1.5">
              <li>
                <Link className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" to="/">
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Dashboard
                </Link>
              </li>

              <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                Calendar
              </Link></li>
            </ul>
          </nav>
        </div>

        <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
          <Outlet />
        </div>
      </section>
    </main>
  )
})

export default useOutSideClick(RootLayout);
