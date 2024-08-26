import React, { useEffect, useState } from "react";
import { DatePicker, Row, Table, message, Col } from "antd";
import API_MANAGER from "../../API";
import moment from "moment";
import CustomPagination from "./CustomPagination";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function ReportByStatus({ status }) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(moment().subtract(4, "days"));
  const [endDate, setEndDate] = useState(moment().add(4, "days"));
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      const params = {
        page: page,
        limit: 20,
        FROM_DATE: startDate,
        TO_DATE: endDate,
        req_type: status,
      };
      setLoading(true);
      const response = await API_MANAGER.getWithdrawalReport(params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getData();
    }
  }, [page, startDate, endDate]);
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
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      render: (item, row) => <span>{row?.User_id?.Phone}</span>,
    },
    {
      title: "User",
      dataIndex: "User",
      key: "User",
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
      title: "Type",
      dataIndex: "Withdraw_type",
      key: "Withdraw_type",
    },
    {
      title: "UPI",
      dataIndex: "upi_id",
      key: "upi_id",
      render: (item, row) => <span>{row?.User_id?.upi_id}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => <span> {item ? item : "Proccessing"}</span>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{moment(item).format("LLL")}</span>,
    },
    {
      title: "Action By",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item, row) => (
        <span>{row?.action_by ? row?.action_by?.Name : "N/A"}</span>
      ),
    },
  ];
  const handleExport = async () => {
    try {
      const params = {
        page: 1,
        limit: 10000000,
        FROM_DATE: startDate,
        TO_DATE: endDate,
        req_type: status,
      };
      setLoading(true);
      const response = await API_MANAGER.getWithdrawalReport(params);

      if (status === "WITHDRAW") {
        let table1 = [
          {
            A: "Id",
            B: "UserName",
            C: "PhoneNumber",
            D: "Withdrawal Amount",
            E: "Status",
            F: "Upi Id",
            G: "Action by",
          },
        ];

        response?.data?.data?.result.forEach((row) => {
          const userDetails = row;
          console.log("exldata", userDetails);
          table1.push({
            A: userDetails._id,
            B: userDetails.User_id ? userDetails.User_id.Name : "",
            C: userDetails.User_id ? userDetails.User_id.Phone : "",
            D: userDetails.amount ? userDetails.amount : "",
            E: userDetails.status ? userDetails.status : "",
            F: userDetails.User_id.upi_id,
            G: userDetails.action_by ? userDetails.action_by.Name : "N/A",
          });
        });

        //table1 = [{A:"User Details"}].concat(table1);
        //const finalData = [...table1];
        //console.log(finalData);
        /* convert state to workbook */
        const ws = XLSX.utils.json_to_sheet(table1, {
          skipHeader: true,
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "WithdrawalReport.xlsx");
      } else if (status === "DEPOSIT") {
        let table1 = [
          {
            A: "Id",
            B: "User",
            C: "Phone",
            D: "Amount",
            E: "Status",
            F: "Action By",
            G: "Date",
            H: "Remark",
          },
        ];

        response?.data?.data?.result?.forEach((row) => {
          const userDetails = row;
          console.log("exldata", userDetails);
          table1.push({
            A: userDetails._id,
            B: userDetails.User_id ? userDetails.User_id.Name : "",
            C: userDetails.User_id ? userDetails.User_id.Phone : "",
            D: userDetails.amount ? userDetails.amount : "",
            E: userDetails.status ? userDetails.status : "",
            F: userDetails?.action_by?.Name ? userDetails?.action_by?.Name : "",
            G: userDetails?.createdAt
              ? moment(userDetails?.createdAt).format("LLL")
              : "",
            H: userDetails?.txn_msg,
          });
        });

        //table1 = [{A:"User Details"}].concat(table1);
        //const finalData = [...table1];
        //console.log(finalData);
        /* convert state to workbook */
        const ws = XLSX.utils.json_to_sheet(table1, {
          skipHeader: true,
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "DepositReport.xlsx");
      } else if (status === "BONUS") {
        let table1 = [
          {
            A: "Id",
            B: "User",
            C: "Phone",
            D: "Amount",
            E: "Status",
            F: "Action By",
            G: "Date",
            H: "Remark",
          },
        ];

        response?.data?.data?.result?.forEach((row) => {
          const userDetails = row;
          console.log("exldata", userDetails);
          table1.push({
            A: userDetails._id,
            B: userDetails.User_id ? userDetails.User_id.Name : "",
            C: userDetails.User_id ? userDetails.User_id.Phone : "",
            D: userDetails.amount ? userDetails.amount : "",
            E: userDetails.status ? userDetails.status : "",
            F: userDetails?.action_by?.Name ? userDetails?.action_by?.Name : "",
            G: userDetails?.createdAt
              ? moment(userDetails?.createdAt).format("LLL")
              : "",
            H: userDetails?.txn_msg,
          });
        });

        //table1 = [{A:"User Details"}].concat(table1);
        //const finalData = [...table1];
        //console.log(finalData);
        /* convert state to workbook */
        const ws = XLSX.utils.json_to_sheet(table1, {
          skipHeader: true,
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "BonusReport.xlsx");
      } else if (status === "PENALTY") {
        let table1 = [
          {
            A: "Id",
            B: "User",
            C: "Phone",
            D: "Amount",
            E: "Status",
            F: "Action By",
            G: "Date",
            H: "Remark",
          },
        ];

        response?.data?.data?.result?.forEach((row) => {
          const userDetails = row;
          console.log("exldata", userDetails);
          table1.push({
            A: userDetails._id,
            B: userDetails.User_id ? userDetails.User_id.Name : "",
            C: userDetails.User_id ? userDetails.User_id.Phone : "",
            D: userDetails.amount ? userDetails.amount : "",
            E: userDetails.status ? userDetails.status : "",
            F: userDetails?.action_by?.Name ? userDetails?.action_by?.Name : "",
            G: userDetails?.createdAt
              ? moment(userDetails?.createdAt).format("LLL")
              : "",
            H: userDetails?.txn_msg,
          });
        });

        //table1 = [{A:"User Details"}].concat(table1);
        //const finalData = [...table1];
        //console.log(finalData);
        /* convert state to workbook */
        const ws = XLSX.utils.json_to_sheet(table1, {
          skipHeader: true,
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "Penaltyreport.xlsx");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div>
      <Row justify={"space-between"} gutter={[20, 20]}>
        <Col>
          <Row gutter={[8, 8]}>
            <Col>
              <DatePicker
                onChange={(e) => setStartDate(e)}
                placeholder="Start Date"
              />
            </Col>
            <Col>
              <DatePicker
                onChange={(e) => setEndDate(e)}
                placeholder="End Date"
              />
            </Col>
          </Row>
        </Col>
        {/* {(status === "DEPOSIT" || status === "WITHDRAW") && ( */}
        <Col>
          <button onClick={() => handleExport()} className="primary_button">
            Download
          </button>
        </Col>
        {/* )} */}
      </Row>
      <div>
        <Table
          columns={columns}
          dataSource={data?.result ? data?.result : []}
          pagination={false}
          className="table"
          loading={loading}
          rowKey={"id"}
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
          itemPerPage={20}
        />
      </div>
    </div>
  );
}

export default ReportByStatus;
