// import {HashRouter as Router, Switch, Route} from "react-router-dom"
"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Logout } from "./service";
import { Popover, Button, Form, Input } from "antd";
import Login from "./login";
// import 'antd/dist/antd';


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
  console.log('....state', state);

  return (
    <main>
      <div style={{ width: '100%', height: '100%' }}>
        {isSignedIn && <>

          <button onClick={() => router.push('/users')}>Users</button>
          <button onClick={() => router.push('/groups')}>Groups</button>
          <button onClick={() => router.push('/admins')}>Admins</button>

          <br />
          <br />
          <button onClick={logOut}>Log Out</button>
        </>}


        {!isSignedIn &&
          <Login onSignIn={handleDataFromSignIn} />
        }
      </div>
    </main>
  )
}
