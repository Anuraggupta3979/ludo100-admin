import React, { useState, useEffect } from "react";
import { Row, Col, Table, message } from "antd";
import API_MANAGER from "../../API";
import moment from "moment";
import CustomPagination from "../../components/common/CustomPagination";
import { useNavigate } from "react-router-dom";
function RedeemHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const Profile = async () => {
    try {
      setLoading(true);
      let params = {
        limit: 20,
        page: page,
      };

      const response = await API_MANAGER.getRedeemHistory(params);
      setData(response?.data?.data);
      // setPage(response?.data?.data?.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    Profile();
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
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      render: (item, row) => <span>{row?.User_id?.Phone}</span>,
    },
    {
      title: "User",
      dataIndex: "User",
      key: "user",
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (item, row) => (
        <>
          {row?.status !== "PAID" &&
          row?.status !== "Pending" &&
          row?.status !== "FAILED" ? (
            <>
              {/* {(row?.isupdated && row?.status) || (
                <Select
                  placeholder="Select action"
                  onChange={(e) => handleFail(e, row?._id)}
                >
                  <Select.Option value="PAID">Paid</Select.Option>
                  <Select.Option value="FAILED">Fail</Select.Option>
                </Select>
              )} */}
              <span>Pending</span>
            </>
          ) : row?.status === "FAILED" ? (
            <span>FAILED</span>
          ) : (
            <span>{row?.status}</span>
          )}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{moment(item).format("LLL")}</span>,
    },
  ];
  return (
    <div className="deposit_history">
      <Row className="pageHeading mb-20">Redeem History</Row>

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

export default RedeemHistory;
