// import {HashRouter as Router, Switch, Route} from "react-router-dom"
"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Logout } from "./service";
import { Popover, Button, Form, Input } from "antd";
import Login from "./login";
import styles from "@/app/styles/app.module.css"
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
// import 'antd/dist/antd';

// if the number of users is big the cms page is flowing down instead of pagination. fix it

if(process.env.NODE_ENV === 'production') disableReactDevTools();

export default function Home() {
  const [state, setState] = React.useState<any>({})
  const token = state?.token

  const router = useRouter();

  const retrieveAdmin = () => {
    const dataString = localStorage.getItem('token');
    if (dataString) {
      const data: any = JSON.parse(dataString);
      setState(data);
    }
  }

  React.useEffect(() => {
    retrieveAdmin();
  }, [])

  const handleDataFromSignIn = (data: any) => {
    setState(data)
  }

  const logOut = async () => {
    await Logout(state);
    setState(null)
  }

  const isSignedIn = !!token;
  // console.log('....state', state);

  return (
    <main>
      <div className={styles.container}>
        {isSignedIn && <>

          <div className={styles.background}> </div>
          <div className={styles.buttons}>
          <Button onClick={() => router.push('/users')} type="primary" className={styles.button}>Users</Button>
          <Button onClick={() => router.push('/groups')} type="primary" className={styles.button}>Groups</Button>
          <Button onClick={() => router.push('/admins')} type="primary" className={styles.button}>Admins</Button>
          <Button onClick={() => router.push('/changePass')} type="primary" className={styles.button}>Password Changer</Button>

          <br />
          <br />
          <Button onClick={logOut} className={styles.logout} ghost danger>Log Out</Button>
          </div>
        </>}


        {!isSignedIn &&
          <Login onSignIn={handleDataFromSignIn} />
        }
      </div>
    </main>
  )
}
