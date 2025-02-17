import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, message, Modal, Row, Table } from "antd";
import API_MANAGER from "../API";

function DummyGames() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState();
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  const getAllGames = async () => {
    try {
      const response = await API_MANAGER.getAllDummmyGames();
      setData(response?.data?.data);
    } catch (e) {
      message.error("Something went wrong.");
    }
  };
  const handleDelete = async (data) => {
    try {
      const confirm = window.confirm("are you sure to delete?");

      if (confirm) {
        try {
          const response = await API_MANAGER.deleteDummyGames(data?._id);
          message.success("deleted Successfully");
          getAllGames();
        } catch (error) {
          message.error("Something went wrong!");
        }
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "si",
      width: "80px",
      render: (_, row, index) => {
        return <span className="cursor-pointer">{index + 1}</span>;
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Creator Name",
      dataIndex: "creator_name",
      key: "creator_name",
    },
    {
      title: "Acceptor Name",
      dataIndex: "acceptor_name",
      key: "acceptor_name",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, row) => {
        return (
          <Row gutter={[8, 8]}>
            <Col>
              <Button
                className="secondary_button"
                onClick={() => {
                  form.setFieldsValue({
                    creator_name: row?.creator_name,
                    amount: row?.amount,
                    acceptor_name: row?.acceptor_name,
                  });
                  setEdit(true);
                  setOpenModal(true);
                  setRowData(row);
                }}
              >
                Edit
              </Button>
            </Col>
            <Col>
              <Button
                className="secondary_button"
                onClick={() => handleDelete(row)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];
  const handleSubmit = async (data) => {
    try {
      const response = await API_MANAGER.createDummyGames(data);
      message.success("Created Successfully");
      setOpenModal(false);
      form.resetFields();
      getAllGames();
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  const handleEdit = async (data) => {
    try {
      const response = await API_MANAGER.editDummyGames(data, rowData?._id);
      message.success("Created Successfully");
      setOpenModal(false);
      setRowData(null);
      setEdit(false);
      form.resetFields();
      setOpenModal(false);
      getAllGames();
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllGames();
  }, []);
  return (
    <div>
      <p className="pageHeading">Dummy Challenge</p>
      <Row justify={"end"}>
        <Col>
          <Button
            onClick={() => setOpenModal(true)}
            className="secondary_button mb-20"
          >
            Create
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data || []}
        pagination={false}
        className="table"
        rowKey={"id"}
        loading={loading}
        scroll={{
          //   y: "calc(100vh - 400px)",
          x: "calc(768px)",
        }}
      />{" "}
      <Modal
        open={openModal}
        footer={false}
        onCancel={() => setOpenModal(false)}
        centered
        title="Create Game"
      >
        <Form
          layout="vertical"
          onFinish={(data) => (edit ? handleEdit(data) : handleSubmit(data))}
          form={form}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name={"amount"}
                label="Amount"
                rules={[{ required: true, message: "Please Enter Amount" }]}
              >
                <Input placeholder="Enter Amount" type="number" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name={"creator_name"}
                label="Creator Name"
                rules={[{ required: true, message: "Please Enter Prize" }]}
              >
                <Input placeholder="Enter creator name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"acceptor_name"}
                label="Acceptor Name"
                rules={[
                  { required: true, message: "Please Enter Acceptor Name" },
                ]}
              >
                <Input placeholder="Enter acceptor name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button htmlType="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default DummyGames;
