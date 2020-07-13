import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';

import * as ListStudentsActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';

const { Column, ColumnGroup } = Table;

class ListStudentsPage extends Component {
    state = {
        pagination: {
            current: 1,
            pageSize: 10,
          }
    }

    componentDidMount() {
        const {pagination: {current, pageSize}} = this.state;
        this.props.getListStudents({current,pageSize});
    }
    handleTableChange = (pagination, filters, sorter) => {
        const {current, pageSize} = pagination;
        const {field, order} = sorter;
        console.log("Table: ", {current, pageSize,field,order });
        this.props.getListStudents({current, pageSize,field,order });

        // this.fetch({
        //   sortField: sorter.field,
        //   sortOrder: sorter.order,
        //   pagination,
        //   ...filters,
        // });
      };

    render() {
        const { listStudents = [], isLoading } = this.props;
        const {pagination} = this.state;
        return (
            <React.Fragment>
                <Table style={{overflow: "auto"}} pagination={pagination} dataSource={ listStudents } onChange={this.handleTableChange}>

                    <Column sorter={true} title="First Name" dataIndex="firstName" key="firstName" />
                    <Column sorter={true} title="Last Name" dataIndex="lastName" key="lastName" />
                    <Column sorter={true} title="Birthday" dataIndex="birthday" key="birthday" />
                    <Column sorter={true} title="Register Date" dataIndex="registerDate" key="registerDate" />
                    <Column sorter={true} title="Email" dataIndex="email" key="email" />
                    {/* <Column title="Registered Date " dataIndex="age" key="age" /> */ }
                </Table>
                { isLoading && <Spinner></Spinner> }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ listStudents }) => {
    console.log(listStudents);
    return {
        listStudents: listStudents.data,
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