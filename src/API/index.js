import HELPERS from "../utils/helper";
const baseURL = `https://ludo100api.ludo100.com/api/v1/`;

const API_MANAGER = {
  login: (data) => {
    return HELPERS.request({
      baseURL,
      url: "user/admin/login",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  verifyOtp: (data) => {
    return HELPERS.request({
      baseURL,
      url: "user/admin/login/finish",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllAdmin: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/admin/count`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllUser: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/user-count`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserDetail: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/user`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllUsers: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/all`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllMismatchUsers: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/all-mismatch-users`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllNegativeHoldUsers: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/all-negative-hold-users`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllPenalty: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/all/penalty`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  addPenalty: (id, params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/user/penalty/${id}`,
      method: "PATCH",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  addBonus: (id, params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/user/bonus/${id}`,
      method: "PATCH",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getCompletedChallenge: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/status`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getActiveChallenge: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/active-challange`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllChallengeCount: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/status`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getTotalDeposit: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/deposit/counts`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getWithdrawCounts: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/withdraw-counts`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getTodayData: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/user-data/all`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  balanceUpdate: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/update-balace`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  depositUpi: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/deposit-upi/response`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  userMoneyManage: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/deposit-money`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  depositUTR: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/deposit-utr/response`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getWithdrawRequest: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `temp/deposit`,
      method: "GET",
      params: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  withdrawReject: (data, id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `temp/deposit/withdraw/rejected/${id}`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  withdrawUpdate: (data, id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/withdraw/update/${id}`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  withdrawUpdateByAdminManual: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/withdraw/update-by-admin`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getAllChallenges: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/admin/challange/all`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getChallengeByStatus: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/challange/bystatus/status`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getChallengeById: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/challange-by-id/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  cancelChallenge: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/challange/admin/cancel/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateChallengeAdmin: (params, id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/admin/update/${id}`,
      method: "PATCH",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  addPanelty: (params, id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/user/penalty/${id}`,
      method: "PATCH",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getDepositHistory: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/deposit-all`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getRedeemHistory: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/redeem-all`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getWithdrawHistory: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/withdraw`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getNotification: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `notification`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  createNotification: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `notification`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteNotification: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `notification/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getContacts: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `contact`,
      method: "GET",
      params: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateContact: (data, id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `contact/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getPendingKYC: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `kyc/aadhar`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserKyc: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/kyc/aadhar/${id}`,
      method: "GET",
      // params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  approveKYC: (id, data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `kyc/aadhar/update/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  blockUnblockPlayer: (id, data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/update-user`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deletePlayer: (id, data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/delete-user/${id}`,
      method: "DELETE",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllAdmin: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/admin/all`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updatePermissions: (id, data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/agent/permission/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllAgents: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/agents`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  registerAdmin: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/admin/register`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAdminEarning: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `admin-earning`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getTotalAdminEarning: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `admin-earning/total-earning`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getWithdrawalReport: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/reports/txn-reports/all`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getBonusHistory: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/bonus/by-admin`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserById: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `user/user/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  referralCount: (referral_code) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/user/referral-count/${referral_code}`,
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserReferHistory: (referral_code, params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `referral/code/winn/${referral_code}`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateMisMatch: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/user/mismatch/clear/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateHold: (id) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `/games/user-hold-clear/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getGameHistoryById: (id, params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/challange/${id}`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getDepositHistoryById: (id, params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/user/user-deposit/${id}`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserWithdrawHistory: (id, params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `transaction/history/${id}`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllSettings: () => {
    return HELPERS.secureRequest({
      baseURL,
      url: `settings`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateAllSettings: (id, data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `settings/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  checkRoomCode: (params) => {
    return HELPERS.secureRequest({
      baseURL,
      url: `games/check-room-code`,
      method: "GET",
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  checkkvmpaydeposit: (data) => {
    return HELPERS.secureRequest({
      baseURL,
      url: "transaction/user/kvmpaystatus-response",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default API_MANAGER;
