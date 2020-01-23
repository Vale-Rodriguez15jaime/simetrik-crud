import React from "react";

import Nav from "./nav";
import SideBar from "./SideBar";
import "../styles/styles.sass";

const Layout = props => {
  return (
    <>
      <Nav />

      <div className='container'>
        <div className='columns'>
          <div className='column is-3 '>
            <SideBar />
          </div>

          <div className='column is-9'>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
