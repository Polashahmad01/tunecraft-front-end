import { useState, useRef, useEffect } from "react";

export default function useOutSideClick(WrappedComponent) {
  const Component = (props) => {
    const [open, setOpen] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const handleOutSideClick = (event) => {
        if(!ref.current?.contains(event.target)) {
          setOpen(false);
          setOpenSidebar(false);
        }
      }
      document.addEventListener("mousedown", handleOutSideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutSideClick);
      }
    }, [ref]);

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
  }

  return Component;
}
