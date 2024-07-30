import {Button, Form, Input, Spin} from 'antd'
import React, {useContext, useState} from 'react'
import {AuthContext} from '@/context/useAuthContext';
import {informationApi} from '@/api-client';
import {toast} from 'react-toastify';
import ChangePassWord from "@/app/[locale]/client/profile-employee/MainInfor/ChangePassword";

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
            <div className={"flex gap-5 w-full"}>
                <div className='flex w-[50%]   flex-col gap-[50px]'>
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
                        <div className='flex gap-4 '>
                            <Form.Item className='flex-1 ' name="email" label="Email"
                                       rules={[{type: 'email'}]}>
                                <Input className={"rounded-xl h-[45px]"} placeholder='Email'/>
                            </Form.Item>
                        </div>
                        <Form.Item className='flex-1' name="fullname" label="Full Name">
                            <Input className={"rounded-xl h-[45px]"} placeholder='Full Name'/>
                        </Form.Item>
                        <Form.Item className='flex-1' name="username" label="User Name">
                            <Input className={"rounded-xl h-[45px]"} placeholder='User Name'/>
                        </Form.Item>
                        <Form.Item className='flex-1' name="phoneNumber" label="Phone Number">
                            <Input className={"rounded-xl h-[45px]"} placeholder="Phone Number"/>
                        </Form.Item>
                        <Form.Item className='flex-1' name="telegram" label="Account Telegram">
                            <Input className={"rounded-xl h-[45px]"} placeholder="Telegram"/>
                        </Form.Item>
                        <Form.Item className='flex-1'>
                            <div className={"flex gap-2 "}>
                                <Button type="primary" htmlType="submit">
                                    Update Profile
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                <div className={"w-[50%]"}>
                    <ChangePassWord/>
                </div>
            </div>

    )
}

export default index
