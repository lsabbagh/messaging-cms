import React from "react";
import { Button, Form, Input, Select } from "antd";
import { getAllUsers, createGroup } from "../service";

export type FieldType = {
  title?: string;
  participants?: [];
  type?: "group";
};

interface parentData {
  dataToParent: (data: any) => void; 
}

const CreateGroup = ({dataToParent}:parentData) => {
  const [users, setUsers] = React.useState<[]>([]);

  const fetchUsers = async () => {
    const _users = await getAllUsers();
    setUsers(_users)
  };

  React.useEffect(() => {
    fetchUsers();
    // console.log('....uussserrrss', users);
  }, []);

 

  const onFinish = async ({ title, participants }: FieldType) => {
    // console.log('....parrp', participants);
    if(participants!.length <= 2) {
      alert('a group should be have at least 3 participants');
      return;
    }
    const data = await createGroup({title, participants})
    dataToParent(data)
  };
  const onFinishFailed = (errorInfo: any) => {
    // console.log("....Failed:", errorInfo);
    alert("ERROR, please try agian...")
  };

  // console.log('....uussserrrss2', users);

  return (
    <Form
      name="createGroup"
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
        label="Participants"
        name="participants"
        rules={[{ required: true, message: "Please select participants!" }]}
      >
        <Select 
          placeholder="Select an option" 
          mode="multiple" 
          allowClear 
          options={users?.map((user: any) => ({
            value: user?._id,
            label: user?.username,
          }))}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;