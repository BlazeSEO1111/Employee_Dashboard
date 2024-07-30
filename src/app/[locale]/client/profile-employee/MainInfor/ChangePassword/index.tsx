import React, {useContext, useState} from 'react';
import {Button, Form, Input} from "antd";
import {informationApi} from "@/api-client";
import {toast} from "react-toastify";
import {AuthContext} from "@/context/useAuthContext";

const ChangePassWord = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const {handleLogOut, authState, accountExtendDetail, getAccountExtendDetails} = useContext(AuthContext);

    const onFinish = async (values: any) => {
        try {
            delete values.confirmPassword;
            const response = await informationApi.editPassword(
                authState?.accessToken ?? "",
                authState?.userId ?? "",
                values
            );
            toast.success("Cập nhật mật khẩu thành công.")
        } catch (error) {
            console.error("API error:", error);
        }
    };
    return (
        <div>
            <Form
                form={form}
                onFinish={onFinish}
                layout='vertical'
            >
                <Form.Item className='flex-1' name="password" label="Password">
                    <Input.Password
                        className={"rounded-xl h-[45px]"}
                        placeholder="Password"/>
                </Form.Item>
                <Form.Item
                    className='flex-1'
                    name="confirmPassword"
                    label="Confirm password"
                    dependencies={['password']}
                    rules={[
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        className={"rounded-xl h-[45px]"}
                        placeholder="Confirm Password"/>
                </Form.Item>
                <Form.Item className='flex-1'>
                    <div className={"flex gap-2"}>
                        <Button type="primary" htmlType="submit">
                            Đổi mật khẩu
                        </Button>
                    </div>
                </Form.Item>
            </Form>

        </div>
    );
};

export default ChangePassWord;