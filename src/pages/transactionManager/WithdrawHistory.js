import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Form, Select, Input, message } from "antd";
import API_MANAGER from "../../API";
import moment from "moment";
import CustomPagination from "../../components/common/CustomPagination";
import { useNavigate } from "react-router-dom";
function WithdrawalHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchStatus, setSearchStatus] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      let params = {
        limit: 20,
        page: page,
      };
      if (search) {
        params["search"] = search;
      }
      if (searchStatus) {
        params["searchStatus"] = searchStatus;
      }
      const response = await API_MANAGER.getWithdrawHistory(params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

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
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      render: (item, row) => <span>{row?.User_id?.Phone}</span>,
    },
    {
      title: "User",
      dataIndex: "User",
      key: "User",
      render: (item, row) => (
        <span
          className="tableLink"
          onClick={() => navigate(`/user/view/${row?.User_id?._id}`)}
        >
          {row?.User_id ? row?.User_id?.Name : ""}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "Withdraw_type",
      key: "Withdraw_type",
    },
    {
      title: "UPI",
      dataIndex: "upi_id",
      key: "upi_id",
      render: (item, row) => <span>{row?.User_id?.upi_id}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => <span> {item ? item : "Proccessing"}</span>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{moment(item).format("LLL")}</span>,
    },
    {
      title: "Action By",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item, row) => (
        <span>{row?.action_by ? row?.action_by?.Name : "N/A"}</span>
      ),
    },
  ];
  return (
    <div className="deposit_history">
      <Row className="pageHeading mb-20">Withdrawl History</Row>
      <Form layout="vertical">
        <Row gutter={24} align={"middle"}>
          <Col xs={12} lg={6}>
            <Form.Item label="Search " name={"search"}>
              <Input
                placeholder="Search"
                // className="inputBox"
                onChange={(e) => setSearch(e?.target?.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Item label="Select Status" name={"status"}>
              <Select
                // className="selectBox"
                onChange={(e) => setSearchStatus(e)}
                placeholder="Select Status"
              >
                <Select.Option value="SUCCESS">Paid</Select.Option>
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="FAILED">Failed</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col className="mt-32">
            <Form.Item>
              <Button
                className=""
                onClick={() => {
                  setPage(1);
                  getData();
                }}
              >
                Search
              </Button>
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
          x: "calc(768px)",
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

export default WithdrawalHistory;
