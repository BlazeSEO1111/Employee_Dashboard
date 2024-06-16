import Header from '@/components/Header'
import AppLayout from '@/components/Layout/AppLayout'
import { Collapse, CollapseProps, Select, Tabs, TabsProps } from 'antd'
import React from 'react'
import InstallAds from './InstallAds'
import Spot from './Spot'
import Stream from './Stream'
import OtherSpot from './OtherSpot'

const AdCode = () => {


  const itemTab: TabsProps['items'] = [
    {
      key: '1',
      label: 'Cài đặt mã quảng cáo cho vị trí Web-push',
      children: <InstallAds />,
    },
    {
      key: '2',
      label: 'Vị trí Banner & Native',
      children: <Spot />,
    },
    {
      key: '3',
      label: 'Quảng cáo Video/trong luồng',
      children: <Stream />,
    },
    {
      key: '4',
      label: 'Các vị trí khác',
      children: <OtherSpot />,
    },
  ];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Hướng dẫn ',
      children:
        <Tabs defaultActiveKey="1" items={itemTab} />
      ,
    },]
  return (
    <AppLayout>
      <div className="w-full  h-screen flex flex-col">
        <div className="p-6">
          <Header title="Ad codes" />
          <div className="h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden " >
            <div className='flex gap-5 bg-[#d6fff6] p-4 rounded-[20px] justify-between mt-[60px]'>
              <p className='font-semibold text-[20px]'>
                Cách chúng tôi làm việc:</p>
              <div>
                <p className='font-semibold text-[20px]'>- Một giải pháp</p>
                <p>Một đoạn mã cho tất cả các trang web của bạn</p>
              </div>
              <div>
                <p className='font-semibold text-[20px]'>- Truy cập ngay lập tức</p>
                <p>Không cần xác minh trang web</p>
              </div>
              <div>
                <p className='font-semibold text-[20px]'>- Thêm mã của chúng tôi một lần
                </p>
                <p>Mã của chúng tôi kiểm soát định dạng quảng cáo ở mọi cấp độ</p>
              </div>
            </div>
            <div className='flex justify-between gap-5 mt-[70px]'>
              <div>
                <Select className='w-full' placeholder="Nhóm theo" />
              </div>
              <div></div>
              <Select className='w-full' placeholder="Định dạng quảng cáo" />
              <Select className='w-full' placeholder="Vị trí quảng cáo" />
            </div>
            <div className='mt-[50px]'>
              <Collapse items={items} defaultActiveKey={['1']} />
            </div>
          </div>
        </div>
      </div>

    </AppLayout >
  )
}

export default AdCode
