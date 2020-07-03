import React from 'react';
import { Menu, Avatar, Dropdown, Layout } from 'antd';
import { LogoutOutlined} from '@ant-design/icons';
const { Header } = Layout;

const MyHeader = ({ logout }) => {
    return (
        <Header id="myHeader"  >
            <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Scandinavian_Airlines_logo.svg/1200px-Scandinavian_Airlines_logo.svg.png" height="64px" />
            </div>
            <Dropdown overlay={
                (
                    <Menu size={ "large" }>
                        <Menu.Item onClick={ logout } danger style={ { fontSize: "14px" } }> <LogoutOutlined style={ { fontSize: "18px" } } />Вихід</Menu.Item>
                    </Menu>
                )
            } placement="bottomRight">
                <Avatar size={ 46 } style={ { float: "right", marginTop: 10 } }>Admin</Avatar>
            </Dropdown>
        </Header>);
}
export default MyHeader;