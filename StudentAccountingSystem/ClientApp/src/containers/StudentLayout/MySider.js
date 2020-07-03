import React, { Component } from 'react';
import { Layout, Menu} from 'antd';
import {
    UserOutlined,
    BookOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

class MySider extends Component {
  state = { collapsed: false, }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() { 
    return ( 
    <Sider
    className="site-layout-background"
     breakpoint="md"
    collapsedWidth="0"
    onBreakpoint={broken => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}>
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/student/profile">Мій профіль</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/student/list-courses">Список курсів</Link>
        </Menu.Item>
        {/* <Menu.Item key="3" icon={<TeamOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          nav 4
        </Menu.Item> */}
        {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />} /> */}
      </Menu>
    </Sider> );
  }
}
 
export default MySider;
