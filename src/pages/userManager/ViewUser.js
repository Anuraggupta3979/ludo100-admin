import { Row, Col, message, Button, Radio, Form, Modal, Input } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_MANAGER from "../../API";
import UserGameHistory from "../../components/common/user/UserGameHistory";
import UserDepositHistory from "../../components/common/user/UserDepositHistory";
import UserReferHistory from "../../components/common/user/UserReferHistory";
import UserWithDrawHistory from "../../components/common/user/UserWithDrawHistory";
import UserKYC from "../../components/common/user/UserKYC";
function ViewUser() {
  const [user, setUser] = useState({});
  let [mismatchValue, setMisMatchValue] = useState(0);
  const [referCount, setReferralcount] = useState([]);
  const [reportType, setReportType] = useState("Game");
  const { id } = useParams();
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [isCredVisible, setIsCredVisible] = useState(false);
  const [action, setAction] = useState("");
  const referralCount = async (referral_code) => {
    try {
      const response = await API_MANAGER.referralCount(referral_code);
      // setUser(response?.data?.data);
      setReferralcount(response?.data?.data);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const getData = async () => {
    try {
      const response = await API_MANAGER.getUserById(id);
      setUser(response?.data?.data);
      setMisMatchValue(
        response?.data?.data?.Wallet_balance -
          (response?.data?.data?.wonAmount -
            response?.data?.data?.loseAmount +
            response?.data?.data?.totalDeposit +
            response?.data?.data?.referral_earning +
            response?.data?.data?.totalBonus -
            (response?.data?.data?.totalWithdrawl +
              response?.data?.data?.referral_wallet +
              response?.data?.data?.withdraw_holdbalance +
              response?.data?.data?.hold_balance +
              response?.data?.data?.totalPenalty))
      );
      referralCount(response?.data?.data?.referral_code);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const updateMismatch = async (id) => {
    try {
      const response = await API_MANAGER.updateMisMatch(id);
      message.success("Updated Successfully!");
      getData();
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const updateHold = async (id) => {
    try {
      const response = await API_MANAGER.updateHold(id);
      message.success("Updated Successfully!");
      getData();
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
    // axios.patch(baseUrl + `user/Hold/clear/${Id}`, { headers }).then((res) => {
  };
  const handleCredSubmit = async (values) => {
    setIsCredVisible(false);
    setIsVisible(true);
    try {
      values.amount = Number(values?.amount);
      if (action === "WithdrawAdmin") {
        const response = await API_MANAGER.withdrawUpdateByAdminManual({
          ...values,
          user_id: id,
        });
        message.success("Withdraw successfull.");
      } else {
        if (action === "Withdraw") values.amount *= -1;
        const response = await API_MANAGER.userMoneyManage(values);
        message.success(
          action == "Withdraw"
            ? "Money withdrawn successfully"
            : "Money deposited successfully"
        );
      }
    } catch (e) {
      console.log(e, "asdsaaf");
      message.error("Insufficient balance in User's account");
    } finally {
      getData();
      form.resetFields();
    }
  };
  useEffect(() => {
    getData();
  }, [id]);
  return (
    <div>
      <div className="deposit_history">
        <Modal
          title="UserInfo"
          footer={false}
          centered
          open={isCredVisible}
          onCancel={() => {
            form.resetFields();
            setIsCredVisible(false);
          }}
        >
          <Form
            form={form}
            onFinish={(values) => {
              const additionalValues = {
                userId: id,
              };

              const updatedValues = { ...values, ...additionalValues };

              handleCredSubmit(updatedValues);
            }}
          >
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please enter amount.",
                },
              ]}
            >
              <Input type="number" placeholder="eg:- 500" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">{action}</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="user_management">
        <p className="heading">User Details</p>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Name</p>
              <p className="value">{user?.Name}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Verified</p>
              <p className="value">{user?.verified ? "Yes" : "No"}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Phone</p>
              <p className="value">{user?.Phone}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Wallet Balance</p>
              <p className="value">{user?.Wallet_balance?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Withdrawal Amount balance</p>
              <p className="value">{user?.withdrawAmount?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Withdrawal Hold balance</p>
              <p className="value">{user?.withdraw_holdbalance?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Referral balance</p>
              <p className="value">{user?.referral_wallet?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item"> Referral count</p>
              <p className="value">{referCount ? referCount : 0}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Referral earning</p>
              <p className="value">{user?.referral_earning?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Total Deposit</p>
              <p className="value">{user?.totalDeposit?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Total Withdrawal</p>
              <p className="value">{user?.totalWithdrawl?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Total Bonus</p>
              <p className="value">{user?.totalBonus?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Total Penalty</p>
              <p className="value">{user?.totalPenalty?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Hold balance</p>
              <p className="value">{user?.hold_balance?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Won amount</p>
              <p className="value">{user?.wonAmount?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Lose amount</p>
              <p className="value">{user?.loseAmount?.toFixed(2)}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Calculated wallet balance</p>
              <p className="value">
                {(
                  user?.wonAmount -
                  user?.loseAmount +
                  user?.totalDeposit +
                  user?.referral_earning +
                  user?.totalBonus -
                  (user?.totalWithdrawl +
                    user?.referral_wallet +
                    user?.withdraw_holdbalance +
                    user?.hold_balance +
                    user?.totalPenalty)
                )?.toFixed(2)}
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Mismatch wallet balance</p>
              <p className="value">{mismatchValue}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Referral code </p>
              <p className="value">{user?.referral_code}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Referral by </p>
              <p className="value">{user?.referral}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item"> Account created at</p>
              <p className="value">{moment(user?.createdAt).format("LLL")}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item"> Account updated at</p>
              <p className="value">{moment(user?.updatedAt).format("LLL")}</p>
            </div>
          </Col>
        </Row>
        <p className="heading">Bank Details</p>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Account holder name </p>
              <p className="value">{user?.holder_name}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">IFSC code</p>
              <p className="value">{user?.ifsc_code}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Account number </p>
              <p className="value">{user?.account_number}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">UPI ID</p>
              <p className="value">{user?.upi_id}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Mismatch</p>
              <p className="value">
                <Button onClick={() => updateMismatch(user?._id)}>
                  CLEAR ({mismatchValue?.toFixed(2)})
                </Button>
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Hold</p>
              <p className="value">
                <Button onClick={() => updateHold(user?._id)}>
                  CLEAR ({user?.hold_balance?.toFixed(2)})
                </Button>
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">DEPOSIT MONEY</p>
              <p className="value">
                <Button
                  onClick={() => {
                    setAction("Deposit");
                    setIsCredVisible(true);
                  }}
                >
                  Deposit
                </Button>
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Cut MONEY</p>
              <p className="value">
                <Button
                  onClick={() => {
                    setAction("Withdraw");
                    setIsCredVisible(true);
                  }}
                >
                  Cut Money
                </Button>
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="userCard">
              <p className="item">Withdraw MONEY</p>
              <p className="value">
                <Button
                  onClick={() => {
                    setAction("WithdrawAdmin");
                    setIsCredVisible(true);
                  }}
                >
                  Withdraw
                </Button>
              </p>
            </div>
          </Col>
        </Row>
        <p className="heading">History</p>
        <div className="radioButtons">
          <Radio.Group
            defaultValue={reportType}
            onChange={(e) => setReportType(e?.target?.value)}
          >
            <Radio.Button value="Game">Game</Radio.Button>
            <Radio.Button value="Deposit">Deposit</Radio.Button>
            <Radio.Button value="Withdraw">Withdraw</Radio.Button>
            <Radio.Button value="Referral">Referral</Radio.Button>
            <Radio.Button value="KYC">KYC</Radio.Button>
          </Radio.Group>

          <div
            style={{
              marginTop: "30px",
            }}
          >
            {reportType === "Game" && <UserGameHistory id={user?._id} />}
            {reportType === "Deposit" && <UserDepositHistory id={user?._id} />}
            {reportType === "Withdraw" && (
              <UserWithDrawHistory id={user?._id} />
            )}
            {reportType === "Referral" && (
              <UserReferHistory id={user?.referral_code} />
            )}
            {reportType === "KYC" && <UserKYC id={user?._id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
