import React from "react";
import ParentContainer from "./ParentContainer";
import { Outlet } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import Header from "./Header";
import Footer from "./Footer";
import ScrollUpButton from "./ScrollUpButton";
import ChatTab from "./ChatTab";

function Layout() {
  return (
    <ParentContainer>
      <CenteredContainer>
        <Header />
        <Outlet />
      </CenteredContainer>

      <ScrollUpButton />
      <Footer />

      <ChatTab />
    </ParentContainer>
  );
}

export default Layout;
