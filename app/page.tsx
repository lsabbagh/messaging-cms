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
      <div>
        <button onClick={()=>router.push('/users')}>Users</button>
        <button onClick={()=>router.push('/adminLogin')}>Admins</button>
        <button onClick={()=>router.push('/adminssS5t78f')}>Admins directly without signin</button>
      </div>
      {/* <Users /> */}
      {/* <Admins /> */}
    </main>
  )
}
