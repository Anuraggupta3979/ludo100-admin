import { Button, Col, Form, Input, Row, message } from "antd";
import React, { useState } from "react";
import API_MANAGER from "../../API";
function CheckChallange() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const checkRoomCode = async (values) => {
    try {
      setData(null);
      setLoading(true);

      // checkCodeRes = await fetch(url, options);
      const response = await API_MANAGER.checkRoomCode({
        roomCode: values?.room_code,
      });
      // let result = await checkCodeRes.text();
      // result = JSON.parse(result);
      setData(response?.data?.data?.result);
      setLoading(false);
      console.log(response?.data?.data?.result);
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
              <p>Game Status: {data?.status}</p>
            </Col>
            <Col span={12}>
              {/* <p>
                Creator Name:{" "}
                {data?.creator_id === data?.player1_id
                  ? data?.player1_name
                  : data?.player2_name}
              </p> */}
              <p>Creator Name: {data?.ownername}</p>
            </Col>
            <Col span={12}>
              <p>
                Acceptor Name:{" "}
                {/* {data?.creator_id === data?.player1_id
                  ? data?.player2_name
                  : data?.player1_name} */}
                {data?.player1name}
              </p>
            </Col>
            <Col span={12}>
              <p>
                Creator Status:{" "}
                {/* {data?.creator_id === data?.player1_id
                  ? data?.player1_status
                  : data?.player2_status} */}
                {data?.ownerstatus
                  ? data?.ownerstatus
                  : data?.result
                  ? data?.result
                  : "Not Foundssss"}
              </p>
            </Col>
            <Col span={12}>
              <p>
                Acceptor Status:{" "}
                {/* {data?.creator_id === data?.player1_id
                  ? data?.player2_status
                  : data?.player1_status} */}
                {data?.player1status ? data?.player1status : "Not Found"}
              </p>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default CheckChallange;
