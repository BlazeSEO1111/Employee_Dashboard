"use client"
import Header from '@/components/Header'
import AppLayout from '@/components/Layout/AppLayout'
import React, {useContext, useEffect, useState} from 'react'
import {informationApi, manageServiceApi, serviceApi} from '@/api-client';
import {AuthContext} from '@/context/useAuthContext';
import {useQuery} from '@tanstack/react-query';
import {Button, Select, Table} from "antd";
import queryString from 'query-string'
import convertNumbThousand from "@/utils/convertNumbThousand";

const ServiceManage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataService, setDataService] = useState()
    const [websiteId, setWebsiteId] = useState()
    const [totalCost, setTotalCost] = useState()
    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
        type: '',
        website: ''
    });
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
        const response = await manageServiceApi.getDataServiceManage(authState?.accessToken ?? "");
        console.log("response", response);
        setTotalCost(response.totalCost)
        setDataService(response.data)
    }
    // @ts-ignore
    const websiteSelect = websiteId?.map((item: any) => {
        return {
            value: item._id,
            label: item.name
        }
    })

    const handleFilterDataService = async () => {
        const queryObj: any = {
            ...query,
            website: query.website,
            type: query.type
        };
        Object.keys(queryObj).forEach(key => queryObj[key] === '' && delete queryObj[key]);
        const queryStr = queryString.stringify(queryObj);
        const response = await manageServiceApi.getDataServiceManage(authState?.accessToken ?? "", queryStr);
        setTotalCost(response.totalCost)
        setDataService(response.data);
    };
    const handleGetAllData = async () => {
        const response = await serviceApi.getInformWebsite(authState?.accessToken ?? "");
        setWebsiteId(response.data)
    };
    const handleChangeWebsite = async (value: any) => {
        setQuery({
            ...query,
            website: value
        })
    }

    const handleChangeType = (value: any) => {
        console.log("value", value);
        setQuery({
            ...query,
            type: value
        })
    }
    // console.log("websiteSelect", websiteSelect);
    // console.log("queryqueryquery", query);

    useEffect(() => {
        handleGetAllService()
        handleGetAllData()
    }, []);

    console.log("dataService", dataService);


    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'codeService',
            render: (text: any) => (<p className=' '>{text}</p>)
        },
        {
            title: 'Domain',
            dataIndex: 'domain',
            render: (text: any) => (<p className=' '>{text}</p>)
        },
        {
            title: 'Website',
            dataIndex: 'websiteInfor',
            render: (text: any, record: any) => (<p className=' '>{record.websiteInfor.linkWeb}</p>)
        },
        {
            title: 'Tên website',
            dataIndex: 'name',
            render: (text: any, record: any) => (<p className=' '>{record.websiteInfor.name}</p>)
        },
        {
            title: 'Top visit',
            dataIndex: 'totalVisits',
            render: (text: any, record: any) => (<p className=' '>{record.websiteInfor.totalVisits}</p>)
        }, {
            title: 'Giá',
            dataIndex: 'cost',
            render: (text: any, record: any) => (<p className=' '>{convertNumbThousand(text)} đ</p>)
        },
        {
            title: 'Top country',
            dataIndex: 'topCountries',
            render: (text: any, record: any) => (<p className=' '>{record.websiteInfor.topCountries}</p>)
        },
        {
            title: 'Page views',
            dataIndex: 'pageViews',
            render: (text: any, record: any) => (<p className=' '>{record.websiteInfor.pageViews}</p>)
        },
        {
            title: 'Vertical',
            dataIndex: 'vertical',
            render: (text: any, record: any) => (<p className=' '>{record.websiteInfor.vertical}</p>)
        },
        // {
        //     title: 'Domain',
        //     dataIndex: 'domain',
        //     render: (text: any) => (<p className=' '>{text}</p>)
        // },
        {
            title: 'Loại dịch vụ',
            dataIndex: 'type',
            render: (text: any, record: any) => (<p className=' '>{text}</p>)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text: any, record: any) => (<p className=' '>{text}</p>)
        },
        {
            title: 'Người quản lý',
            dataIndex: 'userReceived',
            render: (text: any, record: any) => (<p className='text-red-500 '>{record?.userReceived[0]?.fullname}</p>)
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
                        <div className={"flex gap-4"}>
                            <Select
                                showSearch
                                placeholder="Website"
                                filterOption={(input, option) =>
                                    // @ts-ignore
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={websiteSelect}
                                onChange={handleChangeWebsite}
                            />
                            <Select
                                showSearch
                                placeholder="Type"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    {value: 'traffic', label: 'TRAFFIC'},
                                    {value: 'banner', label: 'BANNER'},
                                ]}
                                onChange={handleChangeType}

                            />
                            <div className={"flex gap-4"}>
                                <Button type={'primary'} onClick={handleFilterDataService}>Lọc</Button>
                                <Button type="primary">
                                    Tổng chi tiêu : {convertNumbThousand(totalCost)} đ
                                </Button>
                            </div>
                        </div>
                        <Table dataSource={dataService} columns={columns}/>
                    </div>
                </div>
            </div>

        </AppLayout>

    )
}

export default ServiceManage
