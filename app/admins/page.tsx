"use client";
import React from "react";
import { Table, Button, Popover, Layout, Switch } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import getColumns from "./getColumns";
import CreateAdmin from "./CreateAdminForm";
import styles from "@/app/styles/users.module.css";
import { getAdmins, deleteAdmin, Confirm } from "../service";
import Confirmadmin from "./Confirmadmin";

const Admins: React.FC = () => {
  const [data, setData] = React.useState<[]>([]);
  const [isDeleted, setIsDeleteed] = React.useState<boolean>(false);
  const [admin, setAdmin] = React.useState<boolean>(false);

  const handleSuperAdmin = () => {
    fetchAdmins();
  };

  const retrieveSuperAdmin = () => {
    const dataString = localStorage.getItem('admin');
    // console.log('.... ',);
    if (dataString) {
      const data: any = JSON.parse(dataString);
      setAdmin(data?.isConfirmed || false);
    }
  }

  const fetchAdmins = async () => {
    const admins = (admin)? await getAdmins(isDeleted): [];
    // console.log('.... fetchAdmins.................',);
    setData(admins);
  };

  React.useEffect(() => {
    fetchAdmins();
    retrieveSuperAdmin();
  }, [isDeleted, admin]);

  const toggleDelete = () => {
    setIsDeleteed(!isDeleted);
    fetchAdmins();
  }

  const handleSetAdmin = (data: any) => {
    setAdmin(data);
    fetchAdmins();
    // console.log('.... hadnleSetAdmin',data);
  } 

  const onDelete = async (admin: object) => {
    await deleteAdmin(admin);
    fetchAdmins();
    // console.log('....', admin)
  };
  const onEdit = (admin: object) => {
    fetchAdmins();
    // console.log('....', admin)
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    // textAlign: 'left',
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    background: "linear-gradient(to right, #BEF1FF, #ccc)",
    // backgroundColor: '#526D82',
    // backgroundColor: '#96B6C5',
    fontWeight: "bolder",
    fontSize: "25px",
  };
  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    // backgroundColor: 'red',
  };
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    // backgroundColor: '#526D82',
    background: "linear-gradient(to right, #BEF1FF, #ccc)",
    lineHeight: "64px",
    height: 64,
    fontSize: "16px",
    fontWeight: "bolder",
    verticalAlign: "middle",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div className={styles.container}>
      <Layout className={styles.layout}>
        <Header style={headerStyle}>
          <div className={styles.users}>Admins</div>
          <div>
            {admin && (
              <Switch
                checkedChildren="active"
                unCheckedChildren="deleted"
                defaultChecked
                onChange={toggleDelete}
                style={{ marginRight: 5 }}
              />
            )}
            {!admin && (
              <Popover
                content={<Confirmadmin setAdmin={handleSetAdmin}/>}
                title="edit user"
                trigger="click"
              >
                <Button type="primary" onClick={handleSuperAdmin}>
                  Super Admin
                </Button>
              </Popover>
            )}
          </div>
          <Popover
            content={<CreateAdmin />}
            title="Add New Admin"
            trigger="click"
          >
            <Button type="primary" className={styles.addNewUserBut}>
              Add New Admin
            </Button>
          </Popover>
        </Header>

        <Content style={contentStyle}>
          {
            admin &&
            <div className={styles.table}>
            <Table
              columns={getColumns(onDelete, onEdit)}
              dataSource={data}
              style={{ minWidth: "600px" }}
              footer={() => <div style={{ textAlign: "center" }}></div>}
            />
          </div>
          }
        </Content>

        <Footer style={footerStyle}>ADMIN: Super Admin</Footer>
      </Layout>
    </div>
  );
};

export default Admins;
