import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

const Layout = () => {
  return (
    <div className=" w-screen min-h-screen overflow-hidden flex flex-col p-5">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
