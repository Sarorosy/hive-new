import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../pages/webmaster/components/Sidebar";

export default function WebmasterLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-row w-full bg-gray-100">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto h-screen p-6">
        <div className="max-w-[100%]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
