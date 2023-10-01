'use client';
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Space, Table, Tag, Button, Checkbox, Form, Input, Popover, Layout, Select } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import getColumns from './getColumns';
import CreateAdmin from "./CreateAdminForm";
import styles from '@/app/styles/users.module.css'



const Admins: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);

  const searchParams = useSearchParams();
  const _username = searchParams.get('data')

  // const router = useRouter();
  // const _username = router.query; // Fetch the admin ID from the URL

  // React.useEffect(() => {
  //     if (id) {
  //         console.log('Fetching data for admin ID:', id);
  //         // Fetch data or perform actions specific to the admin with this ID
  //     }
  // }, [id]);

  
  // console.log("...1",deletedRow);

  const fetchAdmins = async () => {
    const admins = await getAdmins();
    setData(admins);
  };

  React.useEffect(() => {
    fetchAdmins();
    // console.log("...", data);
  }, [data]);

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
    justifyContent: 'center'
  };

  return (
    <div className={styles.container}>
      <Layout className={styles.layout}>
        <Header style={headerStyle}>
          <div className={styles.users}>
            Admins
          </div>
          <Popover content={<CreateAdmin />} title="Add New Admin">
            <Button type="primary" className={styles.addNewUserBut}>Add New Admin</Button>
          </Popover>
        </Header>

        <Content style={contentStyle}>
          <div className={styles.table}>
            <Table columns={getColumns(onDelete, onEdit)} dataSource={data} style={{ minWidth: '600px' }} footer={() => (<div style={{ textAlign: 'center' }}></div>)} />
          </div>
        </Content>

        <Footer style={footerStyle}>Admin: {_username}</Footer>

      </Layout>

    </div>
  );
};

export default Admins;

const getAdmins = async () => {
  const response = await fetch("http://localhost:5000/api/admins/list");
  const data = await response.json();
  return data;
};

const deleteAdmin = async (admin: any) => {
  const response = await fetch("http://localhost:5000/api/admins/" + admin._id, { method: "DELETE" });
  const data = await response.json();
  return data;
};

// export async function getStaticPaths() {
//   // Fetch the list of admin IDs from your API
//   const response = await fetch("http://localhost:5000/api/admins/list");
//   const data = await response.json();

//   // Generate the paths for each admin
//   const paths = data.map((admin) => ({
//     params: { id: admin._id.toString() },
//   }));

//   return { paths, fallback: false };
// }