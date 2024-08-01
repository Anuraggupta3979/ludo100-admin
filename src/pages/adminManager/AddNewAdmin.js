import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Select, Button, message, Checkbox } from "antd";
import API_MANAGER from "../../API";
import { useNavigate } from "react-router-dom";
function AddNewAdmin() {
  const initialPermissions = {
    dashboard: false,
    admin_earnings: false,
    all_admin: false,
    add_new_admin: false,
    all_users: false,
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
  const [agentList, setAgentList] = useState([]);
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
      const response = await API_MANAGER.getAllAdmin();
      setAdminList(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const getAllAgent = async () => {
    try {
      const response = await API_MANAGER.getAllAgents();
      setAgentList(response?.data?.data);
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
  useEffect(() => {
    getAdminList();
    getAllAgent();
  }, []);
  return (
    <div>
      <div className="addNewAdminContainer">
        <p className="pageHeading">Add New Admin</p>

        <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
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
                  <Select.Option value="AGENT">Agent</Select.Option>
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
            <Select placeholder="Select User" showSearch>
              {[...adminList, ...agentList]?.map((user) => (
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
          <Form.Item
            name={"admin_earnings"}
            checked={permissions?.admin_earnings}
            onChange={(e) =>
              handlePermissionChange("admin_earnings", e?.target?.checked)
            }
          >
            <Checkbox>Admin Earnings</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.all_admin}
            onChange={(e) =>
              handlePermissionChange("all_admin", e?.target?.checked)
            }
            name={"all_admin"}
          >
            <Checkbox>All Admin</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.add_new_admin}
            onChange={(e) =>
              handlePermissionChange("add_new_admin", e?.target?.checked)
            }
            name={"add_new_admin"}
          >
            <Checkbox>Add New Admin</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.all_users}
            onChange={(e) =>
              handlePermissionChange("all_users", e?.target?.checked)
            }
            name={"all_users"}
          >
            <Checkbox>All Users</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.all_users}
            onChange={(e) =>
              handlePermissionChange("blocked_users", e?.target?.checked)
            }
            name={"blocked_users"}
          >
            <Checkbox>Blocked Users</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.pending_kyc}
            onChange={(e) =>
              handlePermissionChange("pending_kyc", e?.target?.checked)
            }
            name={"pending_kyc"}
          >
            <Checkbox>Pending KYC</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.reject_kyc}
            onChange={(e) =>
              handlePermissionChange("reject_kyc", e?.target?.checked)
            }
            name={"reject_kyc"}
          >
            <Checkbox>Reject KYC</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.verified_kyc}
            onChange={(e) =>
              handlePermissionChange("verified_kyc", e?.target?.checked)
            }
            name={"verified_kyc"}
          >
            <Checkbox>Verified KYC</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.site_setting}
            onChange={(e) =>
              handlePermissionChange("site_setting", e?.target?.checked)
            }
            name={"site_setting"}
          >
            <Checkbox>Site Setting</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.all_games}
            onChange={(e) =>
              handlePermissionChange("all_games", e?.target?.checked)
            }
            name={"all_games"}
          >
            <Checkbox>All Games</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.completed_games}
            onChange={(e) =>
              handlePermissionChange("completed_games", e?.target?.checked)
            }
            name={"completed_games"}
          >
            <Checkbox>Completed Games</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.conflict_games}
            onChange={(e) =>
              handlePermissionChange("conflict_games", e?.target?.checked)
            }
            name={"conflict_games"}
          >
            <Checkbox>Conflict Games</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.cancelled_games}
            onChange={(e) =>
              handlePermissionChange("cancelled_games", e?.target?.checked)
            }
            name={"cancelled_games"}
          >
            <Checkbox>Cancel Games</Checkbox>
          </Form.Item>{" "}
          <Form.Item
            checked={permissions?.running_games}
            onChange={(e) =>
              handlePermissionChange("running_games", e?.target?.checked)
            }
            name={"running_games"}
          >
            <Checkbox>Running Games</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.new_games}
            onChange={(e) =>
              handlePermissionChange("new_games", e?.target?.checked)
            }
            name={"new_games"}
          >
            <Checkbox>New Games</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.drop_games}
            onChange={(e) =>
              handlePermissionChange("drop_games", e?.target?.checked)
            }
            name={"drop_games"}
          >
            <Checkbox>Drop Games</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.panelty_and_bonus}
            onChange={(e) =>
              handlePermissionChange("panelty_and_bonus", e?.target?.checked)
            }
            name={"panelty_and_bonus"}
          >
            <Checkbox>Panelty And Bonus</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.deposit_history}
            onChange={(e) =>
              handlePermissionChange("deposit_history", e?.target?.checked)
            }
            name={"deposit_history"}
          >
            <Checkbox>Deposit History</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.bonus_history}
            onChange={(e) =>
              handlePermissionChange("bonus_history", e?.target?.checked)
            }
            name={"bonus_history"}
          >
            <Checkbox>Bonus History</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.withdrawal_history}
            onChange={(e) =>
              handlePermissionChange("withdrawal_history", e?.target?.checked)
            }
            name={"withdrawal_history"}
          >
            <Checkbox>Withdrawal History</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.withdrawal_request}
            onChange={(e) =>
              handlePermissionChange("withdrawal_request", e?.target?.checked)
            }
            name={"withdrawal_request"}
          >
            <Checkbox>Withdrawal Request</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.deposit_report}
            onChange={(e) =>
              handlePermissionChange("deposit_report", e?.target?.checked)
            }
            name={"deposit_report"}
          >
            <Checkbox>Deposit Report</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.bonus_report}
            onChange={(e) =>
              handlePermissionChange("bonus_report", e?.target?.checked)
            }
            name={"bonus_report"}
          >
            <Checkbox>Bonus Report</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.penalty_report}
            onChange={(e) =>
              handlePermissionChange("penalty_report", e?.target?.checked)
            }
            name={"penalty_report"}
          >
            <Checkbox>Penalty Report</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.withdrawal_report}
            onChange={(e) =>
              handlePermissionChange("withdrawal_report", e?.target?.checked)
            }
            name={"withdrawal_report"}
          >
            <Checkbox>Withdrawal Report</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.contact}
            onChange={(e) =>
              handlePermissionChange("contact", e?.target?.checked)
            }
            name={"contact"}
          >
            <Checkbox>Contact</Checkbox>
          </Form.Item>
          <Form.Item
            checked={permissions?.notification}
            onChange={(e) =>
              handlePermissionChange("notification", e?.target?.checked)
            }
            name={"notification"}
          >
            <Checkbox>Notification</Checkbox>
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
