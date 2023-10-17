import React, { use } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FieldType } from "./CreateAdminForm";
import { editAdmin } from "../service";


const EditAdmin = ({ admin }: any) => {

    const onFinish = async (_admin: any) => {
        console.log('1111', admin);

        const { username, email } = _admin;
        const updatedAdmin = { username, email };
        await editAdmin({ admin, updatedAdmin });
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
