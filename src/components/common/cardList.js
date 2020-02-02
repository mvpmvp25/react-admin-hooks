import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cardOrderList } from 'server/order';
import { Table, Divider } from 'antd';

function CardList(props) {
  const {
    publics: { page, list },
    privates: { taskList }
  } = props;
  const [state, setState] = useState({
    page,
    list,
    taskList
  });

  useEffect(() => {
    cardOrderList({
      data: { page: state.page },
      success: res => {
        setState({ list: res.data.list });
      }
    });
  }, [state.page]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      render(text) {
        return <a>{text}</a>;
      }
    },
    {
      title: '订单号',
      dataIndex: 'orderId'
    },
    {
      title: '操作',
      key: 'action',
      render(text, record) {
        return (
          <span>
            <a>Invite {record.name}</a>
            <Divider type="vertical" />
            <a>Delete</a>
          </span>
        );
      }
    }
  ];
  console.info('CardList', state);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={state.list}
        rowKey={record => record.orderId}
      />
    </div>
  );
}

CardList.propTypes = {
  publics: PropTypes.object, // array bool func number object string
  privates: PropTypes.object.isRequired
};

export default CardList;
