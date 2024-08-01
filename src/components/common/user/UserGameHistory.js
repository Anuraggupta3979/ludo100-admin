import React, { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../CustomPagination";
import API_MANAGER from "../../../API";
function UserGameHistory({ id }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    const params = {
      limit: 20,
      page: page,
    };
    try {
      setLoading(true);
      const response = await API_MANAGER.getGameHistoryById(id, params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    if (id) {
      getData();
    }
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
      title: "Creator",
      dataIndex: "Creator",
      key: "Creator",
      render: (_, row) => {
        return <span className="cursor-pointer">{row?.Created_by?.Name}</span>;
      },
    },
    {
      title: "Accepter",
      dataIndex: "Accepter",
      key: "Accepter",
      render: (_, row) => {
        return (
          <span className="cursor-pointer">
            {row?.Accepetd_By ? row?.Accepetd_By?.Name : "---"}
          </span>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "Game_Ammount",
      key: "Game_Ammount",
    },
    {
      title: "WIN/LOSE",
      dataIndex: "winnAmount",
      key: "winnAmount",
      render: (item, row) => (
        <span>
          {row?.Winner
            ? id == row?.Winner?._id
              ? "+" + row?.winnAmount
              : "-" + row?.Game_Ammount
            : id == row?.Created_by?._id
            ? row?.winnAmount
            : "-" + row?.winnAmount}
        </span>
      ),
    },
    {
      title: "Closing Balance",
      dataIndex: "closing_balance",
      key: "closing_balance",
      render: (item, row) => (
        <span>
          {row?.Winner
            ? id === row?.Winner?._id
              ? row?.Winner_closingbalance
              : row?.Loser_closingbalance
            : id === row?.Created_by?._id
            ? row?.Loser_closingbalance
            : row?.Winner_closingbalance}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Game Type",
      dataIndex: "Game_type",
      key: "Game_type",
    },
    {
      title: "Winner",
      dataIndex: "Winner",
      key: "Winner",
      render: (item, row) => (
        <span>{row?.Winner ? row?.Winner?.Name : ""}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, row) => {
        return (
          <span className="cursor-pointer">
            {moment(row?.createdAt).format("LLL")}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, row) => {
        return (
          <Button
            className="secondary_button"
            onClick={() => navigate(`/view-challenges/${row?._id}`)}
          >
            View
          </Button>
        );
      },
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

export default UserGameHistory;
