import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  message,
  Switch,
  DatePicker,
  Form,
  Input,
  Button,
  Modal,
  Select,
} from "antd";
import API_MANAGER from "../API";
import SubLayout from "../components/layout/SubLayout";
import Card from "../components/layout/dashboard/Card";
import moment from "moment";
import { Option } from "antd/es/mentions";
function Dashboard() {
  const [totalUser, setTotalUser] = useState(0);
  const [allChallanges, setAllChallanges] = useState(0);
  const [totalDepositCounts, setTotalDepositCounts] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [todayData, setTodayData] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [today, setToday] = useState(false);
  const [totalCommission, setTotalCommission] = useState();
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [isCredVisible, setIsCredVisible] = useState(false);
  const [action, setAction] = useState("");

  const handleCredSubmit = async (values) => {
    setIsCredVisible(false);
    setIsVisible(true);
    try {
      values.amount = Number(values?.amount);
      if (action == "Withdraw") values.amount *= -1;
      const response = await API_MANAGER.userMoneyManage(values);
      message.success(
        action == "Withdraw"
          ? "Money withdrawl successfully"
          : "Money deposited successfully"
      );
      getDepositCounts();
    } catch (e) {
      message.error("Insufficient balance in User's account");
    } finally {
      form.resetFields();
    }
  };

  const getAllUSer = async () => {
    try {
      const response = await API_MANAGER.getAllUser();
      setTotalUser(response?.data?.data ? response?.data?.data : 0);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const getAllChallenge = async () => {
    try {
      const response = await API_MANAGER.getAllChallengeCount();
      setAllChallanges(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong7!");
    }
  };

  const getDepositCounts = async () => {
    try {
      const response = await API_MANAGER.getTotalDeposit();
      setTotalDepositCounts(response?.data?.data);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Something went wrong10!"
      );
    }
  };

  const getTotalWithdrawal = async () => {
    try {
      const response = await API_MANAGER.getWithdrawCounts();
      setTotalWithdrawal(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const getTodayData = async () => {
    try {
      let params = {};
      if (startDate && endDate) {
        params["FROM_DATE"] = startDate;
        params["TO_DATE"] = endDate;
      }
      const response = await API_MANAGER.getTodayData(params);
      setTodayData(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const getTotalEarning = async () => {
    try {
      const response = await API_MANAGER.getTotalAdminEarning({});
      setTotalCommission(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getAllUSer();
    getAllChallenge();
    getDepositCounts();
    getTotalWithdrawal();
    getTotalEarning();
  }, []);
  useEffect(() => {
    getTodayData();
  }, [startDate, endDate]);

  return (
    <div>
      {/* <SubLayout page={"ss"}> */}
      <div className="dashboardContainer">
        <Row justify={"space-between"}>
          <Col>
            {today && (
              <Row gutter={16}>
                <Col>
                  <DatePicker
                    value={startDate}
                    onChange={(e) => setStartDate(e)}
                    placeholder="Start Date"
                  />
                </Col>
                <Col>
                  <DatePicker
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                    placeholder="End Date"
                  />
                </Col>
              </Row>
            )}
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <Row align={"middle"} gutter={8}>
              <Col>
                <Switch onChange={(e) => setToday(e)} />
              </Col>
              <Col className="mainHeading">Apply Filter</Col>
            </Row>
          </Col>
        </Row>
        {!today ? (
          <div>
            <p className="mainHeading">All User</p>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL ADMIN</p>
                  <p className="amount">{totalUser?.totalAdmin}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL USER</p>
                  <p className="amount">{totalUser?.totalUser}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">ACTIVE USER</p>
                  <p className="amount">{totalUser?.activeUser}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">BLOCKED USER</p>
                  <p className="amount">{totalUser?.blockedUser}</p>
                </div>
              </Col>
            </Row>
            <p className="mainHeading">Challenge</p>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">ALL CHALLENGE</p>
                  <p className="amount">{allChallanges?.totalChallanges}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">COMPLETED CHALLENGE</p>
                  <p className="amount">{allChallanges?.completedChallanges}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">CONFLICT CHALLENGE</p>
                  <p className="amount">{allChallanges?.conflictChallanges}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">CANCELLED CHALLENGE</p>
                  <p className="amount">{allChallanges?.cancelledChallanges}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">RUNNING CHALLENGE</p>
                  <p className="amount">{allChallanges?.runningChallanges}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">NEW CHALLENGE</p>
                  <p className="amount">{allChallanges?.newChallanges}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">DROP CHALLENGE</p>
                  <p className="amount">{allChallanges?.dropChallanges}</p>
                </div>
              </Col>
            </Row>
            <p className="mainHeading">Deposit</p>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL COMMISSION</p>
                  <p className="amount">{totalCommission?.[0]?.totalAmount}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL DEPOSIT</p>
                  <p className="amount">
                    {totalDepositCounts?.totalDeposit?.[0]?.totalAmount}
                  </p>
                </div>
              </Col>{" "}
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL REDEEM</p>
                  <p className="amount">
                    {totalDepositCounts?.totalRedeem?.[0]?.totalAmount}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL BONUS</p>
                  <p className="amount">
                    {todayData?.totalBonus?.[0]?.totalAmount}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">USER WALLET</p>
                  <p className="amount">
                    {todayData?.walletBalance?.[0]?.totalAmount}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL REQUEST</p>
                  <p className="amount">{totalDepositCounts?.totalRequest}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">PENDING REQUEST</p>
                  <p className="amount">{totalDepositCounts?.pendingRequest}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">REJECTED REQUEST</p>
                  <p className="amount">
                    {totalDepositCounts?.rejectedRequest}
                  </p>
                </div>
              </Col>
            </Row>
            <p className="mainHeading">Withdrawal Request</p>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL REQUEST</p>
                  <p className="amount">{totalWithdrawal?.totalRequest}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">TOTAL WITHDRAWAL</p>
                  <p className="amount">
                    {totalWithdrawal?.totalWithdraw?.[0]?.totalAmount}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">PENDING REQUEST</p>
                  <p className="amount">{totalWithdrawal?.pendingRequest}</p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">PENDING REQUEST AMOUNT</p>
                  <p className="amount">
                    {totalWithdrawal?.pendingRequestAmount?.[0]?.totalAmount ||
                      0}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="dashboardCard">
                  <p className="heading">REJECTED REQUEST</p>
                  <p className="amount">{totalWithdrawal?.rejectedRequest}</p>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <p className="mainHeading">Filtered Data</p>
            <Row gutter={[24, 24]}>
              <Card
                name={"Commission"}
                amount={todayData?.commissionEntry?.[0]?.totalAmount?.toFixed(
                  2
                )}
              />
              <Card
                name={"Deposit"}
                amount={todayData?.depositEntry?.[0]?.totalAmount}
              />
              <Card
                name={"Redeem"}
                amount={todayData?.redeemEntry?.[0]?.totalAmount}
              />
              <Card
                name={"Bonus"}
                amount={todayData?.bonusEntry?.[0]?.totalAmount}
              />
              <Card
                name={"Total Withdrawal"}
                amount={todayData?.withdrawlDone?.[0]?.totalAmount}
              />
              {/* <Card name={"Won amount"} amount={todayData?.totolWonAmount} />
              <Card name={"Lose amount"} amount={todayData?.totalLoseAmount} />
              <Card
                name={"Hold balance"}
                amount={todayData?.totalHoldBalance}
              /> */}
              {/* <Card
                name={"Withdrawal hold balance"}
                amount={todayData?.totalWithdrawHold}
              /> */}
              {/* <Card
                name={"Referral earning"}
                amount={todayData?.totalReferralEarning}
              />
              <Card
                name={"Referral wallet"}
                amount={todayData?.totalReferralWallet}
              /> */}
              <Card name={"All Game"} amount={todayData?.allGames} />
              <Card name={"Success game"} amount={todayData?.successGames} />
              <Card name={"Cancel game"} amount={todayData?.cancelgames} />
              <Card name={"User"} amount={todayData?.userEntry} />
              {/* <Card
                name={"User wallet"}
                amount={todayData?.totalWalletbalance}
              /> */}
            </Row>
          </div>
        )}
      </div>
      {/* </SubLayout> */}
    </div>
  );
}

export default Dashboard;
