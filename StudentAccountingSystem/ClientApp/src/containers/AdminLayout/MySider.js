import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
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
                onBreakpoint={ broken => {
                } }
                onCollapse={ (collapsed, type) => {
                } }>
                <Menu theme="light" defaultSelectedKeys={ ['1'] } mode="inline">
                    <Menu.Item key="1" icon={ <UserOutlined /> }>
                        <Link to="/admin/list-students">Список студентів</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={ <BookOutlined /> }>
                        <Link to="/admin/add-course">Додати курс</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={ <AppstoreOutlined /> }>
                        <Link to="/admin/list-courses">Список курсів</Link>
                    </Menu.Item>
                </Menu>
            </Sider>);
    }
}

export default MySider;