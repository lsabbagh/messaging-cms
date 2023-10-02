'use client';
import React from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";


type FieldType = {
    username?: string;
    password?: string;
    email?: string;
};


const AdminLogin = () => {

    const router =useRouter();
    const [admin, setAdmin] = React.useState({});

    const onLogin = async ({ username, password }) => {
        if (!username) {
            alert('enter your username');
            return;
        }
        if (!password) {
            alert('enter your password');
            return;
        }
        const response = await signIn(username, password);
        console.log('....response:', { response });
        // @TODO: only if success
        // if (response && response.admin && response.admin.id) {}
        setAdmin(response.admin);
        console.log('....responseadmin:', response.admin._id);
        // router.push(`/admins/${response.admin._id}`);
        router.push(`/adminssS5t78f?data=${username}`);
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onLogin}
                onFinishFailed={() => { }}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: false, message: "Please input your username!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: false, message: "Please input your password!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AdminLogin

const signIn = async (username, password) => {
    const response = await fetch("http://localhost:5000/api/admins/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({username, password})
      })
    const data = await response.json();
    return data;
  };