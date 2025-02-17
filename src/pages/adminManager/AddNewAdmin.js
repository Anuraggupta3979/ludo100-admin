import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Select, Button, message, Checkbox } from "antd";
import API_MANAGER from "../../API";
import { useNavigate } from "react-router-dom";
import HELPERS from "../../utils/helper";
function AddNewAdmin() {
  const initialPermissions = {
    dashboard: false,
    today_filtrers: false,
    admin_earnings: false,
    all_admin: false,
    add_new_admin: false,
    all_users: false,
    view_user: false,
    view_phone: false,
    update_user: false,
    blocked_users: false,
    pending_kyc: false,
    reject_kyc: false,
    verified_kyc: false,
    site_setting: false,
    all_games: false,
    completed_games: false,
    conflict_games: false,
    cancelled_games: false,
    running_games: false,
    new_games: false,
    drop_games: false,
    classic_all_games: false,
    classic_matched_games: false,
    classic_cancelled_games: false,
    classic_completed_games: false,
    classic_playing_games: false,
    classic_waiting_games: false,
    classic_drop_games: false,
    panelty_and_bonus: false,
    deposit_history: false,
    bonus_history: false,
    withdrawal_history: false,
    withdrawal_request: false,
    deposit_report: false,
    bonus_report: false,
    penalty_report: false,
    withdrawal_report: false,
    contact: false,
    notification: false,
  };
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(initialPermissions);
  const [permissionForm] = Form.useForm();
  const [adminList, setAdminList] = useState([]);
  const handleSubmit = async (e) => {
    e = { ...e, ["password"]: "123456789", ["twofactor_code"]: "123456" };
    try {
      const response = await API_MANAGER.registerAdmin(e);
      message.success("User added successfully!");
      navigate("/admin-all");
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const getAdminList = async () => {
    try {
      const response = await API_MANAGER.getAllAdmin({ Permissions: true });

      setAdminList(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const handlePermissions = async (data) => {
    const permission = Object.entries(permissions).map(([key, value]) => ({
      Permission: key,
      Status: value,
    }));

    try {
      await API_MANAGER.updatePermissions(data?.user, {
        permissions: permission,
      });
      message.success("Permission updated successfully.");
      setPermissions(initialPermissions);
      permissionForm.resetFields();
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const handlePermissionChange = async (type, value) => {
    const data = { ...permissions };
    data[type] = value;
    setPermissions(data);
  };
  const handleChangeAdmin = (id) => {
    const admin = adminList.find((e) => e?._id === id);
    let temp = {};
    admin?.Permissions?.map((item) => {
      temp[item?.Permission] = item?.Status;
    });
    setPermissions(temp);
  };
  useEffect(() => {
    getAdminList();
  }, []);
  return (
    <div>
      <div className="addNewAdminContainer">
        <p className="pageHeading">Add New Admin</p>

        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit}
          initialValues={{ user_type: "Admin" }}
        >
          <Row gutter={20}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
              >
                <Input placeholder="Enter name" className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter phone",
                  },
                ]}
              >
                <Input placeholder="Enter phone number" className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Type"
                name="user_type"
                rules={[
                  {
                    required: true,
                    message: "Please select type",
                  },
                ]}
              >
                <Select placeholder="Select type" className="selectBox">
                  <Select.Option value="ADMIN">Admin</Select.Option>
                  {/* <Select.Option value="AGENT">Agent</Select.Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"end"}>
            <Button className="primary_button" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </div>
      <div className="addNewAdminContainer mt-32">
        <p className="pageHeading">Permissions</p>

        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={handlePermissions}
          form={permissionForm}
        >
          <Form.Item
            label="Select user for permission*"
            name={"user"}
            rules={[{ required: true, message: "Please select user." }]}
          >
            <Select
              placeholder="Select User"
              showSearch
              onChange={(e) => handleChangeAdmin(e)}
            >
              {adminList?.map((user) => (
                <Select.Option value={user?._id} key={user?.id}>
                  {`${user?.Name ? user?.Name : " "} - ${user?.Phone}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={"dashboard"}>
            <Checkbox
              checked={permissions?.dashboard}
              onChange={(e) =>
                handlePermissionChange("dashboard", e?.target?.checked)
              }
            >
              DashBoard
            </Checkbox>
          </Form.Item>
          <Form.Item name={"today_filtrers"}>
            <Checkbox
              checked={permissions?.today_filtrers}
              onChange={(e) =>
                handlePermissionChange("today_filtrers", e?.target?.checked)
              }
            >
              Today Filters
            </Checkbox>
          </Form.Item>
          <Form.Item name={"admin_earnings"}>
            <Checkbox
              checked={permissions?.admin_earnings}
              onChange={(e) =>
                handlePermissionChange("admin_earnings", e?.target?.checked)
              }
            >
              Admin Earnings
            </Checkbox>
          </Form.Item>
          <Form.Item name={"all_admin"}>
            <Checkbox
              checked={permissions?.all_admin}
              onChange={(e) =>
                handlePermissionChange("all_admin", e?.target?.checked)
              }
            >
              All Admin
            </Checkbox>
          </Form.Item>
          <Form.Item name={"add_new_admin"}>
            <Checkbox
              checked={permissions?.add_new_admin}
              onChange={(e) =>
                handlePermissionChange("add_new_admin", e?.target?.checked)
              }
            >
              Add New Admin
            </Checkbox>
          </Form.Item>
          <Form.Item name={"all_users"}>
            <Checkbox
              checked={permissions?.all_users}
              onChange={(e) =>
                handlePermissionChange("all_users", e?.target?.checked)
              }
            >
              All Users
            </Checkbox>
          </Form.Item>
          {/* <Form.Item name={"update_user"}>
            <Checkbox
              checked={permissions?.update_user}
              onChange={(e) =>
                handlePermissionChange("update_user", e?.target?.checked)
              }
            >
              Update User
            </Checkbox>
          </Form.Item> */}
          <Form.Item name={"view_user"}>
            <Checkbox
              checked={permissions?.view_user}
              onChange={(e) =>
                handlePermissionChange("view_user", e?.target?.checked)
              }
            >
              View User
            </Checkbox>
          </Form.Item>
          <Form.Item name={"view_phone"}>
            <Checkbox
              checked={permissions?.view_phone}
              onChange={(e) =>
                handlePermissionChange("view_phone", e?.target?.checked)
              }
            >
              View Phone
            </Checkbox>
          </Form.Item>
          {/* <Form.Item name={"update_user"}>
            <Checkbox
              checked={permissions?.update_user}
              onChange={(e) =>
                handlePermissionChange("update_user", e?.target?.checked)
              }
            >
              Update User
            </Checkbox>
          </Form.Item> */}
          <Form.Item name={"blocked_users"}>
            <Checkbox
              checked={permissions?.blocked_users}
              onChange={(e) =>
                handlePermissionChange("blocked_users", e?.target?.checked)
              }
            >
              Blocked Users
            </Checkbox>
          </Form.Item>
          <Form.Item name={"pending_kyc"}>
            <Checkbox
              checked={permissions?.pending_kyc}
              onChange={(e) =>
                handlePermissionChange("pending_kyc", e?.target?.checked)
              }
            >
              Pending KYC
            </Checkbox>
          </Form.Item>
          <Form.Item name={"reject_kyc"}>
            <Checkbox
              checked={permissions?.reject_kyc}
              onChange={(e) =>
                handlePermissionChange("reject_kyc", e?.target?.checked)
              }
            >
              Reject KYC
            </Checkbox>
          </Form.Item>
          <Form.Item name={"verified_kyc"}>
            <Checkbox
              checked={permissions?.verified_kyc}
              onChange={(e) =>
                handlePermissionChange("verified_kyc", e?.target?.checked)
              }
            >
              Verified KYC
            </Checkbox>
          </Form.Item>
          <Form.Item name={"site_setting"}>
            <Checkbox
              checked={permissions?.site_setting}
              onChange={(e) =>
                handlePermissionChange("site_setting", e?.target?.checked)
              }
            >
              Site Setting
            </Checkbox>
          </Form.Item>
          <Form.Item name={"all_games"}>
            <Checkbox
              checked={permissions?.all_games}
              onChange={(e) =>
                handlePermissionChange("all_games", e?.target?.checked)
              }
            >
              All Games
            </Checkbox>
          </Form.Item>
          <Form.Item name={"completed_games"}>
            <Checkbox
              checked={permissions?.completed_games}
              onChange={(e) =>
                handlePermissionChange("completed_games", e?.target?.checked)
              }
            >
              Completed Games
            </Checkbox>
          </Form.Item>
          <Form.Item name={"conflict_games"}>
            <Checkbox
              checked={permissions?.conflict_games}
              onChange={(e) =>
                handlePermissionChange("conflict_games", e?.target?.checked)
              }
            >
              Conflict Games
            </Checkbox>
          </Form.Item>
          <Form.Item name={"cancelled_games"}>
            <Checkbox
              checked={permissions?.cancelled_games}
              onChange={(e) =>
                handlePermissionChange("cancelled_games", e?.target?.checked)
              }
            >
              Cancel Games
            </Checkbox>
          </Form.Item>{" "}
          <Form.Item name={"running_games"}>
            <Checkbox
              checked={permissions?.running_games}
              onChange={(e) =>
                handlePermissionChange("running_games", e?.target?.checked)
              }
            >
              Running Games
            </Checkbox>
          </Form.Item>
          <Form.Item name={"new_games"}>
            <Checkbox
              checked={permissions?.new_games}
              onChange={(e) =>
                handlePermissionChange("new_games", e?.target?.checked)
              }
            >
              New Games
            </Checkbox>
          </Form.Item>
          <Form.Item name={"drop_games"}>
            <Checkbox
              checked={permissions?.drop_games}
              onChange={(e) =>
                handlePermissionChange("drop_games", e?.target?.checked)
              }
            >
              Drop Games
            </Checkbox>
          </Form.Item>
          <Form.Item name={"panelty_and_bonus"}>
            <Checkbox
              checked={permissions?.panelty_and_bonus}
              onChange={(e) =>
                handlePermissionChange("panelty_and_bonus", e?.target?.checked)
              }
            >
              Panelty And Bonus
            </Checkbox>
          </Form.Item>
          <Form.Item name={"deposit_history"}>
            <Checkbox
              checked={permissions?.deposit_history}
              onChange={(e) =>
                handlePermissionChange("deposit_history", e?.target?.checked)
              }
            >
              Deposit History
            </Checkbox>
          </Form.Item>
          <Form.Item name={"bonus_history"}>
            <Checkbox
              checked={permissions?.bonus_history}
              onChange={(e) =>
                handlePermissionChange("bonus_history", e?.target?.checked)
              }
            >
              {" "}
              Bonus History
            </Checkbox>
          </Form.Item>
          <Form.Item name={"withdrawal_history"}>
            <Checkbox
              checked={permissions?.withdrawal_history}
              onChange={(e) =>
                handlePermissionChange("withdrawal_history", e?.target?.checked)
              }
            >
              Withdrawal History
            </Checkbox>
          </Form.Item>
          <Form.Item name={"withdrawal_request"}>
            <Checkbox
              checked={permissions?.withdrawal_request}
              onChange={(e) =>
                handlePermissionChange("withdrawal_request", e?.target?.checked)
              }
            >
              Withdrawal Request
            </Checkbox>
          </Form.Item>
          <Form.Item name={"deposit_report"}>
            <Checkbox
              checked={permissions?.deposit_report}
              onChange={(e) =>
                handlePermissionChange("deposit_report", e?.target?.checked)
              }
            >
              Deposit Report
            </Checkbox>
          </Form.Item>
          <Form.Item name={"bonus_report"}>
            <Checkbox
              checked={permissions?.bonus_report}
              onChange={(e) =>
                handlePermissionChange("bonus_report", e?.target?.checked)
              }
            >
              Bonus Report
            </Checkbox>
          </Form.Item>
          <Form.Item name={"penalty_report"}>
            <Checkbox
              checked={permissions?.penalty_report}
              onChange={(e) =>
                handlePermissionChange("penalty_report", e?.target?.checked)
              }
            >
              {" "}
              Penalty Report
            </Checkbox>
          </Form.Item>
          <Form.Item name={"withdrawal_report"}>
            <Checkbox
              checked={permissions?.withdrawal_report}
              onChange={(e) =>
                handlePermissionChange("withdrawal_report", e?.target?.checked)
              }
            >
              Withdrawal Report
            </Checkbox>
          </Form.Item>
          <Form.Item name={"contact"}>
            <Checkbox
              checked={permissions?.contact}
              onChange={(e) =>
                handlePermissionChange("contact", e?.target?.checked)
              }
            >
              Contact
            </Checkbox>
          </Form.Item>
          <Form.Item name={"notification"}>
            <Checkbox
              checked={permissions?.notification}
              onChange={(e) =>
                handlePermissionChange("notification", e?.target?.checked)
              }
            >
              Notification
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button className="primary_button" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddNewAdmin;
