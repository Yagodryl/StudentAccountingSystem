import React, { Component } from 'react';
import { Row, Col, Tabs } from 'antd';

import "./LoginAndRegister.scss";

import Login from "./Login"
import Register from "./Register"

const { TabPane } = Tabs;

const myLoginForm = {
    background: "rgba(240,240,240,.8)",
    padding: "25px",
    
}

class LoginAndRegisterPage extends Component {
    state = {}

    render() {
        // const style = { background: 'https://www.peopletopeople.com/wp-content/uploads/2019/11/People-to-People-International-Student-Travel-Europe--2880x1600.jpg', width: 'auto', heigth: '100%' };

        return (
            <React.Fragment>
                <Row justify="center"  align="middle" style={{height: "100%"}}>
                    {/* <Col span={4} md={ 12 } xl={ 16 }>
                    </Col> */}
                    <Col span={4} xs={ 24 } md={ 12 } xl={ 8 } style={myLoginForm}>
                        <Tabs size={"large"} defaultActiveKey="1" >
                            <TabPane tab="Логін" key="1">
                            <Login/>
                            </TabPane>
                            <TabPane tab="Реєстрація" key="2">
                                <Register/>
                            </TabPane>
                        </Tabs>
                        
                    </Col>
                </Row>
                </React.Fragment>

        );
    }
}

export default LoginAndRegisterPage;