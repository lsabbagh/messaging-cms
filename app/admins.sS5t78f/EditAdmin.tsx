import React, { use } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FieldType } from "./CreateAdminForm";
import { Confirm } from "./page";


const EditAdmin = ({ admin }: any) => {

    const onFinish = async (_admin: any) => {

        const confirm = await Confirm();
        if (!confirm) return;

        console.log('1111', admin);

        const { username, email } = _admin;
        const updatedAdmin = { username, email }
        const response = await fetch("http://localhost:5000/api/admins/" + admin._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
            },
            body: JSON.stringify(updatedAdmin)
        });
        console.log("Success:", admin);
        console.log("Success2:", updatedAdmin);
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
            initialValues={{ remember: true, ...admin }}
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

export default EditAdmin;
