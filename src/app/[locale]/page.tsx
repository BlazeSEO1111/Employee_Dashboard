import AppContent from "@/components/App";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import Image from "next/image";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata: Metadata = {
  title: "Employee Dashboard",
  description: "Employee Dashboard",
};

const Home: NextPage<any> = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppLayout>
        <div className='w-full flex flex-col'>
          <div className='p-2  '>
            <Header />
            <div className='h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden' />
            WELCOME
          </div>
          <AppContent />
        </div>
      </AppLayout>
    </NextIntlClientProvider>
  );
};

export default Home;
