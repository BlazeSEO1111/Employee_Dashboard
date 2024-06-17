"use client"
import Header from '@/components/Header'
import AppLayout from '@/components/Layout/AppLayout'
import React, { useContext, useEffect } from 'react'
import { Tabs } from 'antd';
import Notification from "./Notification/index"
import MainInfor from './MainInfor';
import { informationApi, notificationApi, paymentApi } from '@/api-client';
import { AuthContext } from '@/context/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ItemType } from '../recharge/page';
const ProfileEmployee = () => {
  const onChange = (key: string) => {
  };
  const { handleLogOut, authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);

  const { isPending, error, data } = useQuery<any>({
    queryKey: ["getPaymentHistory", authState?.accessToken],
    queryFn: async () => await informationApi.getInformPublisher(authState?.accessToken ?? "", authState?.userId ?? ""),
  });

  const { isLoading: isLoadingNotification, error: errorNotification, data: dataNotification } = useQuery<any>({
    queryKey: ["getDataNotification", authState?.accessToken],
    queryFn: async () => await notificationApi.getNotification(authState?.accessToken ?? ""),
  });

  const items = [
    {
      key: '1',
      label: 'Main info',
      children: <MainInfor information={data} />,
    },
    {
      key: '2',
      label: 'Notification',
      children: <Notification dataNotification={dataNotification}/>,
    },

  ];


  return (
    <AppLayout>
      <div className="w-full  h-screen flex flex-col">
        <div className="p-6">
          <Header title={data} />
          <div className="h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden" >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </div>
      </div>

    </AppLayout >

  )
}

export default ProfileEmployee
