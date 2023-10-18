'use client';
import React from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { propsTypes, signIn } from "./service";
import styles from "@/app/styles/login.module.css"

interface AppProps {
  onSignIn: (props: any) => void;
}

const Login: React.FC<AppProps> = ({ onSignIn }) => {
  const router = useRouter();
  const [admin, setAdmin] = React.useState({});

  const onLogin = async ({ username, password }: propsTypes) => {
    if (!username || !password) {
      alert('enter your username or password');
      return;
    }

    const response = await signIn({ username, password });
    console.log('....response:', response);

    // if valid
    setAdmin(response)
    onSignIn(response)

    // if failed


    // router.push(`/adminssS5t78f?data=${username}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onLogin}
          onFinishFailed={() => { }}
          autoComplete="off"
        >
          <Form.Item<propsTypes>
            label="Username"
            name="username"
            rules={[{ required: false, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<propsTypes>
            label="Password"
            name="password"
            rules={[{ required: false, message: "Please input your password!" }]}
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

export default Login;
