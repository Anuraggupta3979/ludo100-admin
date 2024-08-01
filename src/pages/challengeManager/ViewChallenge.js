import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_MANAGER from "../../API";
import { Row, message, Button, Col, Input } from "antd";
import moment from "moment";
function ViewChallenge() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [bonus, setBonus] = useState(25);
  const [roomCodeData, setRoomCodeData] = useState(null);
  const checkRoomCode = async (Room_code) => {
    try {
      const response = await API_MANAGER.checkRoomCode({
        roomCode: Room_code,
      });
      setRoomCodeData(response?.data?.data);
    } catch (error) {}
  };
  function winnAmount(gameAmount) {
    let profit = null;
    if (gameAmount >= 50 && gameAmount <= 250) profit = (gameAmount * 5) / 100;
    else if (gameAmount > 250 && gameAmount <= 500)
      profit = (gameAmount * 5) / 100;
    else if (gameAmount > 500) profit = (gameAmount * 5) / 100;
    return gameAmount - profit;
  }
  const getData = async () => {
    try {
      const response = await API_MANAGER.getChallengeById(id);
      setData(response?.data?.data);
      if (
        response?.data?.data?.Status === "conflict" &&
        response?.data?.data?.Room_code
      )
        await checkRoomCode(response?.data?.data?.Room_code);
    } catch (error) {
      // message.error("Something went wrong!");
    }
  };
  const cancelChallenge = async () => {
    const confirm = window.confirm("are you sure to cancel");

    if (confirm) {
      try {
        const response = await API_MANAGER.cancelChallenge(id);
        getData();
      } catch (error) {
        message.error("Something went wrong!");
      }
    }
  };
  const updateByAdmin = async (userId) => {
    const confirm = window.confirm("are you sure to update");
    if (confirm) {
      try {
        const response = await API_MANAGER.updateChallengeAdmin(
          {
            winner: userId,
          },
          id
        );
        getData();
      } catch (error) {
        message.error("Something went wrong!");
      }
    }
  };
  const updatePenalty = async (userId) => {
    const confirm = window.confirm(
      "Are you sure, you want to add penalty to this user?"
    );
    if (confirm) {
      try {
        const response = await API_MANAGER.addPanelty(
          { bonus: JSON.parse(bonus) },
          userId
        );
        if (response?.data?.data?.status === 0) {
          alert("User wallet balance already low.");
        } else {
          alert("Penalty successfully added.");
        }
        getData();
      } catch (error) {
        message.error("Something went wrong!");
      }
    }
  };
  useEffect(() => {
    if (id) getData();
  }, [id]);
  return (
    <div className="viewGameContainer">
      <div className="boxContainer">
        <Row>Match Details</Row>
        {data?.Status != "cancelled" &&
          data?.Status != "completed" &&
          data?.Status != "pending" && (
            <Row justify={"end"}>
              <Col>
                <Button onClick={() => cancelChallenge()}>Cancel</Button>
              </Col>
            </Row>
          )}

        <Row>
          <p>Check participants data, and announced result.</p>
        </Row>
        <Row align={"middle"} gutter={20}>
          <Col xs={24} md={8} lg={6}>
            <p>Match Fee: {data?.Game_Ammount}</p>
            {/* <p>{</p> */}
          </Col>
          <Col xs={24} md={8} lg={6}>
            <p>Prize: {data?.Game_Ammount + winnAmount(data?.Game_Ammount)}</p>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <p>Type: {data?.Game_Ammount + winnAmount(data?.Game_Ammount)}</p>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <p>Status: {data?.Status}</p>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <p>Room Code: {data?.Room_code}</p>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <p>
              Game Updated By:{" "}
              <span style={{ color: "#000", fontWeight: "bold" }}>
                {data?.action_by && data?.action_by?.Name} -{" "}
                {data?.action_by && data?.action_by?.Phone}
              </span>
              <span style={{ color: "#000", fontWeight: "bold" }}>
                {data?.actionby_Date &&
                  `(${moment(data?.actionby_Date).format("LLL")})`}
              </span>
            </p>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={12}>
            <div className="boxContainer">
              <h3>Creator</h3>
              <div>
                <p>
                  User Name:{" "}
                  <span
                    className="tableLink"
                    onClick={() => {
                      if (data?.Created_by?._id) {
                        navigate(`/user/view/${data?.Created_by?._id}`);
                      }
                    }}
                  >
                    {data?.Created_by && data?.Created_by?.Name}
                  </span>
                </p>
              </div>
              <div>
                <p className="ludoKingName">
                  Ludo King Name:{" "}
                  <span className="">
                    {roomCodeData?.creator_id === roomCodeData?.player1_id
                      ? roomCodeData?.player1_name
                      : roomCodeData?.player2_name}{" "}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Hold Balance: <span>{data?.Created_by?.hold_balance}</span>
                </p>
              </div>
              <div>
                <p>
                  Created Time:{" "}
                  <span>{moment(data?.createdAt).format("LLL")}</span>
                </p>
              </div>
              <div>
                <p>
                  Participant Status: <span>{data?.Creator_Status}</span>
                </p>
              </div>
              <div>
                <p className="ludoKingName">
                  Ludo King Status:{" "}
                  <span>
                    {roomCodeData?.creator_id === roomCodeData?.player1_id &&
                    roomCodeData?.player1_status
                      ? roomCodeData?.player1_status
                      : "Not Found"}
                  </span>
                </p>
              </div>
              {data?.Creator_Status_Updated_at && (
                <div>
                  <p>
                    Status Updated At:{" "}
                    <span>
                      {moment(data?.Creator_Status_Updated_at).format("LLL")}
                    </span>
                  </p>
                </div>
              )}
              {data?.Creator_Status_Reason && (
                <div>
                  <p>
                    Cancel Reason: <span>{data?.Creator_Status_Reason}</span>
                  </p>
                </div>
              )}
              {data?.Creator_Screenshot && (
                <div>
                  <p>Proof:</p>
                  <img
                    src={`https://ludo1002.s3.ap-south-1.amazonaws.com/${data?.Creator_Screenshot}`}
                    style={{
                      width: "100%",
                      maxHeight: "1000px",
                      height: "100%",
                    }}
                    alt="not loaded"
                  />
                </div>
              )}
              {(data?.Status == "pending" || data?.Status == "conflict") && (
                <div className="form-group">
                  <Row align={"middle"} gutter={20}>
                    <Col xs={12} lg={6}>
                      <Button
                        className="w-100"
                        onClick={() => {
                          updateByAdmin(data?.Created_by?._id);
                        }}
                      >
                        Win
                      </Button>
                    </Col>
                    <Col xs={12} lg={6}>
                      <Button
                        className="w-100"
                        onClick={() => {
                          updateByAdmin(data?.Accepetd_By?._id);
                        }}
                      >
                        Lose
                      </Button>
                    </Col>
                  </Row>
                  <div>
                    <p>Add Penalty</p>
                    <Row gutter={16}>
                      <Col xs={12}>
                        <Input
                          value={bonus}
                          type="number"
                          onChange={(e) => setBonus(e?.target?.value)}
                          placeholder="Penalty amount"
                        />
                      </Col>
                      <Col>
                        <Button
                          onClick={() => updatePenalty(data?.Created_by?._id)}
                        >
                          Add Penalty
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="boxContainer">
              <h3>Acceptor</h3>
              <div>
                <p>
                  User Name:{" "}
                  <span
                    className="tableLink"
                    onClick={() => {
                      if (data?.Accepetd_By?._id) {
                        navigate(`/user/view/${data?.Accepetd_By?._id}`);
                      }
                    }}
                  >
                    {data?.Accepetd_By && data?.Accepetd_By?.Name}
                  </span>
                </p>
              </div>
              <div>
                <p className="ludoKingName">
                  Ludo King Name:{" "}
                  <span className="">
                    {roomCodeData?.creator_id === roomCodeData?.player1_id
                      ? roomCodeData?.player2_name
                      : roomCodeData?.player1_name}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Hold Balance: <span>{data?.Accepetd_By?.hold_balance}</span>
                </p>
              </div>
              <div>
                <p>
                  Join Time:{" "}
                  <span>
                    {moment(data?.Acceptor_by_Creator_at).format("LLL")}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Participant Status:{" "}
                  <span>
                    {data?.Acceptor_status ? data?.Acceptor_status : "----"}
                  </span>
                </p>
              </div>{" "}
              <div>
                <p className="ludoKingName">
                  Ludo King Status:{" "}
                  <span>
                    {roomCodeData?.creator_id === roomCodeData?.player1_id &&
                    roomCodeData?.player1_status
                      ? roomCodeData?.player2_status
                      : "Not Found"}
                  </span>
                </p>
              </div>
              {data?.Acceptor_status_Updated_at && (
                <div>
                  <p>
                    Status Updated At:{" "}
                    <span>
                      {moment(data?.Acceptor_status_Updated_at).format("LLL")}
                    </span>
                  </p>
                </div>
              )}
              {data?.Acceptor_status_reason && (
                <div>
                  <p>
                    Cancel Reason: <span>{data?.Acceptor_status_reason}</span>
                  </p>
                </div>
              )}
              {data?.Acceptor_screenshot && (
                <div>
                  <p>Proof:</p>
                  <img
                    src={`https://ludo1002.s3.ap-south-1.amazonaws.com/${data?.Acceptor_screenshot}`}
                    style={{
                      width: "100%",
                      maxHeight: "1000px",
                      height: "100%",
                    }}
                    alt="not loaded"
                  />
                </div>
              )}
              {(data?.Status == "pending" || data?.Status == "conflict") && (
                <div className="form-group">
                  <Row align={"middle"} gutter={20}>
                    <Col xs={12} lg={6}>
                      <Button
                        onClick={() => {
                          updateByAdmin(data?.Accepetd_By?._id);
                        }}
                        className="w-100"
                      >
                        Win
                      </Button>
                    </Col>
                    <Col xs={12} lg={6}>
                      <Button
                        onClick={() => {
                          updateByAdmin(data?.Created_by?._id);
                        }}
                        className="w-100"
                      >
                        Lose
                      </Button>
                    </Col>
                  </Row>
                  <div>
                    <p>Add Penalty</p>
                    <Row gutter={16}>
                      <Col xs={12}>
                        <Input
                          value={bonus}
                          type="number"
                          onChange={(e) => setBonus(e?.target?.value)}
                          placeholder="Penalty amount"
                        />
                      </Col>
                      <Col>
                        <Button
                          onClick={() => updatePenalty(data?.Accepetd_By?._id)}
                        >
                          Add Penalty
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ViewChallenge;
