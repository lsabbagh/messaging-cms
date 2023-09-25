import React from "react";
import { Space, Table, Tag, Button, Checkbox, Form, Input, Popover } from "antd";
import getColumns from "./getColumns";
import CreateUser from "./CreateUserForm"
import SignInForm from "./SignInForm"



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
  const onDelete = (user) => {
    deleteUser(user)
    console.log('....', user)
  }
  const onEdit = (user) => {
    console.log('....', user)
  }
  return(
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Popover content={<CreateUser />} title="Add New User">
        <Button type="primary">Add New User</Button>
      </Popover>

      <div style={{width: 800, border: '1px solid black', padding: 10}}>
        <Table columns={getColumns(onDelete, onEdit)} dataSource={data} />
      </div>
      <div style={{width: 200, border: '1px solid black', padding: 10, margin:5}}>
        <SignInForm />
      </div>

      <div style={{width: 200, border: '1px solid black', padding: 10, margin:5}}>
      </div>

      <div>
      </div>
    </div>
  ) ;
};

export default Users;

const getUsers = async () => {
  const response = await fetch("http://localhost:5000/api/users/list");
  const data = await response.json();
  return data;
};


const deleteUser = async (user: any) => {
  const response = await fetch("http://localhost:5000/api/users/" + user._id, {method: "DELETE"});
  const data = await response.json();
  return data;
};