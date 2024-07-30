"use client"
import Header from '@/components/Header'
import AppLayout from '@/components/Layout/AppLayout'
import React, {useContext, useEffect, useState} from 'react'
import {informationApi, manageServiceApi} from '@/api-client';
import {AuthContext} from '@/context/useAuthContext';
import {useQuery} from '@tanstack/react-query';
import {Table} from "antd";

const ServiceManage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataService, setDataService] = useState()
    const {handleLogOut, authState, accountExtendDetail, getAccountExtendDetails} = useContext(AuthContext);
    const {isPending, error, data} = useQuery({
        queryKey: ["getPaymentHistory", authState?.accessToken],
        queryFn: async () => {
            if (authState?.userId) {
                return await informationApi.getInformPublisher(authState?.accessToken ?? "", authState.userId);
            } else {
                return null;
            }
        },
        enabled: !!authState?.userId, // Chỉ bật query nếu userId tồn tại
    });


    const handleGetAllService = async () => {
        console.log("4444")
        const response = await manageServiceApi.getDataServiceManage(authState?.accessToken ?? "");
        console.log("response", response);
        setDataService(response.data)
    }

    useEffect(() => {
        handleGetAllService()
    }, []);

    console.log("dataService", dataService);


    const columns = [
        {
            title: 'NAME',
            dataIndex: 'fullname',
            render: (text: any) => (<p className=' '>{text}</p>)
        },

    ];

    if (!authState?.accessToken) return <>
        <AppLayout>
            <div>Vui lòng đăng nhập</div>
        </AppLayout>
    </>

    return (

        <AppLayout>
            <div className="w-full  h-screen flex flex-col">
                <div className="p-6">
                    <Header title={data}/>
                    <div className="mt-[50px] flex flex-col  gap-5 h-[1px] bg-black  bg-opacity-20 max-lg:hidden">
                        <Table dataSource={dataService} columns={columns}/>
                    </div>
                </div>
            </div>

        </AppLayout>

    )
}

export default ServiceManage
