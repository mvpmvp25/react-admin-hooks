import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { cardOrderList } from 'server/order';
import { Table, Divider } from 'antd';

function CardList() {
  const [page] = useState(1); // , setPage
  const [list, setList] = useState([]);

  useEffect(() => {
    cardOrderList({
      data: { page },
      success: res => {
        setList(res.data.list);
      }
    });
  }, [page]);

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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={record => record.orderId}
      />
    </div>
  );
}

CardList.propTypes = {};

export default CardList;
