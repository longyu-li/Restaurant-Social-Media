import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.VFC = () => {
  return (
    <>
      <div>NAVIGATION PLACEHOLDER</div>
      <Outlet />
    </>
  );
}

export default Layout;