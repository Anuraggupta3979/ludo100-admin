import { Image, Row, Col, Dropdown, Table, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import infoIcon from "../../../Assets/infoIcon.svg";
import CustomPagination from "../CustomPagination";
import API_MANAGER from "../../../API";
import { useNavigate } from "react-router-dom";

function UserKYC({ id }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await API_MANAGER.getUserKyc(id);
      //   setData(response?.data?.data);
      setData([response?.data?.data]);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const approveKYC = async (id, param) => {
    try {
      const response = await API_MANAGER.approveKYC(id, param);
      message.success("Updated successfully!");
      getData();
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const handleItems = (row) => {
    return [
      {
        key: "1",
        label: (
          <div className="action-dropdown">
            {row?.verified !== "verified" && (
              <Row>
                <Col
                  className="item"
                  span={24}
                  onClick={() =>
                    approveKYC(row?.User?._id, {
                      verified: "verified",
                    })
                  }
                >
                  <span>Approve</span>
                </Col>
              </Row>
            )}

            <Row>
              <Col
                onClick={() =>
                  approveKYC(row?.User?._id, {
                    verified: "Reject",
                  })
                }
                className="item"
                span={24}
              >
                <span>Reject</span>
              </Col>
            </Row>
          </div>
        ),
      },
    ];
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "si",
      width: "80px",
      render: (_, row, index) => {
        return (
          <span className="cursor-pointer">
            {(page - 1) * 10 + (index + 1)}
          </span>
        );
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Profile name",
      dataIndex: "Name",
      key: "Name",
      render: (item, row) => (
        <span
          className="tableLink"
          onClick={() => navigate(`/user/view/${row?.User?._id}`)}
        >
          {row?.User ? row?.User?.Name : ""}
        </span>
      ),
    },
    {
      title: "Doc name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      render: (item, row) => <span>{row?.User?.Phone}</span>,
    },

    {
      title: "Aadhar No.",
      dataIndex: "Number",
      key: "Number",
    },
    {
      title: "DOB",
      dataIndex: "DOB",
      key: "DOB",
    },
    {
      title: "Document-Front",
      dataIndex: "front",
      key: "front",
      render: (item, row) => (
        <>
          <Image
            className="tableImg"
            src={`https://ludo1002.s3.ap-south-1.amazonaws.com/${item}`}
          />
        </>
      ),
    },
    {
      title: "Document-Back",
      dataIndex: "back",
      key: "back",
      render: (item, row) => (
        <>
          <Image
            className="tableImg"
            src={`https://ludo1002.s3.ap-south-1.amazonaws.com/${item}`}
          />
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "verified",
      key: "verified",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{moment(item).format("LLL")}</span>,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (item, row) => (
        <Row align={"middle"}>
          <Dropdown
            placement="bottom"
            overlayClassName="action-dropdown"
            menu={{
              items: handleItems(row),
            }}
            trigger={"click"}
          >
            <img
              onClick={(e) => {
                e.preventDefault();
                // setRowData(row);
              }}
              className="cursor_pointer"
              src={infoIcon}
              alt="edit"
            />
          </Dropdown>
        </Row>
      ),
    },
  ];

  return (
    <div>
      <p className="pageHeading">Pending KYC</p>

      <Table
        columns={columns}
        dataSource={data ? data : []}
        pagination={false}
        className="table"
        rowKey={"id"}
        style={{ marginTop: "24px" }}
        scroll={{
          //   y: "calc(100vh - 400px)",
          x: "calc(768px)",
        }}
      />
    </div>
  );
}

export default UserKYC;
