"use client"
import Header from '@/components/Header'
import AppLayout from '@/components/Layout/AppLayout'
import React, { useContext, useEffect } from 'react'
import { Tabs } from 'antd';
import Notification from "./Notification/index"
import MainInfor from './MainInfor';
import { paymentApi } from '@/api-client';
import { AuthContext } from '@/context/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ItemType } from '../recharge/page';
const ProfileEmployee = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const { handleLogOut, authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);


  const { isPending, error, data } = useQuery<ItemType[]>({
    queryKey: ["getPaymentHistory", authState?.accessToken],
    queryFn: async () => await paymentApi.paymentHistory(authState?.accessToken ?? ""),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      getData(intervalId);
    }, 5000);
    getData(intervalId);
    return () => clearInterval(intervalId);
  }, [authState?.accessToken]);

  const getData = async (clearId?: any) => {
    try {
      getAccountExtendDetails();
    } catch (error) {
      toast.error("Error when payment, please try again!");
    }
  };

  const items = [
    {
      key: '1',
      label: 'Main info',
      children: <MainInfor />,
    },
    {
      key: '2',
      label: 'Notification',
      children: <Notification />,
    },

  ];
  return (
    <AppLayout>
      <div className="w-full  h-screen flex flex-col">
        <div className="p-6">
          <Header title="Profile" />
          <div className="h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden" >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </div>
      </div>

    </AppLayout >

  )
}

export default ProfileEmployee
