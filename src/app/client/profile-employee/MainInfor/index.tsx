import { Button, Form, Input, Popconfirm, Spin } from 'antd'
import React, { useContext, useState } from 'react'
import { informationApi } from '../../../../api-client/index';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/context/useAuthContext';

const index = ({ information }: { information: any }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();


  const { handleLogOut, authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);




  const onFinish = async (values: any) => {

    try {
      const response = await informationApi.editInformPublisher(
        authState?.accessToken ?? "",
        authState?.userId ?? "",
        values
      );
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    !information ?
      <Spin /> :
      <div className='flex flex-col gap-[50px]'>
        <p>General</p>
        <Form
          form={form}
          onFinish={onFinish}
          layout='vertical'
          initialValues={{
            email: information?.email,
            username: information?.username,
            phoneNumber: information?.phoneNumber,
            fullname: information?.fullname,
          }}
        >
          <div className='flex gap-4'>
            <Form.Item className='flex-1' name="email" label="Email" rules={[{ type: 'email' }]}>
              <Input placeholder='Email' />
            </Form.Item>
          </div>
          <Form.Item className='flex-1' name="fullname" label="Full Name">
            <Input placeholder='Full Name' />
          </Form.Item>
          <Form.Item className='flex-1' name="username" label="User Name">
            <Input placeholder='User Name' />
          </Form.Item>
          <Form.Item className='flex-1' name="phoneNumber" label="Phone Number">
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item className='flex-1'>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>

  )
}

export default index
