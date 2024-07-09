import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import TanstackProvider from "@/components/TanstackProvider";
import ContextConsumer from "@/context";
import SideMenu from "@/components/Layout/SideMenu";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function AppLayout({ children, params: { locale } }: Readonly<Props>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <ContextConsumer>
          <TanstackProvider>
            <NextIntlClientProvider messages={messages}>
              <SideMenu />
              {children}
              <ToastContainer
                position='top-right'
                theme='dark'
                hideProgressBar
                autoClose={2000}
                style={{ color: "#E25148" }}
                transition={Slide}
              />
            </NextIntlClientProvider>
            {/* <Foooter /> */}
          </TanstackProvider>
        </ContextConsumer>
      </body>
    </html>
  );
}
