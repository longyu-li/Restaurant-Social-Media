import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const Layout: React.VFC = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default Layout;