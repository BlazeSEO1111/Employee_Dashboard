"use client"
import React, { useState } from 'react'
import { informationApi, notificationApi, serviceApi } from '@/api-client'
import AppLayout from '@/components/Layout/AppLayout'
import { AuthContext } from '@/context/useAuthContext'
import { useQuery } from '@tanstack/react-query'
import { Button, Select, Table, Tabs } from 'antd'
import { useContext } from 'react'
import Header from '@/components/Header'

const index = () => {
  const [idWebsite, setIdWebsite] = useState<string>()
  const [dataService, setDataService] = useState<any>()
  const { Option } = Select;
  const { handleLogOut, authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);

  const { isPending, error, data } = useQuery<any>({
    queryKey: ["getPaymentHistory", authState?.accessToken],
    queryFn: async () => await informationApi.getInformPublisher(authState?.accessToken ?? "", authState?.userId ?? ""),
  });

  const { isLoading: isLoadingNotification, error: errorNotification, data: dataWebsite } = useQuery<any>({
    queryKey: ["getDataNotification", authState?.accessToken],
    queryFn: async () => await serviceApi.getInformWebsite(authState?.accessToken ?? ""),
  });

  const handleChange = (value: string) => {
    setIdWebsite(value)
    console.log(`selected ${value}`);
  };

  const handleFilterService = async () => {
    try {
      const response = await serviceApi.getInformService(
        authState?.accessToken ?? "",
        idWebsite ?? ""
      );
      setDataService(response)
      console.log("response", response);
    } catch (error) {
      console.error("API error:", error);
    }
  }



  const columns = [
    {
      title: 'DOMAIN',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'SALE',
      dataIndex: 'sale',
      key: 'sale',
    },
    {
      title: 'COST',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  return (
    <AppLayout>
      <div className="w-full  h-screen flex flex-col">
        <div className="p-6">
          <Header title={data} />
          <div className=" flex flex-col  gap-5 h-[1px] bg-black  bg-opacity-20 max-lg:hidden" >
            <div className='flex gap-5 mt-5'>
              <Select
                placeholder="Website"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                {dataWebsite?.data?.map((item: any) => <Option value={item._id} key={item._id}>{item.vertical}</Option>)}
              </Select>
              <Button type='primary' onClick={handleFilterService}>Filter service</Button>
            </div>
            <Table dataSource={dataService} columns={columns} />
          </div>
        </div>
      </div>

    </AppLayout >
  )
}

export default index
