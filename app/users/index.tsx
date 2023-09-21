import React from "react";
import { Space, Table, Tag, Button, Checkbox, Form, Input, Popover } from "antd";
import columns from "./columns";
import CreateUser from "./createUserForm"



const Users: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);
  // console.log("...1",deletedRow);
  
  const fetchUsers = async () => {
    const users = await getUsers();

    setData(users);
  };
  React.useEffect(() => {
    fetchUsers();
    console.log("...",data);
    
  }, []);
  return(
    <div>
      <Popover content={<CreateUser />} title="Add New User">
        <Button type="primary">Add New User</Button>
      </Popover>

      <Table columns={columns} dataSource={data} />
    </div>
  ) ;
};

export default Users;

const getUsers = async () => {
  const response = await fetch("http://localhost:5000/api/users/list");
  const data = await response.json();
  return data;
};

const createUser = async (user: any) => {
  const response = await fetch("http://localhost:5000/api/users/list");
  const data = await response.json();
  return data;
};