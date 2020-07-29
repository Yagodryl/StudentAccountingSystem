import React, { Component } from 'react';
import { Table, Col, Row, } from 'antd';
import * as ListCoursesActions from "./reducer";
import { connect } from 'react-redux';
import Spinner from '../../Spinner';

const { Column } = Table;

class ListCoursesPage extends Component {
    state = {}
    componentDidMount() {
        this.props.getCourses();
    }
    render() {
        const { listCourses = [], isLoading } = this.props;

        return (
            <React.Fragment>
                <Table style={ { overflow: "auto" } } pagination={ false }
                    dataSource={ listCourses }
                    expandable={ {
                        expandedRowRender: record => (
                            <Row>
                                <Col style={{marginRight: "15px"}}>
                                    <img alt={ record.name } src={ record.image } height="50px" />
                                </Col>
                                <Col>
                                    <span style={ { whiteSpace: "pre-line" } }>{ record.description }</span>
                                </Col>
                            </Row>
                        ),
                        rowExpandable: record => record.description != ''
                    } }>
                    <Column title="Назва" dataIndex="name" key="name" />
                    <Column title="Короткий опис" dataIndex="shortDescription" key="shortDescription" />

                    {/* <Column title="Registered Date " dataIndex="age" key="age" /> */ }
                </Table>
                { isLoading && <Spinner></Spinner> }
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ listCourses }) => {
    return {
        listCourses: listCourses.data,
        isLoading: listCourses.loading,
        isFailed: listCourses.failed,
        error: listCourses.errors
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getCourses: () => {
            dispatch(ListCoursesActions.getCourses());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListCoursesPage);