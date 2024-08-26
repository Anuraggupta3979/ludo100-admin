import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Form,
  Select,
  Input,
  message,
  Image,
} from "antd";
import API_MANAGER from "../../API";
import moment from "moment";
import CustomPagination from "../../components/common/CustomPagination";
import { useNavigate } from "react-router-dom";
import CustomPaginationWithPageSize from "../../components/common/CustomPaginationWithPageSize";
function DepositHistory() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [search, setSearch] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);
  const [page, setPage] = useState({ page: 1, limit: 20 });
  const [loading, setLoading] = useState(false);
  const Profile = async () => {
    try {
      setLoading(true);
      let params = {
        ...page,
        search: search,
      };
      if (searchStatus) {
        params = { ...params, ["searchStatus"]: searchStatus };
      }
      const response = await API_MANAGER.getDepositHistory(params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong!");
    }
  };
  const checkupigatewaypay = async (order_id, order_token, pay_date) => {
    try {
      const response = await API_MANAGER.depositUpi({ order_id, order_token });
      Profile();
    } catch (error) {}
  };

  const checkutrgatewaypay = async (order_id, order_token, status) => {
    try {
      const response = await API_MANAGER.depositUTR({
        order_id,
        order_token,
        status,
      });
      Profile();
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const withdrowFail = async (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to update to failed this deposit?"
    );
    if (confirm) {
      try {
        const response = await API_MANAGER.withDrawFail();
        //   baseUrl + `userdipositupdate/${id}`,
        // {
        //   status: "FAILED",
        // },
        // profle();
        // alert("deposit successfully reject");
      } catch (error) {}
    }
  };
  const checkkvmgatewaypay = async (order_id, order_token, payment_gatway) => {
    try {
      await API_MANAGER.checkkvmpaydeposit({
        order_id,
        order_token,
      });
      Profile();
    } catch (error) {}
  };
  const checkDeposit = async (
    payment_gatway,
    order_id,
    order_token,
    pay_date,
    status
  ) => {
    //alert(payment_gatway);
    if (payment_gatway == "utr") {
      checkutrgatewaypay(order_id, order_token, status);
    } else if (payment_gatway == "upigateway") {
      checkupigatewaypay(order_id, order_token, pay_date);
    } else if (payment_gatway === "kvmgateway") {
      checkkvmgatewaypay(order_id, order_token, pay_date);
    } else if (!payment_gatway) {
      withdrowFail(order_id);
    } else {
      checkupigatewaypay(order_id, order_token, payment_gatway);
    }
  };

  useEffect(() => {
    Profile();
  }, [page, search, searchStatus]);
  const newdateFormat = (e) => {
    let today = new Date(e);
    let dd = String(today?.getDate()).padStart(2, "0");
    let mm = String(today?.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today?.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    return today;
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
      title: "R_orderId",
      dataIndex: "order_token",
      key: "order_token",
    },
    {
      title: "UTR No.",
      dataIndex: "UTR_number",
      key: "UTR_number",
    },
    {
      title: "Screenshot",
      dataIndex: "txn_screenshot",
      key: "txn_screenshot",
      render: (item, row) => (
        <>
          {item && (
            <Image
              className="tableImg"
              src={`https://ludo1002.s3.ap-south-1.amazonaws.com/${item}`}
            />
          )}
        </>
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
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (item, row) => (
        <span>
          {
            //&& (parseInt(gameCreatedAt) + 7200000) < currentTime
            row?.UTR_number &&
            row?.txn_screenshot &&
            row?.status !== "PAID" &&
            row?.status !== "FAILED" ? (
              <Row gutter={20} align={"middle"}>
                <Col>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      checkDeposit(
                        "utr",
                        row?.order_id,
                        row?.order_token,
                        null,
                        "success"
                      )
                    }
                  >
                    Approve
                  </button>
                </Col>
                <Col>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      checkDeposit(
                        "utr",
                        row?.order_id,
                        row?.order_token,
                        null,
                        "failed"
                      )
                    }
                  >
                    Reject
                  </button>
                </Col>
              </Row>
            ) : row?.status !== "PAID" && row?.status !== "FAILED" ? (
              <button
                className="btn btn-danger"
                onClick={() =>
                  checkDeposit(
                    row?.payment_gatway,
                    row?.order_id,
                    row?.order_token,
                    newdateFormat(data?.createdAt)
                  )
                }
              >
                Check {data?.payment_gatway}
              </button>
            ) : (
              "Checked All"
            )
          }
        </span>
      ),
    },
  ];
  return (
    <div className="deposit_history">
      <Row className="pageHeading mb-20">Deposit History</Row>
      <Form layout="vertical">
        <Row gutter={24} align={"middle"}>
          <Col xs={12} lg={6}>
            <Form.Item label="Search " name={"search"}>
              <Input
                placeholder="Search"
                // className="inputBox"
                onChange={(e) => setSearch(e?.target?.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Item label="Select Status" name={"status"}>
              <Select
                // className="selectBox"
                onChange={(e) => setSearchStatus(e)}
                placeholder="Select Status"
              >
                <Select.Option value={"PAID"}>Paid</Select.Option>
                <Select.Option value={"Pending"}>Pending</Select.Option>
                <Select.Option value={"pending"}>pending</Select.Option>
                <Select.Option value={"FAILED"}>Failed</Select.Option>
              </Select>
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
          // y: "calc(100vh - 400px)",
          x: "calc(768px)",
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

export default DepositHistory;
