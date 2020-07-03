import React, { Component } from 'react';
import { Layout } from 'antd';
import MySider from "./MySider";
import MyHeader from "./MyHeader";
import { connect } from 'react-redux';
import { logout } from "../../components/LoginAndRegister/reducer";
import { Redirect } from 'react-router';

import "./AdminLayout.css";

const { Content, Footer } = Layout;
class MainLayout extends Component {
    state = {}

    render() {
        const { user, isAuthenticated } = this.props;
        let isAccess=false;

        if (isAuthenticated) {
            const { roles } = user;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i] === 'Admin')
                    isAccess = true;
            }
        }
        const content = (
            <Layout style={ { minHeight: '100vh' } }>
                <MyHeader logout={ () => this.props.logout() } />
                <Layout>
                    <MySider />
                    <Layout className="site-layout">
                        <Content style={ { margin: '24px 16px 0' } }>
                            <div className="site-layout-background" style={ { padding: 24, minHeight: 360 } }>
                                { this.props.children }
                            </div>
                        </Content>
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