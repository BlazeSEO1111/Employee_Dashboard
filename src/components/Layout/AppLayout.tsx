"use client"
import Login from "@/app/[locale]/client/login/page";
import { AuthContext } from "@/context/useAuthContext";
import { FC, useContext } from "react";

interface AppLayoutTypes {
  children: any;
}

const AppLayout: FC<AppLayoutTypes> = ({ children }) => {
  const { authState } = useContext(AuthContext);

  return (
    <div>
      <div className={`${!authState?.accessToken ? "h-screen" : "flex pl-80 bg-[#E9F2FD] max-lg:pl-0"}`}>{children}</div>
    </div >
  );
};

export default AppLayout;
