import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Dropdown,
  message,
  Form,
  Select,
  Input,
  Button,
} from "antd";
import infoIcon from "../../Assets/infoIcon.svg";
import API_MANAGER from "../../API";
import CustomPagination from "../../components/common/CustomPagination";
import { useNavigate } from "react-router-dom";
import CustomPaginationWithPageSize from "../../components/common/CustomPaginationWithPageSize";

function AllUsers() {
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
  });
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchByStatus, setSearchByStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      let params = {
        ...page,
      };
      if (search && searchType) {
        params["search"] = search;
        params["searchType"] = searchType;
      }
      if (searchByStatus) {
        params["searchStatus"] = searchByStatus;
      }
      setLoading(true);
      const response = await API_MANAGER.getAllUsers(params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error("Something went wrong!");
    }
  };
  const blockUnblockPlayer = async (player) => {
    const confirmBox = window.confirm(
      `are you sure that you want to block ${player?.Name}`
    );
    if (confirmBox === true) {
      const userType = player?.user_type == "Block" ? "User" : "Block";

      try {
        const response = await API_MANAGER.blockUnblockPlayer(player?._id, {
          _id: player?._id,
          user_type: userType,
        });
        message.success("Updated successfully!");
        getData();
      } catch (error) {
        message.error("Something went wrong!");
      }
    }
  };
  const deletePlayer = async (player) => {
    const confirmBox = window.confirm(`are you sure delete ${player?.Name}`);
    if (confirmBox === true) {
      try {
        const response = await API_MANAGER.deletePlayer(player?._id);
        message.success("User deleted successfully!");
      } catch (error) {
        message.error("Something went wrong!");
      }
    }
  };
  const handleItems = (row) => {
    return [
      {
        key: "1",
        label: (
          <div className="action-dropdown">
            <Row>
              <Col
                className="item"
                span={24}
                onClick={() => navigate(`/user/view/${row?._id}`)}
              >
                <span>View</span>
              </Col>
            </Row>

            <Row>
              <Col
                onClick={() => {
                  blockUnblockPlayer(row);
                }}
                className="item"
                span={24}
              >
                <span>{row?.user_type == "Block" ? "Unblock" : "Block"}</span>
              </Col>
            </Row>

            {/* <Row>
              <Col
                className="item"
                span={24}
                // onClick={() => withdrawPass(row?.txn_id)}
              >
                <span>Edit</span>
              </Col>
            </Row> */}

            <Row>
              <Col className="item" span={24} onClick={() => deletePlayer(row)}>
                <span>Delete</span>
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
            {(page?.page - 1) * page?.limit + (index + 1)}
          </span>
        );
      },
    },
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    //   key: "id",
    // },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (item, row) => (
        <span
          className="tableLink"
          onClick={() => navigate(`/user/view/${row?._id}`)}
        >
          {item}
        </span>
      ),
    },

    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },
    {
      title: "Referral Code",
      dataIndex: "referral_code",
      key: "referral_code",
    },
    {
      title: "Balance",
      dataIndex: "Wallet_balance",
      key: "Wallet_balance",
      render: (item, row) => <span>₹{row?.Wallet_balance}</span>,
    },

    {
      title: "MissMatch",
      dataIndex: "MissMatch",
      key: "MissMatch",
      render: (item, row) => (
        <span>
          ₹
          {row?.Wallet_balance -
            (row?.wonAmount +
              row?.totalDeposit +
              row?.referral_earning +
              row?.totalBonus -
              (row?.loseAmount +
                row?.totalWithdrawl +
                row?.referral_wallet +
                row?.withdraw_holdbalance +
                row?.hold_balance +
                row?.totalPenalty))}
        </span>
      ),
    },
    {
      title: "Game hold",
      dataIndex: "hold_balance",
      key: "hold_balance",
    },
    {
      title: "Reffered By",
      dataIndex: "referral",
      key: "referral",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
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

  useEffect(() => {
    getData();
  }, [page]);
  return (
    <div>
      <p className="pageHeading">All Users</p>

      <Form layout="vertical">
        <Row gutter={24} align={"middle"}>
          <Col xs={12} lg={6}>
            <Form.Item label="Search By" name={"searchType"}>
              <Select
                className="selectBox"
                onChange={(e) => setSearchType(e)}
                placeholder="Search By"
              >
                <Select.Option value="Name">Name</Select.Option>
                <Select.Option value="Phone">Phone</Select.Option>
                <Select.Option value="_id">User Id</Select.Option>
                <Select.Option value="referral">Referral By</Select.Option>
                <Select.Option value="referral_code">
                  Referral Code
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Item label="Search " name={"search"}>
              <Input
                placeholder="Search"
                className="inputBox"
                onChange={(e) => setSearch(e?.target?.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Item label="Select Status" name={"status"}>
              <Select
                className="selectBox"
                placeholder="Select Status"
                onChange={(e) => setSearchByStatus(e)}
              >
                <Select.Option value="verified">Verified</Select.Option>
                <Select.Option value="unverified">Unverified</Select.Option>
                <Select.Option value="BLOCK">Blocked</Select.Option>
                <Select.Option value="HOLD_BALANCE">Hold</Select.Option>
              </Select>
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
        dataSource={data?.result ? data?.result : []}
        pagination={false}
        loading={loading}
        className="table"
        rowKey={"id"}
        style={{ marginTop: "24px", borderRadius: "0px" }}
        scroll={{
          // y: "calc(100vh - 400px)",
          x: "calc(767px)",
        }}
      />
      <CustomPaginationWithPageSize
        currentPage={page}
        setCurrentPage={setPage}
        total={data?.totalCount}
      />
    </div>
  );
}

export default AllUsers;
