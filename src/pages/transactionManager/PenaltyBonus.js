import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Form,
  Select,
  Input,
  message,
  Modal,
} from "antd";
import API_MANAGER from "../../API";
import moment from "moment";
import CustomPagination from "../../components/common/CustomPagination";
function PenaltyBonus() {
  const [data, setData] = useState();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState("Name");
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isCredVisible, setIsCredVisible] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const getData = async () => {
    setLoading(true);
    try {
      let params = {
        limit: 20,
        page: page,
      };
      if (search && searchType) {
        params["search"] = search;
        params["searchType"] = searchType;
      }
      const response = await API_MANAGER.getAllPenalty(params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const handleSubmit = async (values) => {
    try {
      if (values?.type === "bonus") {
        const confirm = window.confirm(
          "Are you sure, you want to add bonus to this user?"
        );
        if (confirm) {
          // axios.post(baseUrl + `user/bonus/${id}`, {
          //   bonus: JSON.parse(bonus),
          // });
          await API_MANAGER.addBonus(selectedRow?._id, {
            bonus: JSON.parse(values?.number),
          });
          setIsVisible(false);
          form.resetFields();
          setSelectedRow({});
          getData();
        }
      } else if (values?.type === "penalty") {
        const confirm2 = window.confirm(
          "Are you sure, you want to add penalty to this user?"
        );
        if (confirm2) {
          // axios.post(baseUrl + `user/penlaty/${id}`, {
          //   bonus: JSON.parse(bonus),
          // });
          await API_MANAGER.addPenalty(selectedRow?._id, {
            bonus: JSON.parse(values?.number),
          });
          setIsVisible(false);
          form.resetFields();
          setSelectedRow({});
          getData();
        }
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const handleCredSubmit = async (values) => {
    try {
      if (values?.id === "8Xy7zXDi7s" && values?.password === "6csNMJKwF5") {
        setIsCredVisible(false);
        setIsVisible(true);
        form2.resetFields();
      } else {
        message.error("Please enter valid credentials!");
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    getData();
  }, [page, search, searchType]);

  const columns = [
    {
      title: "No.",
      dataIndex: "si",
      width: "80px",
      render: (_, row, index) => {
        return (
          <span className="cursor-pointer">
            {(page - 1) * 20 + (index + 1)}
          </span>
        );
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },

    {
      title: "Balance",
      dataIndex: "Wallet_balance",
      key: "Wallet_balance",
      render: (item) => <span>{item.toFixed(2)}</span>,
    },

    {
      title: "Action",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item, row) => (
        <Button
          className="secondary_button"
          onClick={() => {
            setSelectedRow(row);
            setIsCredVisible(true);
          }}
        >
          Action
        </Button>
      ),
    },
  ];
  return (
    <div className="deposit_history">
      <Modal
        title="Penalty & Bonus"
        footer={false}
        centered
        open={isVisible}
        onCancel={() => {
          form.resetFields();
          setIsVisible(false);
          setSelectedRow({});
        }}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: "Please select type.",
              },
            ]}
          >
            <Select placeholder="Select type">
              <Select.Option value="penalty">Penalty</Select.Option>
              <Select.Option value="bonus">Bonus</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="number"
            rules={[
              {
                required: true,
                message: "Please enter amount.",
              },
            ]}
          >
            <Input type="number" max={250000} placeholder="Enter Amount" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Credentials"
        footer={false}
        centered
        open={isCredVisible}
        onCancel={() => {
          form2.resetFields();
          setIsCredVisible(false);
        }}
      >
        <Form form={form2} onFinish={handleCredSubmit}>
          <Form.Item
            name="id"
            rules={[
              {
                required: true,
                message: "Please select type.",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter amount.",
              },
            ]}
          >
            <Input.Password type="password" placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Row className="pageHeading">Penalty Bonus</Row>
      <Form layout="vertical">
        <Row gutter={24} align={"middle"}>
          <Col xs={12} lg={6}>
            <Form.Item label="Search By" name={"searchType"}>
              <Select
                // className="selectBox"
                onChange={(e) => setSearchType(e)}
                placeholder="Search By"
              >
                <Select.Option value="Name">Name</Select.Option>
                <Select.Option value="Phone">Phone</Select.Option>
                <Select.Option value="_id">User ID</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Item label="Search " name={"search"}>
              <Input
                placeholder="Search"
                // className="inputBox"
                onChange={(e) => setSearch(e?.target?.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        dataSource={data?.result}
        pagination={false}
        className="table"
        rowKey={"id"}
        loading={loading}
        scroll={{
          // y: "calc(100vh - 400px)",
          x: "calc(768px + 40%)",
        }}
      />
      <CustomPagination
        currentPage={page}
        setCurrentPage={setPage}
        total={data?.totalCount}
        itemPerPage={20}
      />
    </div>
  );
}

export default PenaltyBonus;
