import React, {Component}from 'react';
// import { Container } from 'reactstrap';
// import { Layout } from 'antd';

import { Layout } from 'antd';


import MySider from "./MySider";
import MyHeader from "./MyHeader";

import "./StudentLayout.css";
const {  Content, Footer } = Layout;

class MainLayout extends Component {
    state = {}
    render() {
        return (
            <Layout style={ { minHeight: '100vh' } }>
                   <MyHeader/>
                <Layout>
                <MySider/>
                <Layout className="site-layout">

                {/* <div className="blurBack"/> */}
                    <Content style={{ margin: '24px 16px 0' }}>
                        {/* <Breadcrumb style={ { margin: '16px 0' } }>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <div className="site-layout-background" style={ { padding: 24, minHeight: 360 } }>
                            { this.props.children }
                        </div>
                    </Content>

                <Footer style={ { textAlign: 'center' } }>Student accounting system ©2020</Footer>
                </Layout>

                </Layout>

            </Layout>
        );
    }
}

export default MainLayout;