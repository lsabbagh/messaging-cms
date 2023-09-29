import type { ColumnsType } from "antd/es/table";
import { Button, Popconfirm, Popover } from 'antd';
import EditUser from "./EditUser";

interface DataType {
  key: string;
  username: string;
  email: string;
  age: number;
  active: boolean;
}

const getColumns = (onDelete, onEdit) => [
  {
    title: "Name",
    dataIndex: "username",
    key: "name",
    render: (text) => <span style={{fontWeight: 'bolder'}}>{text}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  // {
  //   title: "Password",
  //   dataIndex: "password",
  //   key: "password",
  // },
  // {
  //   title: "First Name",
  //   dataIndex: "firstName",
  //   key: "firstName",
  // },
  // {
  //   title: "Last Name",
  //   dataIndex: "lastName",
  //   key: "lastName",
  // },
  // {
  //   title: "Phone",
  //   dataIndex: "phone",
  //   key: "phone",
  // },
  // {
  //   title: "Country",
  //   dataIndex: "country",
  //   key: "country",
  // },
  // {
  //   title: "City",
  //   dataIndex: "city",
  //   key: "city",
  // },
  // {
  //   title: "Gender",
  //   dataIndex: "gender",
  //   key: "gender",
  // },
  // {
  //   title: "Active",
  //   dataIndex: "active",
  //   key: "active",
  // },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, record) => (
      <div>
        <Popconfirm
          title="Are you sure you want to delete this record?"
          onConfirm={() => onDelete(record)}
        >
          <Button type="primary">Delete</Button>
        </Popconfirm>
        <Popover content={<EditUser user={record}/>} title='edit user'>
          <Button onClick={() => { onEdit(record), console.log('....', 'record', record._id) }} type="text">Edit</Button>
        </Popover>


      </div>
    ),

  },


];

export default getColumns;