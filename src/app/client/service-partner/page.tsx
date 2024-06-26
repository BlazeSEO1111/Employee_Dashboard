"use client"
import React, { useState } from 'react'
import { informationApi, notificationApi, serviceApi } from '@/api-client'
import AppLayout from '@/components/Layout/AppLayout'
import { AuthContext } from '@/context/useAuthContext'
import { useQuery } from '@tanstack/react-query'
import { Button, Modal, Rate, Select, Table, Tabs } from 'antd'
import { useContext } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Header from '@/components/Header'
import {
  FundViewOutlined,
  ShoppingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

const index = () => {
  const [idWebsite, setIdWebsite] = useState<string>()
  const [dataService, setDataService] = useState<any>()
  const [isModalShowInformOpen, setIsModalShowInformOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [isModalShowModalAddToCartOpen, setIsModalShowModalAddToCartOpen] = useState(false);
  const [isAddToCart, setIsAddToCard] = useState(false)

  const showModalViewInformDetail = () => {
    setIsModalShowInformOpen(true);
  };


  const handleShowInformOk = () => {
    setIsModalShowInformOpen(false);
  };

  const handleShowInformCancel = () => {
    setIsModalShowInformOpen(false);
  };


  const showModalAddToCart = () => {
    setIsModalShowModalAddToCartOpen(true);
  };


  const handleAddToCartOk = () => {
    setIsModalShowModalAddToCartOpen(false);
  };

  const handleAddToCartCancel = () => {
    setIsModalShowModalAddToCartOpen(false);
  };

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

  const handleApprove = async (id: string) => {
    const res = await fetch(`http://localhost:8192/api/v1/userConfig/${id}`)
  }
  const dataChart = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'type',
      with: "20%",
      render: (text: any, record: any) => {
        console.log("record", record);
        return (
          <div className='"flex gap-[20px] w-full justify-center items-center' >
            <Button style={{ background: "#24b592" }} className='mr-3' onClick={showModalViewInformDetail}><FundViewOutlined /> Xem thông tin </Button>
            <Button style={{ background: "#ffbc36" }} className='mr-3' onClick={showModalAddToCart}><ShoppingOutlined /> Thêm vào giỏ hàng </Button>
            <Modal width={1000} className='w-full' title="Chi tiết" open={isModalShowInformOpen} onOk={handleShowInformOk} onCancel={handleShowInformCancel}>
              <div className='w-full'>
                <div className='flex gap-5 w-full justify-between mb-4'>
                  <div>
                    <p>Name : </p>
                    <div className='flex gap-2'>
                      <p>Đánh giá nhà cung cấp:</p>
                      <Rate allowHalf defaultValue={2.5} />
                    </div>
                  </div>
                  <div>
                    <div className='flex gap-3'>
                      <p>Đối tác:</p>
                      <p className='text-yellow-400 font-semibold'>GlobalSEOSEM</p>
                    </div>
                    <div className='flex gap-3'>
                      <p>Telegram: </p>
                      <p>@globalseosem</p>
                    </div>
                    <div className='flex gap-3'>
                      <p>Số tài khoản ngân hàng: </p>
                      <p>100014141736</p>
                    </div>
                    <div className='flex gap-3'>
                      <p>Ngân hàng: </p>
                      <p>NCB</p>
                    </div>
                    <div className='flex gap-3'>
                      <p>Tên trên thẻ ngân hàng: </p>
                      <p>Hoang Van Dung</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <ResponsiveContainer width={1000} height={600}>
                      <LineChart
                        width={500}
                        height={300}
                        data={dataChart}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="pv"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </Modal>
            <Modal
              open={isModalShowModalAddToCartOpen}
              title="Thêm vào giỏ hàng"
              onOk={handleAddToCartOk}
              onCancel={handleAddToCartCancel}
            >
              <div className='flex flex-col gap-5'>
                <div className='flex gap-4 justify-between'>
                  <div className='flex flex-col gap-3'>
                    <p className='text-[20px] font-semibold'>Dịch vụ</p>
                    <p>Guest Post</p>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <p className='text-[20px] font-semibold'>Giá cả</p>
                    <p>700,000</p>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <p className='text-[20px] font-semibold'>Số lượng</p>
                    <div className='flex gap-4'>
                      <button onClick={() => setValue(value - 1)}><MinusCircleOutlined /></button>
                      <p>{value}</p>
                      <button onClick={() => setValue(value + 1)}><PlusCircleOutlined /></button>

                    </div>
                  </div>
                </div>
                <div className='text-green-600'>Chiết khấu của domain này là 10%</div>
                <div><span className='text-[20px] font-semibold'>Tổng tiền:</span> <span className='text-yellow-500 font-semibold'>0</span></div>
              </div>
            </Modal>
            <Button type='primary' className='mr-3' onClick={() => handleApprove(record.id)}>Duyệt</Button>
            <Button type='primary' danger >Reject</Button>
          </div >
        )

      }
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
