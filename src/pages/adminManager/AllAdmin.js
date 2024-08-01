import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Table } from "antd";
import API_MANAGER from "../../API";
import { message } from "antd";

function AllAdmin() {
  const [adminList, setAdminList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [permissionModal, setPermissionModal] = useState(false);
  const getAdminList = async () => {
    try {
      const response = await API_MANAGER.getAllAdmin();
      setAdminList(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const getAllAgent = async () => {
    try {
      const response = await API_MANAGER.getAllAgents();
      setAgentList(response?.data?.data);
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
      title: "ID",
      dataIndex: "_id",
      key: "id",
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
  const agentColumns = [
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
      key: "id",
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
    {
      title: "Permissions",
      dataIndex: "Permissions",
      key: "Permissions",
      render: (item, row) => (
        <Button
          style={{ textTransform: "capitalize" }}
          onClick={() => {
            setSelectedItem(row);
            setPermissionModal(!permissionModal);
          }}
        >
          Grant Permission
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getAdminList();
    getAllAgent();
  }, []);
  return (
    <div>
      <Modal
        title="Grant Permissions"
        open={permissionModal}
        // onOk={handleOk}
        centered
        footer={false}
        onCancel={() => {
          setPermissionModal(false);
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
          x: "calc(768px)",
        }}
      />
      <Row className="allAdminTitle" style={{ marginTop: "24px" }}>
        All Agent
      </Row>
      <Table
        columns={agentColumns}
        dataSource={agentList}
        pagination={false}
        className="table"
        rowKey={"id"}
        style={{ marginTop: "24px" }}
        scroll={{
          // y: "calc(100vh - 400px)",
          x: "calc(768px)",
        }}
      />
    </div>
  );
}

export default AllAdmin;
