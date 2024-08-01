import React, { useEffect, useState } from "react";
import API_MANAGER from "../../API";
import { Input, message, Form, Button, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function Notification({ userData }) {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const getData = async () => {
    try {
      const response = await API_MANAGER.getNotification();
      setData(response?.data?.data);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const createNotification = async (value) => {
    try {
      await API_MANAGER.createNotification(value);
      message.success("Notification created successfully!");
      form.resetFields();
      getData();
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const deleteNotification = async (id) => {
    try {
      await API_MANAGER.deleteNotification(id);
      message.success("Notification deleted successfully!");
      getData();
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="notification_container">
      {userData?.user_type === "Admin" ? (
        <>
          <p className="pageHeading">Create Notification</p>
          <Form onFinish={createNotification} form={form}>
            <Row gutter={[20, 20]}>
              <Col>
                <Form.Item name={"message"}>
                  <Input placeholder="Enter message" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button htmlType="submit">Submit</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <p className="pageHeading">Notifications</p>
      )}

      <div style={{ marginTop: "30px" }}>
        {data?.map((item, index) => (
          <div className="notificationItem" key={index}>
            <Row gutter={[20, 20]}>
              <Col span={userData?.user_type === "Admin" ? 22 : 24}>
                {item?.message}
              </Col>
              {userData?.user_type === "Admin" && (
                <Col span={2}>
                  <DeleteOutlined
                    className="cursor-pointer"
                    onClick={() => deleteNotification(item?._id)}
                  />
                </Col>
              )}
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
