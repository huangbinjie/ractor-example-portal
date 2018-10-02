import * as React from "react";
import { Navbar } from "@components/navbar/navbar";
import { Router } from '@app/router';
import * as style from "@app/app.style";
import { Menu } from "@components/menu/menu";

export default function Layout() {
  return (
    <div className={style.app} >
      <Menu />
      <main className={style.main}>
        <Navbar />
        <div className={style.container}>
          <Router />
        </div>
      </main>
    </div>
  )
}