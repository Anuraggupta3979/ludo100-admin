import React, { useEffect, useState } from "react";
import API_MANAGER from "../../API";
import { Button, Col, Radio, Row, message } from "antd";
import moment from "moment";
import CustomPagination from "../../components/common/CustomPagination";

function Contacts() {
  const [data, setData] = useState();
  const [isRead, setIsRead] = useState(false);
  const [page, setPage] = useState(1);
  const getData = async () => {
    try {
      const response = await API_MANAGER.getContacts({
        isRead,
        limit: 1000,
        // page: page,
      });
      setData(response?.data?.data);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const handleRead = async (id) => {
    try {
      const response = await API_MANAGER.updateContact({ isRead: !isRead }, id);
      message.success("Contact updated successfully!");
      getData();
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    setPage(1);
    getData();
  }, [isRead]);
  return (
    <div className="contact_container">
      <div className="radioButtons">
        <Radio.Group
          defaultValue={isRead}
          onChange={(e) => {
            setIsRead(e?.target?.value);
          }}
        >
          <Radio.Button value={false}>Unread</Radio.Button>
          <Radio.Button value={true}>Read</Radio.Button>
        </Radio.Group>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          {data?.map((item, index) => (
            <div className="contactItem" key={index}>
              <Row gutter={[20, 8]}>
                <Col xs={24} md={12} lg={8}>
                  <p>Name:</p> {item?.name}
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <p>Number:</p> {item?.number}
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <p> Email:</p> {item?.email}
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <p>Time:</p>
                  {moment(item?.createdAt).format("LLL")}
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Button
                    className="secondary_button mt-16"
                    style={{ marginBottom: "0px !important" }}
                    onClick={() => handleRead(item?._id)}
                  >
                    {isRead ? "Unread" : "Read"}
                  </Button>
                </Col>
                <Col xs={24}>
                  <p>Message:</p>
                  {item?.message}
                </Col>
              </Row>
            </div>
          ))}
        </div>
        {/* <CustomPagination
          currentPage={page}
          setCurrentPage={setPage}
          total={data?.totalCount}
          itemPerPage={20}
        /> */}
      </div>
    </div>
  );
}

export default Contacts;
