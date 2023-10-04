import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FieldType } from "./CreateGroupForm";


const EditGroup = ({group}: any) => {
    const [users, setUsers] = React.useState([]);
    const { Option } = Select;

    const fetchUsers =async () => {
        const _users = await getUsers();
        setUsers(_users)
    };
    
    React.useEffect(()=>{
        fetchUsers();
    }, [users]);

    const onFinish = async (_group: any) => {

        console.log('1111',group);
        
        const {title,  participants} = _group; 
        const updatedGroup = {title, participants}
        const response = await fetch("http://localhost:5000/api/conversation/groups/" + group._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
            },
            body: JSON.stringify(updatedGroup)
        });
        console.log("Success:", group);
        console.log("Success2:", updatedGroup);
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
            initialValues={{ remember: true , ...group}}
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditGroup

const getUsers = async () => {
    const response = await fetch("http://localhost:5000/api/users/list");
    const data = await response.json();
    return data;
};