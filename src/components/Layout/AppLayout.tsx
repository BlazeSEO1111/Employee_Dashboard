import SideMenu from "@/components/Layout/SideMenu";
import React, { FC } from "react";

interface AppLayoutTypes {
  children: any;
}

const AppLayout: FC<AppLayoutTypes> = ({ children }) => {
  return (
    <div>
      <div className='flex pl-80   max-lg:pl-0'>{children}</div>
    </div>
  );
};

export default AppLayout;
