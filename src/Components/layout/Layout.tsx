import {useRouter} from "next/router";
import React, { PropsWithChildren, useState, FC, ReactNode } from "react";


import Navbar from "./NavBar";
import Sidebar from "./SideBar";

interface LayoutProps {
  children: ReactNode,
  title?: string
}

const Layout:FC<LayoutProps> = ({children, title = ""}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className="w-full bg-black">
      <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)}/>
      {sidebarOpen && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}
      {children}
    </div>
  );
};

export default Layout;
