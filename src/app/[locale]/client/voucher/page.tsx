"use client"
import React, {useContext, useEffect, useState} from 'react'
import {informationApi, voucherApi} from '@/api-client'
import AppLayout from '@/components/Layout/AppLayout'
import {AuthContext} from '@/context/useAuthContext'
import {useQuery} from '@tanstack/react-query'
import {Spin, Table} from 'antd'
import Header from '@/components/Header'
import {convertDate} from '@/utils/convertDate'

const index = () => {
    const [dataVoucher, setDataVoucher] = useState()

    const {handleLogOut, authState, accountExtendDetail, getAccountExtendDetails} = useContext(AuthContext);

    const {isLoading, error, data} = useQuery<any>({
        queryKey: ["getPaymentHistory", authState?.accessToken],
        queryFn: async () => await informationApi.getInformPublisher(authState?.accessToken ?? "", authState?.userId ?? ""),
    });

    const handleGetDataVoucher = async () => {
        const response = await voucherApi.getAllVoucher(authState?.accessToken ?? "");
        setDataVoucher(response)
    }


    useEffect(() => {
        handleGetDataVoucher()
    }, [])


    const columns = [
        {
            title: 'NAME',
            dataIndex: 'name',
            render: (text: any) => (<p className='uppercase font-extrabold'>{text}</p>)
        },
        {
            title: 'CODE',
            dataIndex: 'code',
            width: 10
        },
        {
            title: 'DESC',
            dataIndex: 'desc',
            width: "10%"
        },

        {
            title: 'DISCOUNT PERCENT',
            dataIndex: 'discountPercent',
            width: "10%",
        },
        {
            title: 'DISCOUNT AMOUNT',
            dataIndex: 'maxDiscountAmount',
            width: "10%",
        },
        {
            title: 'CONDITION',
            dataIndex: 'condition',
            width: "10%",
            render: (text: string) => (<p className=' text-red-500 font-extrabold'>{text}</p>)
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            render: (text: any) => (
                text === "active" ? (
                        <p className='uppercase text-blue-500 font-extrabold'>{text}</p>
                    )
                    : <p className='uppercase text-red-500 font-extrabold'>INACTIVE</p>
            )
        },
        {
            title: 'CREATE DATE',
            dataIndex: 'startDate',
            render: (text: any) => (<p>{convertDate(text)}</p>)
        },
        {
            title: 'END DATE',
            dataIndex: 'endDate',
            render: (text: any) => (<p>{convertDate(text)}</p>)
        },

    ];

    if (isLoading) return <Spin fullscreen={true}/>

    return (
        <AppLayout>
            <div className="w-full  h-screen flex flex-col">
                <div className="p-6">
                    <Header title={data}/>
                    <div className="mt-[50px] flex flex-col  gap-5 h-[1px] bg-black  bg-opacity-20 max-lg:hidden">
                        <Table dataSource={dataVoucher || dataVoucher} columns={columns}/>
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

export default index
