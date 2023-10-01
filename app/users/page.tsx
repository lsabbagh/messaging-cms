'use client';
import React from "react";
import { Space, Table, Tag, Button, Checkbox, Form, Input, Popover, Layout, Select } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import getColumns from "./getColumns";
import CreateUser from "./CreateUserForm"
import SignInForm from "./SignInForm"
import EditUser from "./EditUser";
import styles from '@/app/styles/users.module.css'



const Users: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);
  // console.log("...1",deletedRow);

  const fetchUsers = async () => {
    const users = await getUsers();

    setData(users);
  };
  React.useEffect(() => {
    fetchUsers();
    // console.log("...", data);
  }, [data]);
  const onDelete = (user: Object) => {
    deleteUser(user)
    setData(data);
    console.log('....', user)
  }
  const onEdit = (user: Object) => {
    console.log('....', user)
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    // textAlign: 'left',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#526D82',
    // backgroundColor: '#96B6C5',
    fontWeight: 'bolder',
    fontSize: '25px',
  };
  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignContent: 'center',
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    // backgroundColor: 'red',
  };
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#526D82',
    lineHeight: '64px',
    height: 64,
  };

  return (
    <div className={styles.container}>
      <Layout className={styles.layout}>
        <Header style={headerStyle}>
          <div className={styles.users}>
            Users
          </div>
          <Popover content={<CreateUser />} title="Add New User">
            <Button type="primary" className={styles.addNewUserBut}>Add New User</Button>
          </Popover>
        </Header>

        <Content style={contentStyle}>
          <div className={styles.table}>
            <Table columns={getColumns(onDelete, onEdit)} dataSource={data} footer={() => (<div style={{ textAlign: 'center' }}></div>)} />
          </div>
        </Content>

        <Footer style={footerStyle}></Footer>

      </Layout>

      <br />

      <div className={styles.signInForm}>
        <SignInForm />
      </div>

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