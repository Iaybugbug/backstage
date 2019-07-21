import { Table, Button, Modal, Form, Input, Radio, InputNumber } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

class Student extends Component {
  state = {
    visible: false,
    userInfo: {},
    userIndex: null
  };
  showModal = (record, index) => {
    this.setState({
      visible: true,
      userInfo: record,
      userIndex: index
    });
    console.log(this.state.userInfo)
  };
  handleOk = (val, reset) => {
    this.props.updateStu(this.state.userIndex, {...this.state.userInfo, ...val})
    this.setState({
      visible: false
    })
  }
  handleCancel = (reset) => {
    this.setState({
      visible: false,
    });
  };
  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: record => {
        return <div>{record === 1 ? '男' : '女'}</div>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                this.showModal(record, index);
              }}
            >
              编辑
            </Button>
            <Button type="danger" onClick={() => {}}>
              删除
            </Button>
          </div>
        );
      },
    },
  ];
  render() {
    let { getFieldDecorator, getFieldsValue,resetFields } = this.props.form;
    return (
      <div className='table-wrapper'>
        <Table dataSource={this.props.list} columns={this.columns}/>
        <Modal
          title="用户信息"
          visible={this.state.visible}
          onOk={() => {this.handleOk(getFieldsValue())}}
          onCancel={() => {this.handleCancel()}}
          destroyOnClose={true}
        >
          <Form>
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ],
                initialValue: this.state.userInfo.name,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="年龄">
              {getFieldDecorator('age', { initialValue: this.state.userInfo.age })(
                <InputNumber max={180} min={1}/>,
              )}
              <span className="ant-form-text"> 岁</span>
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('sex', {
                initialValue: this.state.userInfo.sex === 1 ? 1 : 0
              })(
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
  componentDidMount() {
    this.props.getList()
  }
}
Student = Form.create()(Student);
export default connect(
  state => ({
    page: state.student.page,
    pageSize: state.student.pageSize,
    total: state.student.total,
    list: state.student.list,
  }),
  dispatch => ({
    getList: (page = 1, pageSize = 5) => {
      dispatch({
        type: 'student/getList',
        page,
        pageSize,
      });
    },
    delStu: id => {
      dispatch({
        type: 'student/delStu',
        id
      })
    },
    updateStu: (index, info) => {
      dispatch({
        type: 'student/updateStu',
        info,
        index
      })
    }
  }),
)(Student);
