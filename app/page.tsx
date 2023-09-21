// import {HashRouter as Router, Switch, Route} from "react-router-dom"
"use client"
import Users from "./users";
import App from "./app";


export default function Home() {
  return (
    <main>
      <Users />
      <App />
    </main>
  )
}
