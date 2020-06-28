import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;

const menu = (
  <Menu size={"large"}>
    <Menu.Item  style={{fontSize: "16px"}}>
    <UserOutlined style={{fontSize: "20px"}} />Мій профіль
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item danger style={{fontSize: "14px"}}> <LogoutOutlined style={{fontSize: "18px"}} />Вихід</Menu.Item>
  </Menu>
);
class MyHeader extends Component {
  state = {  }
  render() { 
    return ( <Header id="myHeader"  >

    {/* <Header className="header"> */}
      <div className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Scandinavian_Airlines_logo.svg/1200px-Scandinavian_Airlines_logo.svg.png" height="64px"/>
      </div>
      {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar size={46} style={{float: "right",  marginTop: 10}} src="https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png"/>
      </Dropdown>
      {/* </Menu> */}
    
       {/* <div className="logo">
       <img style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Scandinavian_Airlines_logo.svg/1200px-Scandinavian_Airlines_logo.svg.png" height="64px"/>
       
      <Dropdown overlay={menu} placement="bottomRight">
          <Avatar size={46} style={{float: "right",  marginTop: 10}} src="https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png"/>
      </Dropdown>
      </div> */}
  </Header> );
  }
}
 
export default MyHeader;