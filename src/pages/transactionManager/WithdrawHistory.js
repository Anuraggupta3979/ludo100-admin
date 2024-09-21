import React, { useState, useEffect } from "react";
import { Row, Col, Table, message } from "antd";
import API_MANAGER from "../../API";
import moment from "moment";
import CustomPagination from "../../components/common/CustomPagination";
import { useNavigate } from "react-router-dom";
function WithdrawalHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      let params = {
        limit: 20,
        page: page,
      };

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
      title: "Account No.",
      dataIndex: "account_number",
      key: "account_number",
      render: (item, row) => <span>{row?.account_number}</span>,
    },
    {
      title: "IFSC Code",
      dataIndex: "ifsc_code",
      key: "ifsc_code",
      render: (item, row) => <span>{row?.ifsc_code}</span>,
    },
    {
      title: "Bank Name",
      dataIndex: "bank_name",
      key: "bank_name",
      render: (item, row) => <span>{row?.bank_name}</span>,
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
