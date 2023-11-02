import React from "react";
import { Button, Form, Input } from "antd";
import { FieldType } from "./CreateUserForm";
import { editUser } from "../service";


const EditUser = ({user}: any) => {

    // console.log('....1st', user);
    const onFinish = async (_user: any) => {
        console.log('1111',user);
        const isDeleted = false;
        const {username,  email} = _user; 
        const updatedUser = {username, email, isDeleted}
        
        await editUser({user,updatedUser});
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        alert("ERROR, please try agian...")
    };

    return (
        <Form
            name="edit"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true , ...user}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditUser;
