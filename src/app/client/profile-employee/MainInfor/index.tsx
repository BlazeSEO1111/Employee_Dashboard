import { Button, Form, Input, Popconfirm } from 'antd'
import React, { useState } from 'react'

const index = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <div className='flex flex-col gap-[50px]'>
      <p>General</p>
      <Form>
        <div className='flex gap-4'>
          <Form.Item className='flex-1'>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item className='flex-1'>
            <Input placeholder='First Name' />

          </Form.Item>

        </div>
        <div className='flex gap-4'>
          <Form.Item className='flex-1'>
            <Input placeholder='Last Name' />
          </Form.Item>
          <Form.Item className='flex-1'>
            <Input placeholder='Company Name' />
          </Form.Item>

        </div>
        <div className='flex gap-4'>
          <Form.Item className='flex-1'>
            <Input placeholder='Website' />
          </Form.Item>
        </div>
        <Form.Item className='flex-1'>
          <Popconfirm
            title=""
            description={
              <div>
                <Input placeholder='password' className='rounded-lg' />
              </div>
            }
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
          >
            <Button type="primary" onClick={showPopconfirm}>
              Update Profile
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  )
}

export default index
