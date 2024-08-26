import React, { useState, useEffect } from "react";
import { Row, Table } from "antd";
import API_MANAGER from "../../API";
import { message } from "antd";

function AllAdmin() {
  const [adminList, setAdminList] = useState([]);
  const getAdminList = async () => {
    try {
      const response = await API_MANAGER.getAllAdmin();
      setAdminList(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
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
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (item) => (
        <span style={{ textTransform: "capitalize" }}>{item}</span>
      ),
    },
  ];

  useEffect(() => {
    getAdminList();
  }, []);
  return (
    <div>
      <Row className="allAdminTitle">All Admin</Row>

      <Table
        columns={columns}
        dataSource={adminList}
        pagination={false}
        className="table"
        rowKey={"id"}
        style={{ marginTop: "24px" }}
        scroll={{
          // y: "calc(100vh - 400px)",
          x: "calc(360px)",
        }}
      />
    </div>
  );
}

export default AllAdmin;
