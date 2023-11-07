import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FieldType } from "./CreateGroupForm";
import { getAllUsers, editGroup } from "../service";

interface Group {
    group: any
    created_at: any;
    participants: [];
    title: string;
    type: string;
    __v: any;
    _id: string;
}
interface propstypes {
    title: string;
    participants: [];
    profile: string;
    group: any;
    id: string;
    username: string
}


const EditGroup = ({group}: any) => {
    const oldParticipants = group.participants
    const oldParticipantsId = oldParticipants?.map((participant: propstypes) => participant.id);
    // console.log('....1st', { group, oldParticipants, oldParticipantsId });

    const [users, setUsers] = React.useState([]);

    const fetchUsers = async () => {
        const _users = await getAllUsers();
        setUsers(_users)
    };

    React.useEffect(() => {
        fetchUsers();
        // console.log('....grp', users);
    }, []);

    const onFinish = async ({ title, participants, profile }: propstypes) => {
        const id = group._id
        //     console.log('....ogroup:', group, '\n', oldParticipants);
        // console.log('....onFinish started', { title, participants, id, profile });

        await editGroup({ id, title, participants, profile })
        // console.log("....Success",);
    };

    const onFinishFailed = (errorInfo: any) => {
        // console.log("....Failed:", errorInfo);
        alert("ERROR, please try agian...")
    };

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
                    defaultValue={[...oldParticipantsId]}
                    options={users.map((group: any) => ({
                        value: group?._id,
                        label: group?.username,
                    }))}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label="Group Profile"
                name="profile"
                initialValue={group.profile}
            >
                <Input />
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