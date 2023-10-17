import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FieldType } from "./CreateGroupForm";
import { getUsers, editGroup } from "../service";

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

    const onFinish = async ({ title, participants }: propstypes) => {
        dataToParent({ title, participants })
        //     const id = group._id
        //     console.log('....ogroup:', group, '\n', oldPart);
        //     console.log('....onFinish started', '\n', title, '\n', participants, '\n', id);
        //     console.log("Success:", group);
        //     await editGroup({id, title, participants})
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        alert("ERROR, please try agian...")
    };

    const defValue = () => {
        {
            let values = group.participants;

            return values
        }
    }

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