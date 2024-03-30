import { Outlet } from "react-router-dom";
import { forwardRef } from "react";

import useOutSideClick from "../hooks/useOutSideClick";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";

const RootLayout = forwardRef(({ open, openSidebar, setOpen, setOpenSidebar }, ref) => {

  return (
    <main ref={ref}>
      <section className="bg-gray-50 dark:bg-slate-900">
        <Header 
          open={open}
          openSidebar={openSidebar}
          setOpen={setOpen}
          setOpenSidebar={setOpenSidebar}
        />
        <SideBar
          openSidebar={openSidebar}
        />

        <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
          <Outlet />
        </div>
      </section>
    </main>
  )
})

export default useOutSideClick(RootLayout);
