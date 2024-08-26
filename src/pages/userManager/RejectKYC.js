import { Image, Table, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/common/CustomPagination";
import API_MANAGER from "../../API";
import { useNavigate } from "react-router-dom";
import CustomPaginationWithPageSize from "../../components/common/CustomPaginationWithPageSize";

function RejectKYC() {
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
  });
  const [data, setData] = useState();

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const params = {
        ...page,
        status: "reject",
      };
      const response = await API_MANAGER.getPendingKYC(params);
      setData(response?.data?.data);
    } catch (error) {
      message.error("Something went wrong!");
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
            {(page?.page - 1) * page?.limit + (index + 1)}
          </span>
        );
      },
    },
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
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
      render: (item) => (
        <span>{moment(item).format("DD/MM/YYYY HH:MM a")}</span>
      ),
    },
  ];

  return (
    <div>
      <p className="pageHeading">Reject KYC</p>

      <Table
        columns={columns}
        dataSource={data?.result ? data?.result : []}
        pagination={false}
        className="table"
        rowKey={"id"}
        style={{ marginTop: "24px" }}
        scroll={{
          //   y: "calc(100vh - 400px)",
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

export default RejectKYC;
