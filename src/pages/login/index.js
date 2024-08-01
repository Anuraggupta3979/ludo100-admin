import React, { useState, useEffect } from "react";
import { Row, Form, Input, Button, Col, message } from "antd";
import Logo from "../../Assets/logo.webp";
import API_MANAGER from "../../API/index";
import Cookies from "js-cookie";
import { ReactComponent as CallIcon } from "../../Assets/call.svg";
import { ReactComponent as OTPIcon } from "../../Assets/otp.svg";
import { useNavigate } from "react-router-dom";
function Login() {
  const [showOtp, setShowOtp] = useState(false);
  const [secretCode, setSecretCode] = useState(null);
  const [counter, setCounter] = useState(0);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleNumberSubmit = async (values) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (re.test(values?.number)) {
      setLoading(true);
      try {
        setPhone(values?.number);
        const param = {
          phone: values?.number,
        };
        const response = await API_MANAGER.login(param);
        setShowOtp(true);
        setCounter(15);
        setSecretCode(response?.data?.data?.secret);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Something went wrong!");
      }
    } else {
      message.error("Please enter a valid number!");
    }
  };
  const handleVerifyOTP = async (values) => {
    if (values?.otp) {
      try {
        const param = {
          phone: phone,
          twofactor_code: values?.otp,
          secretCode,
        };
        const response = await API_MANAGER.verifyOtp(param);
        setShowOtp(true);
        localStorage.setItem(
          "hashcode",
          response?.data?.data?.token?.accessToken
        );
        navigate("/dashboard");
      } catch (error) {
        message.error("Something went wrong!");
      }
    } else {
      message.error("Please enter a valid OTP!");
    }
  };
  const resendOtp = async () => {
    try {
      const param = {
        Phone: phone,
      };
      const response = await API_MANAGER.login(param);
      setCounter(15);
      setSecretCode(response.data.secret);
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  return (
    <div className="loginContainer">
      <div className="loginContentContainer">
        <div className="loginCard">
          <Row justify={"center"}>
            <p className="title">Sign In</p>
          </Row>
          <Row justify={"center"}>
            <img
              src={Logo}
              alt="Ludo100"
              height={180}
              style={{paddingBottom:"15px"}}
              onClick={() => navigate("/")}
            />
          </Row>
          <div>
            {!showOtp ? (
              <Form onFinish={handleNumberSubmit}>
                <Form.Item
                  name="number"
                  rules={[
                    {
                      required: true,
                      message: "Mobile number is required!",
                    },
                    {
                      length: 10,
                      message: "please enter valid number!",
                    },
                  ]}
                >
                  <Input
                    className="inputBox"
                    minLength={10}
                    placeholder="Enter your mobile number"
                    prefix={
                      <span className="mobilePrefix">
                        <CallIcon style={{ width: "20px", height: "24px" }} /> |
                      </span>
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <Row justify={"center"}>
                    <Button
                      htmlType="submit"
                      className="primary_button"
                      placeholder="Enter your mobile number"
                      prefix={
                        <span className="mobilePrefix">
                          <CallIcon style={{ width: "20px", height: "24px" }} />{" "}
                          |
                        </span>
                      }
                      loading={loading}
                    >
                      CONTINUE
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            ) : (
              <Form onFinish={handleVerifyOTP}>
                <Form.Item
                  name="otp"
                  rules={[
                    {
                      required: true,
                      message: "OTP is required!",
                    },
                  ]}
                >
                  <Input
                    className="inputBox"
                    placeholder="Enter OTP"
                    prefix={
                      <span an className="mobilePrefix">
                        <OTPIcon style={{ width: "20px", height: "24px" }} /> |
                      </span>
                    }
                  />
                </Form.Item>
                <Row justify={"end"}>
                  <Col>
                    <p
                      className="resendOtp"
                      onClick={() => {
                        if (counter === 0) {
                          resendOtp();
                        }
                      }}
                      style={{
                        cursor: counter === 0 ? "pointer" : "not-allowed",
                      }}
                    >
                      Resend OTP <span>{(counter !== 0 && counter) || ""}</span>
                    </p>
                  </Col>
                </Row>
                <Form.Item>
                  <Row justify={"center"}>
                    <Button
                      htmlType="submit"
                      className="primary_button"
                      placeholder="Enter your mobile number"
                      prefix={
                        <span className="mobilePrefix">
                          <CallIcon style={{ width: "20px", height: "24px" }} />
                          |
                        </span>
                      }
                    >
                      VERIFY
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
