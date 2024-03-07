'use client';
import React from "react";
import { Table, Button, Popover, Layout } from "antd";
const { Header, Footer, Content } = Layout;
import getColumns from "./getColumns";
import CreateGroup from "./CreateGroupForm"
import { useSearchParams } from "next/navigation";
import styles from '@/app/styles/users.module.css'
import { getGroups, deleteGroup, getTokenData } from "../service";


const Groups: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);
  const [admin, setAdmin] = React.useState<string>('')

  // console.log("....1",deletedRow);

  const fetchGroups = async () => {
    const groups = await getGroups();
    setData(groups);
  };

  React.useEffect(() => {
    fetchGroups();

    const storageData: Object | any = getTokenData();
    setAdmin(storageData?.admin?.username);
    // console.log("....", data);
  }, []);

  const onDelete = async (group: Object) => {
    // console.log('....dleteatt', group);
    await deleteGroup(group)
    setTimeout(()=>{
      fetchGroups();
    })
    // console.log('....deletesucc')
  }
  const onEdit = (group: Object) => {
    setTimeout(()=>{
      fetchGroups();
    })
    // console.log('....edit', group)
  }

  const getDatafromCreateGroup = (newData: Object) => {
    // console.log('....ddatta', newData);
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
    background: 'linear-gradient(to right, #BEF1FF, #ccc)',
    // backgroundColor: '#bbb',
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
    // backgroundColor: '#bbb',
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
            Groups
          </div>
          <Popover content={<CreateGroup dataToParent={getDatafromCreateGroup} fetchGroups={fetchGroups}/>} title="Add New Group">
            <Button type="primary" className={styles.addNewUserBut}>Add New Group</Button>
          </Popover>
        </Header>

        <Content style={contentStyle}>
          <div className={styles.table}>
            <Table 
              columns={getColumns(onDelete, onEdit)} 
              dataSource={data} 
              pagination={{pageSize: 8}}
            />
          </div>
        </Content>

        <Footer style={footerStyle}>Admin: {admin}</Footer>

      </Layout>
    </div>
  );
};

export default Groups;


