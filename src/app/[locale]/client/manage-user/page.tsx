"use client"
import AppLayout from '@/components/Layout/AppLayout'
import React, {useContext, useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query';
import {AuthContext} from "@/context/useAuthContext";
import {informationApi, manageUserApi} from "@/api-client";
import Header from '@/components/Header'
import {Spin, Table} from "antd";
import {roleAccount} from "@/utils/checkRole";
import {useRouter} from "next/navigation";


const ManageUser = () => {

    const [dataUser, setDataUser] = useState()
    const router = useRouter();
    const [statusUser, setStatusUser] = useState()

    const {handleLogOut, authState, accountExtendDetail, getAccountExtendDetails} = useContext(AuthContext);

    const {isLoading, error, data} = useQuery<any>({
        queryKey: ["getPaymentHistory", authState?.accessToken],
        queryFn: async () => await informationApi.getInformPublisher(authState?.accessToken ?? "", authState?.userId ?? ""),
        enabled: !!authState?.userId,
    });


    const handleGetAllUser = async () => {
        if (authState?.userId) {
            const response = await manageUserApi.getAllUserManage(authState?.accessToken ?? "");
            console.log("response", response);
            setDataUser(response.data)
        }

    }
    console.log("dataVoucher", dataUser);
    console.log("authState?.userId", authState?.userId);
    const handleDeactivateUser = async (userId: string) => {
        try {
            const response = await manageUserApi.deactivateUser(userId, authState?.accessToken ?? "");
            console.log("response", response);
            await handleGetAllUser()
            console.log("deactivate user", userId)
        } catch (e) {
            console.log("error", e)
        }

    }


    useEffect(() => {
        handleGetAllUser()
    }, [authState?.userId])


    if (!authState?.accessToken) return <>
        <AppLayout>
            <Spin fullscreen={true}/>
        </AppLayout>
    </>


    const columns = [
        {
            title: 'NAME',
            dataIndex: 'fullname',
            render: (text: any) => (<p className=' '>{text}</p>)
        },
        {
            title: 'TÊN TÀI KHOẢN',
            dataIndex: 'username',
            render: (text: any) => (<p className=''>{text}</p>)
        }, {
            title: 'EMAIL',
            dataIndex: 'email',
            render: (text: any) => (<p className=' '>{text}</p>)
        }, {
            title: 'QUYỀN',
            dataIndex: 'role',
            render: (text: any, record: any) => (<p className=' '>{roleAccount(record.role)}</p>)
        },
        {
            title: 'STATUS',
            dataIndex: 'isDelete',
            render: (text: any) => (
                text === false ? (
                        <p className='uppercase text-blue-500 font-extrabold'>ACTIVE</p>
                    )
                    : <p className='uppercase text-red-500 font-extrabold'>INACTIVE</p>
            )
        },
        {
            title: 'ACTION',
            render: (text: any, record: any) => {
                console.log("record", record)
                return (<div>
                    <button className='bg-blue-500 text-white p-2 rounded-md'>EDIT</button>
                    <button className='bg-red-500 text-white p-2 rounded-md'
                            onClick={() => handleDeactivateUser(record._id)}>DEACTIVATE USER
                    </button>
                </div>)
            }
        },
    ];

    return (

        <AppLayout>
            <div className="w-full  h-screen flex flex-col">
                <div className="p-6">
                    <Header title={data}/>
                    <div className="mt-[50px] flex flex-col  gap-5 h-[1px] bg-black  bg-opacity-20 max-lg:hidden">
                        <Table dataSource={dataUser} columns={columns}/>
                    </div>

                </div>
            </div>

        </AppLayout>

    )
}

export default ManageUser
