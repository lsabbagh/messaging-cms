import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Confirm } from "../service";

type FieldType = {
  password?: string;
};

const Confirmadmin = ({ setAdmin }: any) => {

  const onFinish = async (values: any) => {
    // console.log(".... onFinish");
    const { password } = values;

    const response = await Confirm(password);
    setAdmin(response);

    setTimeout(() => {
      localStorage.removeItem("admin");
      setAdmin(false);
      // console.log(".... Confirmadmin..setTimeout..fetchAdmins");
    }, 60000);

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Confirmadmin;
