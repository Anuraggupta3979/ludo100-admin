import React, { useEffect, useState } from "react";
import { DatePicker, Row, Table, message, Col } from "antd";
import API_MANAGER from "../../API";
import moment from "moment";
import CustomPagination from "./CustomPagination";
import { useNavigate } from "react-router-dom";

function ReportByStatus({ status }) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(moment().subtract(4, "days"));
  const [endDate, setEndDate] = useState(moment().add(4, "days"));
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      const params = {
        page: page,
        limit: 20,
        FROM_DATE: startDate,
        TO_DATE: endDate,
        req_type: status,
      };
      setLoading(true);
      const response = await API_MANAGER.getWithdrawalReport(params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getData();
    }
  }, [page, startDate, endDate]);
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
    <div>
      <Row gutter={[8, 8]}>
        <Col>
          <DatePicker
            onChange={(e) => setStartDate(e)}
            placeholder="Start Date"
          />
        </Col>
        <Col>
          <DatePicker onChange={(e) => setEndDate(e)} placeholder="End Date" />
        </Col>
      </Row>
      <div>
        <Table
          columns={columns}
          dataSource={data?.result ? data?.result : []}
          pagination={false}
          className="table"
          loading={loading}
          rowKey={"id"}
          style={{ marginTop: "24px" }}
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
    </div>
  );
}

export default ReportByStatus;
