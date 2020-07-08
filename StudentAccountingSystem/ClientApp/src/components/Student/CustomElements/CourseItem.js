import React from 'react';
import { Col, Card } from 'antd';
const { Meta } = Card;
const CourseItem = ({id, image, title, description}) =>{
    return(
        <Col style={{padding: 15}} xs={ 24 } sm={12}  md={ 8 } xl={ 6 }>
            <Card 
            hoverable
            cover={<img alt={title} src={image} />}
            // style={{padding:0}}
            >
                <Meta title={title} description={description} />
            </Card>
        </Col>
    )
}
export default CourseItem