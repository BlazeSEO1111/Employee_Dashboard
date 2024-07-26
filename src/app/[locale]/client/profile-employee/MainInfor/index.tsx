import {Button, Form, Input, Spin} from 'antd'
import React, {useContext, useState} from 'react'
import {AuthContext} from '@/context/useAuthContext';
import {informationApi} from '@/api-client';
import {toast} from 'react-toastify';

const index = ({information}: { information: any }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    console.log("information", information)
    const {handleLogOut, authState, accountExtendDetail, getAccountExtendDetails} = useContext(AuthContext);

    const onFinish = async (values: any) => {
        try {
            const addInform = {
                ...values,
                role: authState?.role,
                team: information.team.map((item: any) => item._id),
            }
            const response = await informationApi.editInformPublisher(
                authState?.accessToken ?? "",
                authState?.userId ?? "",
                addInform
            );
            toast.success("Cập nhật thông tin thành công.")
        } catch (error) {
            console.error("API error:", error);
        }
    };

    return (
        !information ?
            <Spin/> :
            <div className='flex flex-col gap-[50px]'>
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
                        <Form.Item className='flex-1' name="email" label="Email" rules={[{type: 'email'}]}>
                            <Input placeholder='Email'/>
                        </Form.Item>
                    </div>
                    <Form.Item className='flex-1' name="fullname" label="Full Name">
                        <Input placeholder='Full Name'/>
                    </Form.Item>
                    <Form.Item className='flex-1' name="username" label="User Name">
                        <Input placeholder='User Name'/>
                    </Form.Item>
                    <Form.Item className='flex-1' name="phoneNumber" label="Phone Number">
                        <Input placeholder="Phone Number"/>
                    </Form.Item>
                    <Form.Item className='flex-1' name="telegram" label="Telegram">
                        <Input placeholder="Telegram"/>
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
