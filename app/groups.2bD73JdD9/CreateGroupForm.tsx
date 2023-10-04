import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";

export type FieldType = {
  title?: string;
  participants?: [];
  type?: "group";
};

const CreateGroup = () => {
    const [users, setUsers] = React.useState<[]>([])
  const { Option } = Select;

  const fetchUsers =async () => {
    const _users = await getUsers();
    setUsers(_users)
  };

  React.useEffect(()=>{
    fetchUsers();
  }, [users]);

  const onFinish = async ({title, participants}: FieldType) => {
    await fetch("http://localhost:5000/api/conversation/groups/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({
        title,
        participants,
      })
    });
    console.log("Success:", title, participants);
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
        label="Group Name"
        name="title"
        rules={[{ required: true, message: "Please input a group name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Participants"          //jnbacivbnswviswnbvi CHECK THIS 
        name="participants"
        rules={[{ required: true, message: "Please select participants!" }]}
      >
        <Select
          placeholder="Select an option"
          allowClear
        >
            {users.map((user: any)=>(
                <Option value={user} key={user?._id}>{user?.username}</Option>
            ))}
        </Select>
      </Form.Item>

      {/* <Form.Item<FieldType>
        label="Country"         //sbnhjwsbvhw CHECK THIS make group
        name="country"
        rules={[{ required: false, message: "Please input your phone!" }]}
      >
        <Input />
      </Form.Item> */}


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;

const getUsers = async () => {
    const response = await fetch("http://localhost:5000/api/users/list");
    const data = await response.json();
    return data;
};