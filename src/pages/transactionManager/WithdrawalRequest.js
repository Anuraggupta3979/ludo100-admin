import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, message } from "antd";
import API_MANAGER from "../../API";
import CustomPagination from "../../components/common/CustomPagination";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function WithdrawalRequest() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await API_MANAGER.getWithdrawRequest({
        Req_type: "WITHDRAW",
        status: "Pending",
        limit: 10,
        page: page,
      });
      setData(response?.data?.data);
      setLoading(false);

      //   baseUrl + `temp/withdraw/all/pending`,
    } catch (error) {
      setLoading(false);
    }
  };

  const withdrawPass = async (id) => {
    // const confirm = window.confirm(
    //   "Are you sure, you want to update to success this payout?"
    // );
    // if (confirm) {
    try {
      const response = await API_MANAGER.withdrawUpdate(
        {
          status: "INITIATE",
        },
        id
      );
      message.success("Updated Successfully!");
      getData();
    } catch (error) {}
    // }
  };
  const withdrawPas2 = async (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to update to success this payout?"
    );
    if (confirm) {
      try {
        const response = await API_MANAGER.withdrawUpdate(
          {
            status: "SUCCESS",
          },
          id
        );
        message.success("Updated Successfully!");
        getData();
      } catch (error) {}
    }
  };

  const withdrawFail = async (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to update to failed this payout?"
    );
    if (confirm) {
      try {
        const response = await API_MANAGER.withdrawUpdate(
          {
            status: "FAILED",
          },
          id
        );
        message.success("Updated Successfully!");

        getData();
      } catch (error) {}
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

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
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      render: (item, row) => <span>{row?.user?.Phone}</span>,
    },
    {
      title: "User",
      dataIndex: "User",
      key: "user",
      render: (item, row) => (
        <span
          className="tableLink"
          onClick={() => navigate(`/user/view/${row?.user?._id}`)}
        >
          {row?.user ? row?.user?.Name : ""}
        </span>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "UPI ID",
      dataIndex: "upiID",
      key: "upiID",
      render: (item, row) => <span>{row?.user?.upi_id}</span>,
    },
    {
      title: "Account No.",
      dataIndex: "account_number",
      key: "account_number",
      render: (item, row) => <span>{row?.user?.account_number}</span>,
    },
    {
      title: "Bank",
      dataIndex: "bank_name",
      key: "bank_name",
      render: (item, row) => <span>{row?.user?.bank_name}</span>,
    },
    {
      title: "IFSC",
      dataIndex: "ifsc_code",
      key: "ifsc_code",
      render: (item, row) => <span>{row?.user?.ifsc_code}</span>,
    },
    {
      title: "Account Holder",
      dataIndex: "holder_name",
      key: "holder_name",
      render: (item, row) => <span>{row?.user?.holder_name}</span>,
    },
    {
      title: "Withdraw Type",
      dataIndex: "type",
      key: "type    ",
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
        <Row gutter={[12, 12]} align={"middle"}>
          {row?.status !== "SUCCESS" &&
            row?.status !== "FAILED" &&
            row?.status !== "reject" && (
              <Col className="item" span={24}>
                <Button
                  onClick={() => withdrawPas2(row?.txn_id)}
                  className="secondary_button"
                >
                  Approve
                </Button>
              </Col>
            )}
          {row?.status !== "SUCCESS" &&
            row?.status !== "FAILED" &&
            row?.status !== "reject" && (
              <Col className="item" span={24}>
                <Button
                  onClick={() => withdrawFail(row?.txn_id)}
                  className="secondary_button"
                >
                  Reject
                </Button>
              </Col>
            )}
          <Col className="item" span={24}>
            <Button
              onClick={() => withdrawPass(row?.txn_id)}
              className="secondary_button"
            >
              Check
            </Button>
          </Col>
        </Row>
      ),
    },
  ];
  return (
    <div className="deposit_history">
      <Row className="pageHeading mb-20">Withdrawal Request</Row>

      <Table
        columns={columns}
        dataSource={data?.result ? data?.result : []}
        pagination={false}
        className="table"
        rowKey={"id"}
        loading={loading}
        style={{ marginTop: "24px" }}
        scroll={{
          // y: "calc(100vh - 400px)",
          x: "calc(768px)",
        }}
      />
      <CustomPagination
        currentPage={page}
        setCurrentPage={setPage}
        total={data?.totalCount}
        itemPerPage={10}
      />
    </div>
  );
}

export default WithdrawalRequest;
