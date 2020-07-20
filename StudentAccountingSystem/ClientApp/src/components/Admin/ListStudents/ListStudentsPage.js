import React, { Component } from 'react';
import { Table, Tag, Space, Input, Button, Form } from 'antd';

import * as ListStudentsActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';

const { Column, ColumnGroup } = Table;

class ListStudentsPage extends Component {
    state = {
        pagination: {
            current: 1,
            pageSize: 10,
        },
        searchFirstName: "",
        searchLastName: ""
    }

    componentDidMount() {
        const { pagination: { current, pageSize } } = this.state;
        this.props.getListStudents({ current, pageSize });
    }

    handleTableChange = (pagination, filters, sorter,) => {
        const { current, pageSize } = pagination;
        const { field, order } = sorter;
        const {searchFirstName, searchLastName} = this.state;
        this.props.getListStudents({ current, pageSize, field, order,searchFirstName, searchLastName });
    };

    onSearch = (values)=>{
        //console.log("onSearch",values)
        this.setState(values);

        const {pageSize} = this.state.pagination;
        this.props.getListStudents({current:1, pageSize ,...values});
    }

    componentWillReceiveProps(nextProps) {
        const { pagination } = this.state;
        const { totalCount, currentPage } = nextProps;
        this.setState({
            pagination: {
                ...pagination,
                total: totalCount,
                current: currentPage
            }
        })
    }

    render() {
        const { listStudents = [], isLoading} = this.props;
        const { pagination } = this.state;

        return (
            <React.Fragment>

                <Form onFinish={this.onSearch} layout={"inline"} style={{marginBottom: "15px"}}>
                    <Form.Item name="searchFirstName" label="Ім'я">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item name="searchLastName" label="Прізвище">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Пошук</Button>
                    </Form.Item>
                </Form>

                <Table style={ { overflow: "auto" } } pagination={ pagination }
                 dataSource={ listStudents } onChange={ this.handleTableChange }
                 expandable={{
                    expandedRowRender: record=> record.studentCourses.map(item=>{
                         return <p>Назва: {item.name} &nbsp;&nbsp;&nbsp;&nbsp; Початок: {item.startDate}</p>
                    }),
                    rowExpandable: record=>record.studentCourses.length>0
                 }}>

                    <Column sorter={ true } title="First Name" dataIndex="firstName" key="firstName" />
                    <Column sorter={ true } title="Last Name" dataIndex="lastName" key="lastName" />
                    <Column sorter={ true } title="Age" dataIndex="age" key="age" />
                    <Column sorter={ true } title="Register Date" dataIndex="registerDate" key="registerDate" />
                    <Column sorter={ true } title="Email" dataIndex="email" key="email" />
                    <Column key="action" render={(text, record) => (
                        <Space size="middle">
                            <Link to={`/admin/student-info/${record.id}`}>Редагувати</Link>
                        </Space>
                    )}/>
                    {/* <Column title="Registered Date " dataIndex="age" key="age" /> */ }
                </Table>
                { isLoading && <Spinner></Spinner> }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ listStudents }) => {
    return {
        listStudents: listStudents.data.students,
        totalCount: listStudents.data.totalCount,
        currentPage: listStudents.data.currentPage,
        isLoading: listStudents.loading,
        isFailed: listStudents.failed,
        error: listStudents.errors
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStudents: (filter) => {
            dispatch(ListStudentsActions.getListStudents(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentsPage);