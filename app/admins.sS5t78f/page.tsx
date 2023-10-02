'use client';
import React from "react";
import { Space, Table, Tag, Button, Checkbox, Form, Input, Popover, Layout, Select } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import getColumns from './getColumns';
import CreateAdmin from "./CreateAdminForm";
import styles from '@/app/styles/users.module.css'



const Admins: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);

  const fetchAdmins = async () => {
    const admins = await getAdmins();
    setData(admins);
  };

  // React.useEffect(() => {
  //   fetchAdmins();
  //   // console.log("...", data);
  // }, [data]);

  const onDelete = (admin: object) => {
    deleteAdmin(admin)
    setData(data);
    console.log('....', admin)
  }
  const onEdit = (admin: object) => {
    console.log('....', admin)
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
            Admins
          </div>
          <div>
            <Button type="primary" onClick={()=>fetchAdmins()}>update list</Button>
          </div>
          <Popover content={<CreateAdmin />} title="Add New Admin" trigger='click'>
            <Button type="primary" className={styles.addNewUserBut}>Add New Admin</Button>
          </Popover>
        </Header>

        <Content style={contentStyle}>
          <div className={styles.table}>
            <Table columns={getColumns(onDelete, onEdit)} dataSource={data} style={{ minWidth: '600px' }} footer={() => (<div style={{ textAlign: 'center' }}></div>)} />
          </div>
        </Content>

        <Footer style={footerStyle}>ADMIN: Super Admin</Footer>

      </Layout>

    </div>
  );
};

export default Admins;

export const Confirm = async () => {
  const password = prompt('enter the super admin password');
  const response = await fetch("http://localhost:5000/api/admins/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    }, 
    body: JSON.stringify({password}),
  })

  const isConfirmed = await response.json();
  return isConfirmed;
}


const getAdmins = async () => { 
  const confirm = await Confirm();
  if(!confirm) return;

  const response = await fetch("http://localhost:5000/api/admins/list");
  const data = await response.json();
  return data;
};

const deleteAdmin = async (admin: any) => {
  const confirm = await Confirm();
  if(!confirm) return;
  
  const response = await fetch("http://localhost:5000/api/admins/" + admin._id, { method: "DELETE" });
  const data = await response.json();
  return data;
};
