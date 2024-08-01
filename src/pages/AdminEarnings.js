import React, { useEffect, useState } from "react";
import API_MANAGER from "../API";
import { DatePicker, Row, Table, message, Col } from "antd";
import moment from "moment";
import CustomPagination from "../components/common/CustomPagination";

function AdminEarnings() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      let params = {
        page: page,
        limit: 20,
      };
      if (startDate && endDate) {
        params["FROM_DATE"] = startDate;
        params["TO_DATE"] = endDate;
      }
      setLoading(true);
      const response = await API_MANAGER.getAdminEarning(params);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const getTotalEarning = async () => {
    try {
      let params = {};
      if (startDate && endDate) {
        params = {
          FROM_DATE: startDate,
          TO_DATE: endDate,
        };
      }

      const response = await API_MANAGER.getTotalAdminEarning(params);
      setTotalEarning(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getData();
    getTotalEarning();
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
      title: "Earn From",
      dataIndex: "Earned_Form",
      key: "Earned_Form",
    },
    {
      title: "Amount",
      dataIndex: "Ammount",
      key: "Ammount",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{moment(item).format("LLL")}</span>,
    },
  ];
  return (
    <div>
      <p className="pageHeading">
        TOTAL EARING : {totalEarning?.[0]?.totalAmount}
      </p>
      <Row gutter={[8, 8]}>
        <Col>
          <DatePicker
            placeholder="Start Date"
            onChange={(e) => setStartDate(e)}
          />
        </Col>
        <Col>
          <DatePicker placeholder="End Date" onChange={(e) => setEndDate(e)} />
        </Col>
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
    </div>
  );
}

export default AdminEarnings;
