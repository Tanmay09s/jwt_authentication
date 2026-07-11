import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

import React from 'react'

const MainLayout = () => {
  return (
  <div>
     <Navbar />
    <Outlet />
  </div>

  )
}

export default MainLayout