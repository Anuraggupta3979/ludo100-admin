import { Button, Col, Form, Input, Row, message } from "antd";
import React, { useState } from "react";

function CheckChallange() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const checkRoomCode = async (values) => {
    try {
      setData(null);
      setLoading(true);
      const url = `https://ludo-king-room-code-api.p.rapidapi.com/result?code=${values?.room_code}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "127c9351d5msh54b0b948e7da6ebp121e59jsn9163e2425ed7",
          "X-RapidAPI-Host": "ludo-king-room-code-api.p.rapidapi.com",
        },
      };
      let checkCodeRes;
      checkCodeRes = await fetch(url, options);
      let result = await checkCodeRes.text();
      result = JSON.parse(result);
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong.");
    }
  };
  return (
    <div>
      <Form requiredMark={false} layout="vertical" onFinish={checkRoomCode}>
        <Row>
          <Col span={24}>
            <Form.Item
              name={"room_code"}
              label="Room Code"
              rules={[
                {
                  required: true,
                  message: "Please enter room code.",
                },
              ]}
            >
              <Input placeholder="Enter room code" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button loading={loading} htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {data && (
        <div className="addNewAdminContainer mt-32">
          <p className="pageHeading">Game Result</p>

          <Row gutter={24}>
            <Col span={24}>
              <p>Game Status: {data?.estatus}</p>
            </Col>
            <Col span={12}>
              <p>
                Creator Name:{" "}
                {data?.creator_id === data?.player1_id
                  ? data?.player1_name
                  : data?.player2_name}
              </p>
            </Col>
            <Col span={12}>
              <p>
                Acceptor Name:{" "}
                {data?.creator_id === data?.player1_id
                  ? data?.player2_name
                  : data?.player1_name}
              </p>
            </Col>
            <Col span={12}>
              <p>
                Creator Status:{" "}
                {data?.creator_id === data?.player1_id
                  ? data?.player1_status
                  : data?.player2_status}
              </p>
            </Col>
            <Col span={12}>
              <p>
                Acceptor Status:{" "}
                {data?.creator_id === data?.player1_id
                  ? data?.player2_status
                  : data?.player1_status}
              </p>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default CheckChallange;
