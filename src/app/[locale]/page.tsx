import AppContent from "@/components/App";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import Image from "next/image";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Login from "./client/login/page";

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
      <Login />
    </NextIntlClientProvider>
  );
};

export default Home;
