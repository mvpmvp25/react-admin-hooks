import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import { dataCenter } from 'utils/tool';

function cardSearch(props) {
  const [state, setState] = useState(
    dataCenter.fromJS({
      expand: false
    })
  );
  const { expand } = dataCenter.toJS(state);
  const getFields = () => {
    const count = expand ? 10 : 6;
    const { getFieldDecorator } = props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!'
                }
              ]
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const handleSearch = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      console.info('Received values of form: ', values);
    });
  };

  const handleReset = () => {
    props.form.resetFields();
  };

  const toggle = () => {
    setState(dataCenter.merge(state, { expand: !expand }));
  };

  return (
    <Form className="ant-advanced-search-form" onSubmit={handleSearch}>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            Clear
          </Button>
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>
            Collapse <Icon type={expand ? 'up' : 'down'} />
          </a>
        </Col>
      </Row>
    </Form>
  );
}

cardSearch.propTypes = {
  form: PropTypes.object.isRequired
};

export default Form.create({ name: 'card_search' })(cardSearch); // name为表单域内字段 id 的前缀
