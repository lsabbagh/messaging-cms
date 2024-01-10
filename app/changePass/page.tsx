"use client";
import React from "react";
import { Popover, Button, Form, Input } from "antd";
import { changePassword } from "../service";
import styles from "@/app/styles/changePass.module.css";

export type FieldType = {
  id: string;
  password: string;
  passwordB: string;
};

const changePass = () => {
  const onFinish = async ({ id, password, passwordB }: FieldType) => {
    if (password !== passwordB) {
      alert("passwords DO NOT match");
      return;
    }
    const isChanged = await changePassword({ id, password });
    console.log(".... ", isChanged);
    const { success } = isChanged;
    if (!success) {
      alert("Something went wrong! Try again later");
      return;
    }
    alert(success);
  };

  const onFinishFailed = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form
          name="basic"
          className={styles.form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 20 }}
          // style={{ width: "100%", height: "100%", alignItems: 'center', backgroundColor: "none" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Secret KEY"
            name="id"
            rules={[{ required: true, message: "Please input User Id!" }]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input the new password!" },
            ]}
            className={styles.formItem}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Confirm Password"
            name="passwordB"
            rules={[
              { required: true, message: "Please confirm the new password!" },
            ]}
            className={styles.formItem}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default changePass;
