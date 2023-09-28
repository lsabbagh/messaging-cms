import React from "react";
import { Button, Form, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  active?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  country?: string;
  city?: string;
  remember?: string;
};

const CreateUser = () => {

  const [user, setUser] = React.useState({})
  const onLogin = async ({username, password}) => {
    const response = await signIn(username, password)
    console.log('....', {response})
    // @TODO: only if success
    setUser(response.user)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onLogin}
      onFinishFailed={() => {}}
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
      <Form.Item>
        <h2>_id: {user._id}</h2>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;

const signIn = async (username: any, password: any) => {
  const response = await fetch("http://localhost:5000/api/users/signin", {
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