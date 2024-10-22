import React from 'react';
import Navbar from './components/menu/admin/navbar/Navbar';
import Sidebar from './components/menu/admin/sidebar/Sidebar';
import { useSelector } from "react-redux";
import SidebarTop from './components/menu/admin/sidebar/SidebarTop';

function Sidebarmain({ children }) {
  const sidebartype = useSelector((state) => state.Auth.sidebarType);

  console.log(sidebartype,"main sibe bar page")

  return (
    <>
      <Navbar />

      {sidebartype === 'top' && <SidebarTop />}

      <div className='flex  w-[100%]'>
        {sidebartype === 'left' && <Sidebar />}
        
        {children}
        
        {sidebartype === 'right' && <Sidebar />}
      </div>
    </>
  );
}

export default Sidebarmain;
