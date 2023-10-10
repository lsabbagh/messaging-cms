import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Confirm } from "./page";

export type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  type?: string;
  active?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  country?: string;
  city?: string;
  remember?: string;
};

const CreateAdmin = () => {
  const { Option } = Select;


  const onFinish = async (values: any) => {
    const confirm = await Confirm();
    if(!confirm) return;

    await fetch("http://localhost:5000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify(values)
    });
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    alert("ERROR, please try agian...")
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
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
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="First Name"
        name="firstName"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Last Name"
        name="lastName"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Phone"
        name="phone"
        rules={[{ required: false, message: "Please input your phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Gender"          //jnbacivbnswviswnbvi CHECK THIS 
        name="gender"
        rules={[{ required: false, message: "Please input your phone!" }]}
      >
        <Select
          placeholder="Select an option"
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Country"         //sbnhjwsbvhw CHECK THIS
        name="country"
        rules={[{ required: false, message: "Please input your phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="City"
        name="city"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
      name="type"
      hidden
      initialValue="admin"
    >
      <Input value="admin"/>
    </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAdmin;
