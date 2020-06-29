import React, { Component } from 'react';
import { Layout } from 'antd';
import MySider from "./MySider";
import MyHeader from "./MyHeader";
import "./StudentLayout.css";
import { connect } from 'react-redux';

import { logout } from "../../components/LoginAndRegister/reducer";
import { Redirect } from 'react-router';

const { Content, Footer } = Layout;

class MainLayout extends Component {
    state = {}



    render() {
        const { user, isAuthenticated } = this.props;
        let isAccess=false;

        if (isAuthenticated) {
            const { roles } = user;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i] === 'Student')
                    isAccess = true;
            }
        }
        const content = (
            <Layout style={ { minHeight: '100vh' } }>
                <MyHeader logout={ () => this.props.logout() } image={ `/StudentImages/50_${user.image}` } />
                <Layout>
                    <MySider />
                    <Layout className="site-layout">
                        {/* <div className="blurBack"/> */ }
                        <Content style={ { margin: '24px 16px 0' } }>
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
        )
        return (
            isAccess ? content: <Redirect to="/login"/>
        );
    }
}

const mapStateToProps = ({ loginAndRegister }) => {
    return {
        user: loginAndRegister.user,
        isAuthenticated: loginAndRegister.isAuthenticated,

    }
}



export default connect(mapStateToProps, { logout })(MainLayout);