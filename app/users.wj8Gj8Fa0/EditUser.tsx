import React, { use } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FieldType } from "./CreateUserForm";


const EditUser = ({user}: any) => {

    const onFinish = async (_user: any) => {

        console.log('1111',user);
        
        const {username,  email} = _user; 
        const updatedUser = {username, email}
        const response = await fetch("http://localhost:5000/api/users/" + user._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
            },
            body: JSON.stringify(updatedUser)
        });
        console.log("Success:", user);
        console.log("Success2:", updatedUser);
        const data = await response.json();
        return data;
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
