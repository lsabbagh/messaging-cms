'use client';
import React from "react";
import { Table, Button, Popover, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import getColumns from "./getColumns";
import CreateGroup from "./CreateGroupForm"
import { useSearchParams } from "next/navigation";
import styles from '@/app/styles/users.module.css'
import { getGroups, deleteGroup } from "../service";


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
    setData([])
    setData(data)
    // console.log("...", data);
  }, []);

  const onDelete = async(group: Object) => {
    console.log('....dleteatt', group);
    await deleteGroup(group)
    setData(data);
    console.log('....deletesucc')
  }
  const onEdit = (group: Object) => {
    console.log('....edit', group)
  }

  const getDatafromCreateGroup = (newData: Object) => {
    console.log('....ddatta', newData);
    setData(data);
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
          {/* <Popover content={<CreateGroup dataToParent={getDatafromCreateGroup}/>} title="Add New Group">
            <Button type="primary" className={styles.addNewUserBut}>Add New Group</Button>
          </Popover> */}
        </Header>

        <Content style={contentStyle}>
          <div className={styles.table}>
            <Table columns={getColumns(onDelete)} dataSource={data}/>
          </div>
        </Content>

        <Footer style={footerStyle}>Admin: {_username}</Footer>

      </Layout>
    </div>
  );
};

export default Groups;


