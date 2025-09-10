import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};
export default AppLayout;
