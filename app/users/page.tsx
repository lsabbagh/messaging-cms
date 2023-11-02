'use client';
import React from "react";
import { Table, Button, Popover, Layout, Switch } from "antd";
const { Header, Footer, Content } = Layout;
import getColumns from "./getColumns";
import CreateUser from "./CreateUserForm";
import { useSearchParams } from "next/navigation";
import styles from '@/app/styles/users.module.css';
import { getUsers, deleteUser, getTokenData } from "../service";



const Users: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);
  const [isDeleted, setIsDeleteed] = React.useState<boolean>(false)
  // console.log("...1",deletedRow);

  const storageData: Object | any = getTokenData()
  const _username = storageData.admin.username

  const fetchUsers = async () => {
    const users = await getUsers(isDeleted);
    console.log('....user..fetchUsers', users);
    setData(users);
  };

  React.useEffect(() => {
    fetchUsers();
    // console.log("...", data);
  }, [isDeleted]);

  const onDelete = (user: Object) => {
    deleteUser(user)
    setData(data);
    console.log('....', user)
  };

  const onEdit = (user: Object) => {
    console.log('....', user)
  };

  const onSwitchChange = () => {
    setIsDeleteed(!isDeleted);
    fetchUsers();
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
    // backgroundColor: '#A7D5D8',
    background: 'linear-gradient(to right, #BEF1FF, #ccc)',
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
    // backgroundColor: '#A7D5D8',
    background: 'linear-gradient(to right, #BEF1FF, #ccc)',
    lineHeight: '64px',
    height: 64,
    fontSize: '16px',
    fontWeight: 'bolder',
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <div className={styles.container}>
      <Layout className={styles.layout}>
        <Header style={headerStyle}>
          <div className={styles.users}>
            Users
          </div>
          <Switch checkedChildren="active" unCheckedChildren="deleted" defaultChecked onChange={onSwitchChange} className={styles.switch} />
          <Popover content={<CreateUser />} title="Add New User">
            <Button type="primary" className={styles.addNewUserBut}>Add New User</Button>
          </Popover>
        </Header>

        <Content style={contentStyle}>
          <div className={styles.table}>
            <Table columns={getColumns(onDelete, onEdit)} dataSource={data} footer={() => (<div style={{ textAlign: 'center' }}></div>)} />
          </div>
        </Content>

        <Footer style={footerStyle}>Admin: {_username}</Footer>

      </Layout>
    </div>
  );
};

export default Users;