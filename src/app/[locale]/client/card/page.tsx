"use client";
import AppLayout from "@/components/Layout/AppLayout";
import {useTranslations} from "next-intl";
import Header from "@/components/Header";
import {Button, Modal, Rate, Select, Table} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {cartApi, informationApi} from "@/api-client";
import {AuthContext} from "@/context/useAuthContext";
import {FundViewOutlined, MinusCircleOutlined, PlusCircleOutlined, ShoppingOutlined} from "@ant-design/icons";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {toast} from "react-toastify";

const ProfileEmployee = () => {
    const [cartData, setCartData] = useState<any>([]);
    const t = useTranslations("Index");
    const {handleLogOut, authState, accountExtendDetail} = useContext(AuthContext);

    const {isPending, error, data} = useQuery<any>({
        queryKey: ["getPaymentHistory", authState?.accessToken],
        queryFn: async () => await informationApi.getInformPublisher(authState?.accessToken ?? "", authState?.userId ?? ""),
    });

    const handleGetAllCart = async () => {
        const response = await cartApi.getAllProductFromCart(authState?.accessToken ?? "");
        setCartData(response);
    }
    const handleApproveProduct = async (id: string) => {
        const response = await cartApi.approveProduct(authState?.accessToken ?? "", id);
        toast.success("Đặt hàng thành công.")
    }

    console.log("cartData", cartData)

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
                return (
                    <div className='"flex gap-[20px] w-full justify-center items-center'>
                        <Button style={{background: "#24b592"}} className='mr-3'
                                onClick={() => handleApproveProduct(record._id)}
                        ><FundViewOutlined/> Duyệt </Button>
                        {/*<Button style={{background: "#ffbc36"}} className='mr-3'*/}
                        {/*       ><ShoppingOutlined/> Thêm vào giỏ hàng </Button>*/}
                        {/*<Modal width={1000} className='w-full' title="Chi tiết" open={isModalShowInformOpen}*/}
                        {/*       onOk={handleShowInformOk} onCancel={handleShowInformCancel}>*/}
                        {/*    <div className='w-full'>*/}
                        {/*        <div className='flex gap-5 w-full justify-between mb-4'>*/}
                        {/*            <div>*/}
                        {/*                <p className='font-semibold text-2xl'>{record.domain}</p>*/}
                        {/*                <div className='flex gap-2'>*/}
                        {/*                    <p>Đánh giá nhà cung cấp:</p>*/}
                        {/*                    <Rate allowHalf defaultValue={2.5}/>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <div className='flex gap-3 items-center'>*/}
                        {/*                    <p className='font-semibold text-[20px]'>Đối tác: {}</p>*/}
                        {/*                    <p className='text-yellow-400 font-semibold'>{record.user.fullname}</p>*/}
                        {/*                </div>*/}
                        {/*                <div className='flex gap-3 items-center'>*/}
                        {/*                    <p className='font-semibold text-[20px]'>Telegram: </p>*/}
                        {/*                    <p>{record.user.telegram}</p>*/}
                        {/*                </div>*/}
                        {/*                <div className='flex gap-3 items-center'>*/}
                        {/*                    <p className='font-semibold text-[20px]'>Số tài khoản ngân hàng: </p>*/}
                        {/*                    <p>{record.user.bankNumber}</p>*/}
                        {/*                </div>*/}
                        {/*                <div className='flex gap-3 items-center'>*/}
                        {/*                    <p className='font-semibold text-[20px]'>Ngân hàng: </p>*/}
                        {/*                    <p>{record.user.bankName}</p>*/}
                        {/*                </div>*/}
                        {/*                <div className='flex gap-3 items-center'>*/}
                        {/*                    <p className='font-semibold text-[20px]'>Tên trên thẻ ngân hàng: </p>*/}
                        {/*                    <p>Hoang Van Dung</p>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <div>*/}
                        {/*                <ResponsiveContainer width={1000} height={600}>*/}
                        {/*                    <LineChart*/}
                        {/*                        width={500}*/}
                        {/*                        height={300}*/}
                        {/*                        data={dataChart}*/}
                        {/*                        margin={{*/}
                        {/*                            top: 5,*/}
                        {/*                            right: 30,*/}
                        {/*                            left: 20,*/}
                        {/*                            bottom: 5*/}
                        {/*                        }}*/}
                        {/*                    >*/}
                        {/*                        <CartesianGrid strokeDasharray="3 3"/>*/}
                        {/*                        <XAxis dataKey="name"/>*/}
                        {/*                        <YAxis yAxisId="left"/>*/}
                        {/*                        <YAxis yAxisId="right" orientation="right"/>*/}
                        {/*                        <Tooltip/>*/}
                        {/*                        <Legend/>*/}
                        {/*                        <Line*/}
                        {/*                            yAxisId="left"*/}
                        {/*                            type="monotone"*/}
                        {/*                            dataKey="pv"*/}
                        {/*                            stroke="#8884d8"*/}
                        {/*                            activeDot={{r: 8}}*/}
                        {/*                        />*/}
                        {/*                        <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d"/>*/}
                        {/*                    </LineChart>*/}
                        {/*                </ResponsiveContainer>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*</Modal>*/}
                        {/*<Modal*/}
                        {/*    open={isModalShowModalAddToCartOpen}*/}
                        {/*    title="Thêm vào giỏ hàng"*/}
                        {/*    onOk={() => handleAddToCartOk(record._id)}*/}
                        {/*    onCancel={handleAddToCartCancel}*/}
                        {/*>*/}
                        {/*    <div className='flex flex-col gap-5'>*/}
                        {/*        <div className='flex gap-4 justify-between'>*/}
                        {/*            <div className='flex flex-col gap-3'>*/}
                        {/*                <p className='text-[20px] font-semibold'>Dịch vụ</p>*/}
                        {/*                <p>Guest Post</p>*/}
                        {/*            </div>*/}
                        {/*            <div className='flex flex-col gap-3'>*/}
                        {/*                <p className='text-[20px] font-semibold'>Giá cả</p>*/}
                        {/*                <p>{record.cost}</p>*/}
                        {/*            </div>*/}
                        {/*            <div className='flex flex-col gap-3'>*/}
                        {/*                <p className='text-[20px] font-semibold'>Số lượng</p>*/}
                        {/*                <div className='flex gap-4'>*/}
                        {/*                    <button onClick={() => setValue(value - 1)}><MinusCircleOutlined/></button>*/}
                        {/*                    <p>{value}</p>*/}
                        {/*                    <button onClick={() => setValue(value + 1)}><PlusCircleOutlined/></button>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className='text-green-600'>Chiết khấu của domain này là 10%</div>*/}
                        {/*        <div><span className='text-[20px] font-semibold'>Tổng tiền:</span> <span*/}
                        {/*            className='text-yellow-500 font-semibold text-[20px]'>{record.cost * value}</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</Modal>*/}

                    </div>
                )

            }
        },
    ];

    useEffect(() => {
        handleGetAllCart();
    }, [])
    return (
        <AppLayout>
            <div className="w-full  h-screen flex flex-col">
                <div className="p-6">
                    <Header title={data}/>
                    <div className=" flex flex-col mt-[40px] gap-5 h-[1px] bg-black  bg-opacity-20 max-lg:hidden">
                        <Table dataSource={cartData} columns={columns}/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ProfileEmployee;
