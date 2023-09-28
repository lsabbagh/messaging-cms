import React from "react";
import { Space, Table, Tag, Button, Checkbox, Form, Input, Popover, Layout, Select } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import getColumns from "./getColumns";
import CreateUser from "./CreateUserForm"
import SignInForm from "./SignInForm"
import EditUser from "./EditUser";



const Users: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);
  const [editingUser, setEditingUser] = React.useState</*DataType | null*/boolean>(false);
  // console.log("...1",deletedRow);

  const fetchUsers = async () => {
    const users = await getUsers();

    setData(users);
  };
  React.useEffect(() => {
    fetchUsers();
    // console.log("...", data);
  }, [data]);
  const onDelete = (user) => {
    deleteUser(user)
    setData(data);
    console.log('....', user)
  } 
  const onEdit = (user) => {
    console.log('....', user)
  }

  const headerStyle: React.CSSProperties = {
    textAlign: 'left',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    // backgroundColor: '#7dbcea',
  };
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    // backgroundColor: '#108ee9',
  };
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };
  const siderStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
    verticalAlign: 'middle',
    alignItems: 'center',
  };

  // css of siderStyle is not working there is a div in the app that it's not present here

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Layout style={{ width: '100%'}}>
        <Header style={headerStyle}>Users</Header>

        <Layout hasSider style={{width: '100%'}}>

          <Sider style={siderStyle}>
            <Popover content={<CreateUser />} title="Add New User" style={{width: '100%'}}>
              <Button type="primary">Add New User</Button>
            </Popover>
          </Sider>

          <Content style={contentStyle}>
            <div style={{ width: 800, border: '1px solid black', padding: 10 }}>
              <Table columns={getColumns(onDelete, onEdit)} dataSource={data} />
            </div>
          </Content>
        </Layout>

        <Footer style={footerStyle}>Footer</Footer>

      </Layout>

      <br />

      <div style={{ width: 200, border: '1px solid black', padding: 10, margin: 5 }}>
        <SignInForm />
      </div>

      {/* <div style={{ width: 200, border: '1px solid black', padding: 10, margin: 5 }}>
      </div> */}

    </div>
  );
};

export default Users;

const getUsers = async () => {
  const response = await fetch("http://localhost:5000/api/users/list");
  const data = await response.json();
  return data;
};


const deleteUser = async (user: any) => {
  const response = await fetch("http://localhost:5000/api/users/" + user._id, { method: "DELETE" });
  const data = await response.json();
  return data;
};