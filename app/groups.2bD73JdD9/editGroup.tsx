import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FieldType } from "./CreateGroupForm";

// type propstypes = {
//     title: string;
//     participants: Array<string>;
//     group: any;
//     // dataToParent: (data: any) => void; 
// }
export interface propstypes {
    title?: string;
    participants?: Array<string>;
    group: any;
    dataToParent: any//(data: any) => void; 
  }

const EditGroup = ({ group, dataToParent }: propstypes) => {
    const oldPart = group.participants.split(',')

    console.log('....1st', group, '\n', oldPart);
    const [users, setUsers] = React.useState([]);

    const fetchUsers = async () => {
        const _users = await getUsers();
        setUsers(_users)
    };

    React.useEffect(() => {
        fetchUsers();
        console.log('....grp', users);
    }, []);

    const onFinish = async ({ title, participants }:propstypes) => {
        const parentData = {title, participants}
        dataToParent({title, participants})
    //     const id = group._id
    //     console.log('....ogroup:', group, '\n', oldPart);
    //     console.log('....onFinish started', '\n', title, '\n', participants, '\n', id);
    //     const response = await fetch("http://localhost:5000/api/conversation/groups/" + id, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "access-control-allow-origin": "*",
    //         },
    //         body: JSON.stringify({ title, participants})
    //     });
    //     console.log("Success:", group);
    //     console.log("Success3:", title, participants, id);
    //     const data = await response.json();
    //     console.log('....data', data);
    //     return data;
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        alert("ERROR, please try agian...")
    };

    const defValue = () => {{
        let values = group.participants;

        return values
    }}

    // console.log('....1111', group);
    // console.log('....1111', _group);

    return (
        <Form
            name="editGroup"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            // initialValues={{ remember: true, ...group}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Group Name"
                name="title"
                initialValue={group.title}
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
                    defaultValue={oldPart}
                    options={users.map((group: any) => ({
                        value: group?._id,
                        label: group?.username,
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

export default EditGroup

const getUsers = async () => {
    const response = await fetch("http://localhost:5000/api/users/list");
    const data = await response.json();
    return data;
};