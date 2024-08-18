import React, { useState, useEffect } from "react";
import API_MANAGER from "../../API";
import { Button, Col, Form, Input, message, Row, Table } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "../../styles/global.scss";
import CustomPagination from "../../components/common/CustomPagination";

function AllChallenge() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const getData = async () => {
    setLoading(true);
    let params = { ...page };
    if (search) {
      params["Room_code"] = search;
    }
    try {
      const response = await API_MANAGER.getAllChallenges(params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error("Something went wrong!");
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
  useEffect(() => {
    getData();
  }, [page]);
  return (
    <div>
      <p className="pageHeading">All Challenge</p>
      <Form layout="vertical">
        <Row gutter={24} align={"middle"}>
          <Col xs={12} lg={6}>
            <Form.Item label="Search by roomcode " name={"search"}>
              <Input
                placeholder="Enter roomcode"
                className="inputBox"
                onChange={(e) => setSearch(e?.target?.value)}
              />
            </Form.Item>
          </Col>

          <Col className="mt-32">
            <Form.Item>
              <Button
                className=""
                onClick={() => {
                  if (page?.page !== 1)
                    setPage({
                      ...page,
                      page: 1,
                    });
                  else getData();
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
          //   y: "calc(100vh - 400px)",
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

export default AllChallenge;
