import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { dataCenter } from 'utils/tool';
import { cardOrderList } from 'server/order';
import { Table, Divider } from 'antd';

function CardList(props) {
  const {
    publics: { page, list },
    privates: { taskList }
  } = props;
  const [state, setState] = useState(
    dataCenter.fromJS({
      page,
      list,
      taskList
    })
  );

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

  const { page: cardPage, list: cardList } = dataCenter.toJS(state);

  useEffect(() => {
    cardOrderList({
      data: { page: cardPage },
      success: res => {
        //setState({ list: res.data.list });
        setState(dataCenter.merge(state, { list: res.data.list }));
      }
    });
  }, [cardPage]);

  return (
    <div>
      <Table columns={columns} dataSource={cardList} rowKey={record => record.orderId} />
    </div>
  );
}

CardList.propTypes = {
  publics: PropTypes.object, // array bool func number object string
  privates: PropTypes.object.isRequired
};

export default CardList;
