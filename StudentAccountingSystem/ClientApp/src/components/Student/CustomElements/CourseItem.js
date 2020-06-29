import React from 'react';
import { Col, Card } from 'antd';
const { Meta } = Card;
const CourseItem = ({id, image, title, description}) =>{
    return(
        <Col style={{padding: 15}} xs={ 24 } sm={12}  md={ 8 } xl={ 6 }>
            <Card 
            hoverable
            cover={<img alt="example" src="https://krapka.rv.ua/wp-content/uploads/2019/09/angli.jpg" />}
            // style={{padding:0}}
            >
                <Meta title="English" description="English courses for about 2 years" />
            </Card>
        </Col>
    )
}
export default CourseItem