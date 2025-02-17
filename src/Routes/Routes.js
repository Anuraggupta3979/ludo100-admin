import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CustomLayout from "../components/layout";
import Dashboard from "../pages/dashboard";
import DepositHistory from "../pages/transactionManager/DepositHistory";
import WithdrawalRequest from "../pages/transactionManager/WithdrawalRequest";
import ViewUser from "../pages/userManager/ViewUser";
import ConflictChallenges from "../pages/challengeManager/ConflictChallenges";
import ViewChallenge from "../pages/challengeManager/ViewChallenge";
import Contacts from "../pages/contact/Contacts";
import AllChallenge from "../pages/challengeManager/AllChallenge";
import CancelledChallenge from "../pages/challengeManager/CancelledChallange";
import CompletedChallenge from "../pages/challengeManager/CompletedChallenge";
import RunningChallenge from "../pages/challengeManager/RunningChallenge";
import DropChallenge from "../pages/challengeManager/DropChallenge";
import NewChallenge from "../pages/challengeManager/NewChallenge";
import AllUsers from "../pages/userManager/AllUsers";
import PendingKYC from "../pages/userManager/PendingKYC";
import RejectKYC from "../pages/userManager/RejectKYC";
import AllAdmin from "../pages/adminManager/AllAdmin";
import AddNewAdmin from "../pages/adminManager/AddNewAdmin";
import AdminEarnings from "../pages/AdminEarnings";
import VerifiedKYC from "../pages/userManager/VerifiedKYC";
import WithdrawalReport from "../pages/reports/WithdrawalReport";
import BonusReport from "../pages/reports/BonusReport";
import PenaltyReport from "../pages/reports/PenaltyReport";
import DepositReport from "../pages/reports/DepositReport";
import BonusHistory from "../pages/transactionManager/BonusHistory";
import WithdrawalHistory from "../pages/transactionManager/WithdrawHistory";
import Notification from "../pages/notification";
import PenaltyBonus from "../pages/transactionManager/PenaltyBonus";
import API_MANAGER from "../API";
import { message } from "antd";
import BlockedUsers from "../pages/userManager/BlockedUsers";
import SiteSetting from "../pages/userManager/SiteSetting";
import CheckChallange from "../pages/challengeManager/CheckChallange";
import RedeemHistory from "../pages/transactionManager/RedeemHistory";
import AllmismatchUsers from "../pages/userManager/AllMismatchUsers";
import AllNegativeHoldUsers from "../pages/userManager/AllNegativeHoldUsers";
import DummyGames from "../pages/DummyGames";
const CustomRoutes = () => {
  const [data, setData] = useState({});
  const [permissions, setPermissions] = useState({});
  const getUser = async () => {
    try {
      const response = await API_MANAGER.getUserDetail();

      setData(response?.data?.data);

      let temp = {};
      response?.data?.data?.Permissions?.map((item) => {
        temp[item?.Permission] = item?.Status;
      });
      setPermissions(temp);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <CustomLayout permissions={permissions}>
      <Routes>
        {permissions?.dashboard && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {permissions?.admin_earnings && (
          <Route path="/earnings" element={<AdminEarnings />} />
        )}
        {permissions?.deposit_history && (
          <Route path="/deposit-history" element={<DepositHistory />} />
        )}
        {permissions?.deposit_history && (
          <Route path="/redeem-history" element={<RedeemHistory />} />
        )}
        {permissions?.panelty_and_bonus && (
          <Route path="/penalty-bonus" element={<PenaltyBonus />} />
        )}
        {permissions?.bonus_history && (
          <Route path="/bonus-history" element={<BonusHistory />} />
        )}
        {permissions?.withdrawal_history && (
          <Route path="/withdrawal-history" element={<WithdrawalHistory />} />
        )}
        {permissions?.withdrawal_request && (
          <Route path="/withdrawal-request" element={<WithdrawalRequest />} />
        )}
        <Route
          path="/user/view/:id"
          element={<ViewUser permissions={permissions} />}
        />
        {permissions?.conflict_games && (
          <Route path="/conflict-challenges" element={<ConflictChallenges />} />
        )}
        <Route path="/view-challenges/:id" element={<ViewChallenge />} />
        {permissions?.all_games && (
          <Route path="/all-challenges" element={<AllChallenge />} />
        )}
        {permissions?.cancelled_games && (
          <Route
            path="/cancelled-challenges"
            element={<CancelledChallenge />}
          />
        )}
        {permissions?.completed_games && (
          <Route
            path="/completed-challenges"
            element={<CompletedChallenge />}
          />
        )}
        {permissions?.running_games && (
          <Route path="/running-challenges" element={<RunningChallenge />} />
        )}
        <Route path="/drop-challenges" element={<DropChallenge />} />
        {permissions?.new_games && (
          <Route path="/new-challenges" element={<NewChallenge />} />
        )}{" "}
        {permissions?.conflict_games && (
          <Route path="/check-challenge" element={<CheckChallange />} />
        )}
        {permissions?.all_users && (
          <Route path="/user-all" element={<AllUsers />} />
        )}
        {permissions?.all_users && (
          <Route path="/user-mismatch-all" element={<AllmismatchUsers />} />
        )}
        {permissions?.all_users && (
          <Route
            path="/user-negative-hold-all"
            element={<AllNegativeHoldUsers />}
          />
        )}
        {permissions?.blocked_users && (
          <Route path="/blocked-users" element={<BlockedUsers />} />
        )}
        {permissions?.all_admin && (
          <Route path="/admin-all" element={<AllAdmin />} />
        )}
        {permissions?.add_new_admin && (
          <Route path="/admin-register" element={<AddNewAdmin />} />
        )}
        {permissions?.pending_kyc && (
          <Route path="/pending-kyc" element={<PendingKYC />} />
        )}
        {permissions?.reject_kyc && (
          <Route path="/reject-kyc" element={<RejectKYC />} />
        )}
        {permissions?.verified_kyc && (
          <Route path="/verified-kyc" element={<VerifiedKYC />} />
        )}
        {permissions?.site_setting && (
          <Route path="/site-setting" element={<SiteSetting />} />
        )}
        {permissions?.deposit_report && (
          <Route path="/report-deposit" element={<DepositReport />} />
        )}
        {permissions?.withdrawal_report && (
          <Route path="/report-withdraw" element={<WithdrawalReport />} />
        )}
        {permissions?.bonus_report && (
          <Route path="/report-bonus" element={<BonusReport />} />
        )}
        {permissions?.penalty_report && (
          <Route path="/report-penalty" element={<PenaltyReport />} />
        )}
        {permissions?.notification && (
          <Route
            path="/notification"
            element={<Notification userData={data} />}
          />
        )}{" "}
        {permissions?.site_setting && (
          <Route path="/dummy-games" element={<DummyGames />} />
        )}
        {permissions?.contact && (
          <Route path="/contacts" element={<Contacts />} />
        )}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </CustomLayout>
  );
};

export default CustomRoutes;
