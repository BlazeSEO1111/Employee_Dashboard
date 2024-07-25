"use client"
import Header from '@/components/Header'
import AppLayout from '@/components/Layout/AppLayout'
import React, {useContext, useState} from 'react'
import {Tabs} from 'antd';
import Notification from "./Notification/index"
import MainInfor from './MainInfor';
import {informationApi, notificationApi} from '@/api-client';
import {AuthContext} from '@/context/useAuthContext';
import {useQuery} from '@tanstack/react-query';
import {roleAccount} from "@/utils/checkRole";

const ProfileEmployee = () => {

    const [statusProfile, setStatusProfile] = useState("active")
    const {handleLogOut, authState, accountExtendDetail, getAccountExtendDetails} = useContext(AuthContext);
    const {isPending, error, data} = useQuery({
        queryKey: ["getPaymentHistory", authState?.accessToken],
        queryFn: async () => {
            if (authState?.userId) {
                return await informationApi.getInformPublisher(authState?.accessToken ?? "", authState.userId);
            } else {
                return null; // Hoặc một giá trị mặc định khác nếu cần
            }
        },
        enabled: !!authState?.userId, // Chỉ bật query nếu userId tồn tại
    });
    console.log("authState", authState)
    console.log("authState.userId", authState?.userId)
    console.log("datadatadata", data)

    const {isLoading: isLoadingNotification, error: errorNotification, data: dataNotification} = useQuery<any>({
        queryKey: ["getDataNotification", authState?.accessToken],
        queryFn: async () => await notificationApi.getNotification(authState?.accessToken ?? ""),
        enabled: !!authState?.userId,
    });

    const items = [
        {
            key: '1',
            label: 'Thông tin',
            children: <MainInfor information={data}/>,
        },
        {
            key: '2',
            label: 'Thông báo',
            children: <Notification dataNotification={dataNotification}/>,
        },
    ];

    const renderStatusProfile = (value: boolean) => {
        switch (value) {
            case false:
                return (
                    <span className='text-green-600 font-semibold'>ACTIVE</span>
                )
            case true:
                return (
                    <span className='text-red-500 font-semibold'>INACTIVE</span>
                )
            default:
                break;
        }
    }

    if (!authState?.accessToken) return <>
        <AppLayout>
            <div>Vui lòng đăng nhập</div>
        </AppLayout>
    </>
    console.log("data.isDeletedata.isDelete", data?.isDelete)

    return (

        <AppLayout>
            <div className="w-full  h-screen flex flex-col">
                <div className="p-6">
                    <Header title={data}/>

                    <div><span
                        className='text-blue-600 font-semibold'>Trạng thái tài khoản</span> : {renderStatusProfile(data?.isDelete)}
                    </div>
                    <div className='flex  gap-3 mt-2'>
                        <p className='text-blue-600 font-semibold'>Quyền tài khoản:</p>
                        <p className='text-green-600 font-semibold uppercase'>{roleAccount(authState?.role)}</p>
                    </div>
                    <div className="h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden">
                        <Tabs defaultActiveKey="1" items={items}/>
                    </div>
                </div>
            </div>

        </AppLayout>

    )
}

export default ProfileEmployee
