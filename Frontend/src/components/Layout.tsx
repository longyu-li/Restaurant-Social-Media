import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const Layout: React.VFC = () => {
  return (
    <div className="min-h-100 d-flex flex-column">
      <NavigationBar />
      <Outlet />
    </div>
  );
}

export default Layout;