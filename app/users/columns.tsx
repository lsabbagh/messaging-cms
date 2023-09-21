import type { ColumnsType } from "antd/es/table";
import { Button, Popconfirm } from 'antd';
interface DataType {
    key: string;
    username: string;
    email: string;
    age: number;
    active: boolean;
}

const handleDelete = (data: Object) => {
  // TODO: Implement logic to delete the record with the specified key
  console.log('Record deleted:', data);
  return data;
};


const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "username",
      key: "name",
      // render: (text) => <a>{text}</a>,
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
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this record?"
          onConfirm={() => handleDelete(record)}
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  export default columns;