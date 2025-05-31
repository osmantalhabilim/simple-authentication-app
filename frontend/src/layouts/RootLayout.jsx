import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="w-full min-h-dvh bg-gradient-to-bl to-slate-900 via-slate-800 from-slate-900">
        <Outlet/>
        <Toaster/>
    </div>
  )
}

export default RootLayout;