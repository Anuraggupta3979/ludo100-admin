import moment from "moment";
import React, { useState, useEffect } from "react";
import API_MANAGER from "../../../API";
import { Table, message } from "antd";
import CustomPagination from "../CustomPagination";

function UserDepositHistory({ id }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    const params = {
      limit: 20,
      page: page,
    };
    try {
      setLoading(true);
      const response = await API_MANAGER.getDepositHistoryById(id, params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    if (id) getData();
  }, [id, page]);
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Closing Balance",
      dataIndex: "closing_balance",
      key: "closing_balance",
      render: (item) => <span>{item?.toFixed(2)}</span>,
    },
    {
      title: "Type",
      dataIndex: "payment_gatway",
      key: "payment_gatway",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (item) => <span>{moment(item).format("LLL")}</span>,
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data?.result}
        pagination={false}
        className="table"
        rowKey={"id"}
        loading={loading}
        scroll={{
          //   y: "calc(100vh - 400px)",
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

export default UserDepositHistory;
