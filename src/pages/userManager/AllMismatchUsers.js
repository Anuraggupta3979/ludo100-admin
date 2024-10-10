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
import { useNavigate } from "react-router-dom";
import CustomPaginationWithPageSize from "../../components/common/CustomPaginationWithPageSize";

function AllmismatchUsers() {
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
      setLoading(true);
      const response = await API_MANAGER.getAllMismatchUsers({});
      setData(response?.data?.data);
      // const ssss = response?.data?.data?.result?.filter(
      //   (row) =>
      //     row?.Wallet_balance -
      //       (row?.wonAmount +
      //         row?.totalDeposit +
      //         row?.referral_earning +
      //         row?.totalBonus -
      //         (row?.loseAmount +
      //           row?.totalWithdrawl +
      //           row?.referral_wallet +
      //           row?.withdraw_holdbalance +
      //           row?.hold_balance +
      //           row?.totalPenalty)) !=
      //     0
      // );
      // setData({ result: ssss, totalCount: response?.data?.data?.totalCount });
      // console.log(ssss, "dasdasf");

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
        <>
          <a
            className="tableLink"
            // onClick={() => navigate(`/user/view/${row?._id}`)}
            href={`/user/view/${row?._id}`}
          >
            {item}
          </a>
          <br />
          {row?.Phone}
        </>
      ),
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
      title: "Balance",
      dataIndex: "Wallet_balance",
      key: "Wallet_balance",
      render: (item, row) => <span>₹{row?.Wallet_balance}</span>,
    },
    {
      title: "Game hold",
      dataIndex: "hold_balance",
      key: "hold_balance",
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
      <p className="pageHeading">All Mismatch Users</p>

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
      {/* <CustomPaginationWithPageSize
        currentPage={page}
        setCurrentPage={setPage}
        total={data?.totalCount}
      /> */}
    </div>
  );
}

export default AllmismatchUsers;
