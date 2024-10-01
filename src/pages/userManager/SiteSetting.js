import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import API_MANAGER from "../../API";

function SiteSetting() {
  const [setting, setSetting] = useState();
  const [form] = Form.useForm();
  const getSettings = async () => {
    try {
      const response = await API_MANAGER.getAllSettings();
      setSetting(response?.data?.data);
      form.setFieldsValue({
        withdrawaltype: response?.data?.data?.withdrawaltype,
        depositType: response?.data?.data?.depositType,
        isDeposit: response?.data?.data?.isDeposit,
        depositErrorMsg: response?.data?.data?.depositErrorMsg,
        isRoomCodeByPass: response?.data?.data?.isRoomCodeByPass,
        allActionClose: response?.data?.data?.allActionClose,
        alert1: response?.data?.data?.alert1,
        alert2: response?.data?.data?.alert2,
        alert3: response?.data?.data?.alert3,
        alert4: response?.data?.data?.alert4,
        alert5: response?.data?.data?.alert5,
        alert6: response?.data?.data?.alert6,
        alert7: response?.data?.data?.alert7,
        alert8: response?.data?.data?.alert8,
        upi_id: response?.data?.data?.upi_id,
      });
    } catch (error) {}
  };

  const handleSubmit = async (values) => {
    try {
      const res = await API_MANAGER.updateAllSettings(setting?._id, values);
      message.success(res?.data?.data?.message);
      getSettings();
    } catch (error) {
      message.error("Failed to submit form.");
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div>
      <div className="addNewAdminContainer">
        <p className="pageHeading">Alert Setting</p>

        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit}
          form={form}
        >
          <Row gutter={20}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={"withdrawaltype"}
                label="Withdrawal Type"
                rules={[
                  { required: true, message: "Please select withdrawal type" },
                ]}
              >
                <Select
                  placeholder="Select withdrawal type"
                  options={[
                    { label: "Manual", value: "manual" },
                    { label: "Auto Payout", value: "autopayout" },
                  ]}
                />
              </Form.Item>
            </Col>{" "}
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={"depositType"}
                label="Deposit Type"
                rules={[
                  { required: true, message: "Please select deposit type" },
                ]}
              >
                <Select
                  placeholder="Select deposit type"
                  options={[
                    { label: "KVM Pay", value: "kvm" },
                    { label: "UPI Gateway", value: "ppb" },
                  ]}
                />
              </Form.Item>
            </Col>{" "}
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={"isDeposit"}
                label="Deposit"
                rules={[
                  { required: true, message: "Please select deposit type" },
                ]}
              >
                <Select
                  placeholder="Select deposit type"
                  options={[
                    { label: "On", value: true },
                    { label: "Off", value: false },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={"isRoomCodeByPass"}
                label="Roomcode Bypass"
                rules={[
                  { required: true, message: "Please select roomcode bypass" },
                ]}
              >
                <Select
                  placeholder="Select deposit type"
                  options={[
                    { label: "On", value: true },
                    { label: "Off", value: false },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={"allActionClose"}
                label="All Action Off"
                rules={[{ required: true, message: "Please select" }]}
              >
                <Select
                  placeholder="Select"
                  options={[
                    { label: "On", value: true },
                    { label: "Off", value: false },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name={"depositErrorMsg"}
                label="Deposit Error Message"
                rules={[
                  { required: true, message: "Please select withdrawal type" },
                ]}
              >
                <Input placeholder="Enter deposit error message" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={"Home page 1st alert"}
                name={`alert1`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={"Home page 2nd alert"}
                name={`alert2`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={"Classic game list page"}
                name={`alert3`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={"Game Detail Page"}
                name={`alert4`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={"Add Cash Page"}
                name={`alert5`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0}>
              <Form.Item
                label={"Home  page 1st alert"}
                name={`alert6`}
                rules={[
                  {
                    required: false,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0}>
              <Form.Item
                label={"Home  page 1st alert"}
                name={`alert7`}
                rules={[
                  {
                    required: false,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0}>
              <Form.Item
                label={"Home  page 1st alert"}
                name={`alert8`}
                rules={[
                  {
                    required: false,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>{" "}
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={"UPI ID"}
                name={`upi_id`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder={`Enter here`} className="inputBox" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Button className="primary_button" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default SiteSetting;
