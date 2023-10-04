'use client';
import React from "react";
import { Space, Table, Tag, Button, Checkbox, Form, Input, Popover, Layout, Select } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import getColumns from "./getColumns";
import CreateGroup from "./CreateGroupForm"
import EditGroup from "./editGroup";
import { useSearchParams } from "next/navigation";
import styles from '@/app/styles/users.module.css'



const Groups: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);
  // console.log("...1",deletedRow);

  const searchParams = useSearchParams();
  const _username = searchParams.get('data')

  const fetchGroups = async () => {
    const groups = await getGroups();

    setData(groups);
  };
  React.useEffect(() => {
    fetchGroups();
    // console.log("...", data);
  }, [data]);
  const onDelete = (group: Object) => {
    deleteGroup(group)
    setData(data);
    console.log('....', group)
  }
  const onEdit = (group: Object) => {
    console.log('....', group)
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
    backgroundColor: '#bbb',
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
    backgroundColor: '#bbb',
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
            Groups
          </div>
          <Popover content={<CreateGroup />} title="Add New Group">
            <Button type="primary" className={styles.addNewUserBut}>Add New Group</Button>
          </Popover>
        </Header>

        <Content style={contentStyle}>
          <div className={styles.table}>
            <Table columns={getColumns(onDelete, onEdit)} dataSource={data}/>
          </div>
        </Content>

        <Footer style={footerStyle}>Admin: {_username}</Footer>

      </Layout>
    </div>
  );
};

export default Groups;

const getGroups = async () => {
  const response = await fetch("http://localhost:5000/api/conversation/list/groups");
  const data = await response.json();
  return data;
};


const deleteGroup = async (group: any) => {
  const response = await fetch("http://localhost:5000/api/conversation/" + group._id, { method: "DELETE" });
  const data = await response.json();
  return data;
};