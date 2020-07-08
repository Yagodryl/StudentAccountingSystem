import React from 'react';
import { Col, Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const CourseItem = ({ id, image, title, description }) => {
    return (
        <Col style={ { padding: 15 } } xs={ 24 } sm={ 12 } md={ 8 } xl={ 6 }>
            <Link to={ `/student/course-info/${id}` }>
                <Card
                    hoverable
                    cover={ <img alt={ title } src={ image } /> }
                // style={{padding:0}}
                >
                    <Meta title={ title } description={ description } />
                </Card>
            </Link>
        </Col>
    )
}
export default CourseItem;