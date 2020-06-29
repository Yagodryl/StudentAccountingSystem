import React from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { LogoutOutlined} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;

// const menu = (
//   <Menu size={ "large" }>
//     {/* <Menu.Item  style={{fontSize: "16px"}}>
//     <Link to="/student/profile"><UserOutlined style={{fontSize: "20px"}} />Profile</Link>
//     </Menu.Item> */}
//     {/* <Menu.Divider /> */ }
//     <Menu.Item danger style={ { fontSize: "14px" } }> <LogoutOutlined style={ { fontSize: "18px" } } onClick=() />Вихід</Menu.Item>
//   </Menu>
// );
const MyHeader = ({image, logout})=> {
    return (
    <Header id="myHeader"  >
      <div className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Scandinavian_Airlines_logo.svg/1200px-Scandinavian_Airlines_logo.svg.png" height="64px" />
      </div>
      <Dropdown overlay={
        (
          <Menu size={ "large" }>
            {/* <Menu.Item  style={{fontSize: "16px"}}>
            <Link to="/student/profile"><UserOutlined style={{fontSize: "20px"}} />Profile</Link>
            </Menu.Item> */}
            {/* <Menu.Divider /> */ }
            <Menu.Item  onClick={logout} danger style={ { fontSize: "14px" } }> <LogoutOutlined style={ { fontSize: "18px" } } />Вихід</Menu.Item>
          </Menu>
        )
       } placement="bottomRight">
        <Avatar size={ 46 } style={ { float: "right", marginTop: 10 } } src={image} />
      </Dropdown>
    </Header>);
}
export default MyHeader