"use client";
import AppLayout from "@/components/Layout/AppLayout";
import { useTranslations } from "next-intl";
const ProfileEmployee = () => {
  const t = useTranslations("Index");

  return (
    <AppLayout>
      <div className='w-full  h-screen flex flex-col'>
        <div className='p-6'>
          {/* <Header title={data} /> */}
          <div className='h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden'>{t("title")}</div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileEmployee;
