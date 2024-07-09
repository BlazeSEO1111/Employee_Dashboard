// import SideMenu from "@/components/Layout/SideMenu";
// import React, { FC } from "react";

// interface AppLayoutTypes {
//   children: any;
// }

// const AppLayout: FC<AppLayoutTypes> = ({ children }) => {
//   return (
//     <div>
//       <div className='flex pl-80   max-lg:pl-0'>{children}</div>
//     </div>
//   );
// };

// export default AppLayout;


import React, { FC } from "react";
import { NextPage } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";


interface AppLayoutTypes {
  children: any;
}

// const AppLayout: NextPage<any> = ({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) => {
const AppLayout = ({ children }: { children: any }) => {
  // const messages = useMessages();

  return (
    // <NextIntlClientProvider locale={locale} messages={messages}>
    <div className='flex pl-80 max-lg:pl-0'>{children}</div>
    // </NextIntlClientProvider>

  );
};

export default AppLayout;

