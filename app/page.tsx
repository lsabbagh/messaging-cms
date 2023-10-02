// import {HashRouter as Router, Switch, Route} from "react-router-dom"
"use client"
import { useRouter } from "next/navigation";
import {Popover, Button} from "antd";
import App from "./app";

import 'antd/dist/antd';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <div>   {/*fix the path |*/}
        <button onClick={()=>router.push('/Login/users')}>Users</button> 
        {/* <button onClick={()=>router.push('/adminLogin')}>Admins directly </button> */}
        <button onClick={()=>router.push('/admins.sS5t78f')}>Admins</button>
        <br />
        <br />
        <button onClick={()=>router.push('/users.wj8Gj8Fa0')}>Users directly </button>
        
      </div>
      {/* <Users /> */}
      {/* <Admins /> */}
    </main>
  )
}
