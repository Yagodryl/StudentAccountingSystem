import React, { Component } from 'react';
import { Form, Button, Divider, DatePicker } from 'antd';

const SubscribeForm = ({ subscribe }) => {
    return (
        <div>
            <Divider orientation="left">Виберіть дату навчання</Divider>
            <Form name="subscribe" onFinish={ subscribe }>
                <Form.Item name="studyDate"
                    rules={ [{ required: true, message: "Введіть дату!" }] }
                >
                    <DatePicker size="large" placeholder="Дата навчання" format={ 'DD/MM/YYYY' }></DatePicker>
                </Form.Item>
                <Button type="primary" htmlType="submit" size="large">Підписатися</Button>
            </Form>
        </div>
    )
}
export default SubscribeForm;