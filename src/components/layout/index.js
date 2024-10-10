import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  DashboardOutlined,
  HistoryOutlined,
  TeamOutlined,
  TrophyOutlined,
  TransactionOutlined,
  ContactsFilled,
  NotificationFilled,
  LogoutOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Row, Col, Drawer } from "antd";
import Logo from "../../Assets/logo.webp";
import { useNavigate } from "react-router-dom";
import { IsTokenValid } from "../../utils/middleware";
import sider from "../../Assets/sidebar.png";
import UpArrow from "../../Assets/upArrow.svg";
import ArrowIcon from "../../Assets/arrow.svg";
const { Header, Sider, Content } = Layout;
const CustomLayout = ({ permissions, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userMangerMenu, setUserManagerMenu] = useState(false);
  const [challangeManagerMenu, SetChallangeManagerMenu] = useState(false);
  const [transactionManagerMenu, setTransactionManagerMenu] = useState(false);
  const [reportsMenu, setReportsMenu] = useState(false);
  const [adminManagerMenu, setAdminManagerMenu] = useState(false);
  const [items, setItems] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();

    localStorage.clear("hashcode");
    navigate("/login");
  };
  // let isValid = false;
  const IsValidT = IsTokenValid();
  useEffect(() => {
    setIsValid(IsValidT);
  }, [IsValidT]);
  useEffect(() => {
    let tempItems = [];

    if (permissions?.dashboard) {
      tempItems = [
        ...tempItems,
        {
          key: "1",
          icon: <DashboardOutlined />,
          label: (
            <p
              className="menu_link"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </p>
          ),
        },
      ];
    }
    if (permissions?.admin_earnings) {
      tempItems = [
        ...tempItems,
        {
          key: "2",
          icon: <TrophyOutlined />,
          label: (
            <p
              className="menu_link"
              onClick={() => {
                navigate("/earnings");
              }}
            >
              Admin Earnings
            </p>
          ),
        },
      ];
    }
    if (permissions?.all_admin || permissions?.add_new_admin) {
      tempItems = [
        ...tempItems,
        {
          key: "3",
          icon: <UserOutlined />,
          label: "Admin Manager",
          children: [
            {
              key: "All Admin",
              label: (
                <p
                  className="menu_link"
                  onClick={() => {
                    navigate("/admin-all");
                  }}
                >
                  All Admin
                </p>
              ),
            },
            {
              key: "Add New Admin",
              label: (
                <p
                  className="menu_link"
                  onClick={() => {
                    navigate("/admin-register");
                  }}
                >
                  Add new Admin
                </p>
              ),
            },
          ],
        },
      ];
    }
    if (
      permissions?.all_users ||
      permissions?.blocked_users ||
      permissions?.pending_kyc ||
      permissions?.reject_kyc ||
      permissions?.verified_kyc ||
      permissions?.site_setting
    ) {
      let tempData = {
        key: "4",
        icon: <TeamOutlined />,
        label: "User Manager",
      };
      let tempChildren = [];
      if (permissions?.all_users) {
        tempChildren = [
          ...tempChildren,
          {
            key: "All Users",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/user-all");
                }}
              >
                All users
              </p>
            ),
          },
        ];
      }
      if (permissions?.all_users) {
        tempChildren = [
          ...tempChildren,
          {
            key: "All Mismatch Users",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/user-mismatch-all");
                }}
              >
                All MissMatch Users
              </p>
            ),
          },
        ];
      }
      if (permissions?.all_users) {
        tempChildren = [
          ...tempChildren,
          {
            key: "All Negative Hold Users",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/user-negative-hold-all");
                }}
              >
                All Negative Hold Users
              </p>
            ),
          },
        ];
      }

      if (permissions?.pending_kyc) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Pending KYC",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/pending-kyc");
                }}
              >
                Pending KYC
              </p>
            ),
          },
        ];
      }
      if (permissions?.reject_kyc) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Reject KYC",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/reject-kyc");
                }}
              >
                Reject KYC
              </p>
            ),
          },
        ];
      }
      if (permissions?.verified_kyc) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Verified KYC",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/verified-kyc");
                }}
              >
                Verified KYC
              </p>
            ),
          },
        ];
      }

      if (permissions?.blocked_users) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Blocked Users",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/blocked-users");
                }}
              >
                Blocked Users
              </p>
            ),
          },
        ];
      }

      tempData["children"] = tempChildren;
      tempItems = [...tempItems, tempData];
    }

    if (
      permissions?.all_games ||
      permissions?.new_games ||
      permissions?.cancelled_games ||
      permissions?.completed_games ||
      permissions?.drop_games ||
      permissions?.running_games ||
      permissions?.conflict_games
    ) {
      let tempData = {
        key: "5",
        icon: <HistoryOutlined />,
        label: "Challenge Manager",
      };
      let tempChildren = [];
      if (permissions?.all_games) {
        tempChildren = [
          ...tempChildren,
          {
            key: "All Challenge",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/all-challenges");
                }}
              >
                All
              </p>
            ),
          },
        ];
      }
      if (permissions?.completed_games) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Completed Challenge",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/completed-challenges");
                }}
              >
                Completed
              </p>
            ),
          },
        ];
      }
      if (permissions?.conflict_games) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Conflict Challenge",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/conflict-challenges");
                }}
              >
                Conflict
              </p>
            ),
          },
        ];
      }
      if (permissions?.cancelled_games) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Cancelled Challenge",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/cancelled-challenges");
                }}
              >
                Cancelled
              </p>
            ),
          },
        ];
      }
      if (permissions?.running_games) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Running Challenge",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/running-challenges");
                }}
              >
                Running
              </p>
            ),
          },
        ];
      }
      if (permissions?.new_games) {
        tempChildren = [
          ...tempChildren,
          {
            key: "New Challenge",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/new-challenges");
                }}
              >
                New
              </p>
            ),
          },
        ];
      }
      if (permissions?.drop_games) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Drop Challenge",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/drop-challenges");
                }}
              >
                Drop
              </p>
            ),
          },
        ];
      }
      if (permissions?.conflict_games) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Check Challenge",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/check-challenge");
                }}
              >
                Check Challenge
              </p>
            ),
          },
        ];
      }
      tempData["children"] = tempChildren;
      tempItems = [...tempItems, tempData];
    }
    if (
      permissions?.panelty_and_bonus ||
      permissions?.deposit_history ||
      permissions?.bonus_history ||
      permissions?.withdrawal_history ||
      permissions?.withdrawal_request
    ) {
      let tempData = {
        key: "6",
        icon: <TransactionOutlined />,
        label: "Transaction Manager",
      };
      let tempChildren = [];
      if (permissions?.panelty_and_bonus) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Penalty And Bonus",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/penalty-bonus");
                }}
              >
                Penalty And Bonus
              </p>
            ),
          },
        ];
      }
      if (permissions?.deposit_history) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Deposit History",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/deposit-history");
                }}
              >
                Deposit History
              </p>
            ),
          },
        ];
      }
      if (permissions?.deposit_history) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Redeem History",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/redeem-history");
                }}
              >
                Redeem History
              </p>
            ),
          },
        ];
      }
      if (permissions?.bonus_history) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Bonus History",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/bonus-history");
                }}
              >
                Bonus History
              </p>
            ),
          },
        ];
      }
      if (permissions?.withdrawal_history) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Withdrawal History",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/withdrawal-history");
                }}
              >
                Withdrawal History
              </p>
            ),
          },
        ];
      }
      if (permissions?.withdrawal_request) {
        tempChildren = [
          ...tempChildren,
          {
            key: "View All Withdrawal History",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("withdrawal-request");
                }}
              >
                Withdrawal Request
              </p>
            ),
          },
        ];
      }
      tempData["children"] = tempChildren;
      tempItems = [...tempItems, tempData];
    }
    if (
      permissions?.deposit_report ||
      permissions?.bonus_report ||
      permissions?.penalty_report ||
      permissions?.withdrawal_report
    ) {
      let tempData = {
        key: "7",
        icon: <UploadOutlined />,
        label: "Reports",
      };
      let tempChildren = [];
      if (permissions?.deposit_report) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Deposit Report",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/report-deposit");
                }}
              >
                Deposit
              </p>
            ),
          },
        ];
      }
      if (permissions?.bonus_report) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Bonus Report",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/report-bonus");
                }}
              >
                Bonus
              </p>
            ),
          },
        ];
      }
      if (permissions?.penalty_report) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Penalty Reports",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/report-penalty");
                }}
              >
                Penalty
              </p>
            ),
          },
        ];
      }
      if (permissions?.withdrawal_report) {
        tempChildren = [
          ...tempChildren,
          {
            key: "Withdrawal Reports",
            label: (
              <p
                className="menu_link"
                onClick={() => {
                  navigate("/report-withdraw");
                }}
              >
                Withdrawal
              </p>
            ),
          },
        ];
      }

      tempData["children"] = tempChildren;
      tempItems = [...tempItems, tempData];
    }
    if (permissions?.contact) {
      tempItems = [
        ...tempItems,
        {
          key: "8",
          icon: <ContactsFilled />,
          label: (
            <p
              className="menu_link"
              onClick={() => {
                navigate("/contacts");
              }}
            >
              Contacts
            </p>
          ),
        },
      ];
    }
    if (permissions?.notification) {
      tempItems = [
        ...tempItems,

        {
          key: "9",
          icon: <NotificationFilled />,
          label: (
            <p
              className="menu_link"
              onClick={() => {
                navigate("/notification");
              }}
            >
              Notification
            </p>
          ),
        },
      ];
    }
    if (permissions?.site_setting) {
      tempItems = [
        ...tempItems,
        {
          key: "site_settings",
          icon: <SettingFilled />,

          label: (
            <p
              className="menu_link"
              onClick={() => {
                navigate("/site-setting");
              }}
            >
              Site Setting
            </p>
          ),
        },
      ];
    }
    tempItems = [
      ...tempItems,

      {
        key: "10",
        icon: <LogoutOutlined />,
        label: <span onClick={() => handleLogout()}>Logout</span>,
      },
    ];

    setItems([...tempItems]);
  }, [permissions]);

  return (
    <>
      <Layout className="customLayout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Row justify={"center"}>
            <img src={Logo} alt="logo" className="logo" />
          </Row>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <div className="mobileLayout">
        <div className="header_main_container">
          <div className="headerContent">
            <Row justify={"space-between"} align={"middle"}>
              <Col>
                <img src={Logo} height={77} alt="logo" />
              </Col>
              <Col>
                <Row align={"middle"} gutter={10}>
                  {!isValid && (
                    <Col>
                      <Button
                        className="primary_button"
                        onClick={() => navigate("/login")}
                      >
                        LOGIN
                      </Button>
                    </Col>
                  )}

                  {/* <Col>
                
              </Col> */}
                  {isValid && (
                    <Col>
                      <img
                        src={sider}
                        alt="more"
                        className="moreIcon"
                        styles={{ width: "30px", height: "20px" }}
                        onClick={() => setOpenDrawer(true)}
                      />
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <div className="mobileContentContainer">{children}</div>
        <Drawer
          title="Ludo 100"
          placement="right"
          // closable={false}
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          className="navigationDrawer"
        >
          {permissions?.dashboard && (
            <p
              className="mobileMenuLink"
              onClick={() => {
                navigate("/dashboard");
                setOpenDrawer(false);
              }}
            >
              Dashboard
            </p>
          )}
          {permissions?.admin_earnings && (
            <p
              className="mobileMenuLink"
              onClick={() => {
                navigate("/earnings");
                setOpenDrawer(false);
              }}
            >
              Admin Earnings
            </p>
          )}

          {(permissions?.all_admin || permissions?.add_new_admin) && (
            <p
              className="mobileMenuLink"
              onClick={() => setAdminManagerMenu(!adminManagerMenu)}
            >
              <Row align={"middle"} gutter={8}>
                <Col className="menuRowLink">Admin Manager</Col>
                <Col>
                  <img
                    src={adminManagerMenu ? UpArrow : ArrowIcon}
                    alt="arrow"
                  />
                </Col>
              </Row>
            </p>
          )}

          {adminManagerMenu && (
            <div className="subMenuContainer">
              {permissions?.all_admin && (
                <h3
                  onClick={() => {
                    navigate("/admin-all");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  All Admin
                </h3>
              )}

              {permissions?.add_new_admin && (
                <h3
                  onClick={() => {
                    navigate("/admin-register");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Add New Admin
                </h3>
              )}
            </div>
          )}
          {(permissions?.all_users ||
            permissions?.blocked_users ||
            permissions?.pending_kyc ||
            permissions?.reject_kyc ||
            permissions?.verified_kyc ||
            permissions?.site_setting) && (
            <p
              className="mobileMenuLink"
              onClick={() => setUserManagerMenu(!userMangerMenu)}
            >
              <Row align={"middle"} gutter={8}>
                <Col className="menuRowLink">User Manager</Col>
                <Col>
                  <img src={userMangerMenu ? UpArrow : ArrowIcon} alt="arrow" />
                </Col>
              </Row>
            </p>
          )}

          {userMangerMenu && (
            <div className="subMenuContainer">
              {permissions?.all_users && (
                <h3
                  onClick={() => {
                    navigate("/user-all");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  All Users
                </h3>
              )}
              {permissions?.all_users && (
                <h3
                  onClick={() => {
                    navigate("/user-mismatch-all");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  All Mismatch Users
                </h3>
              )}
              {permissions?.all_users && (
                <h3
                  onClick={() => {
                    navigate("/user-negative-hold-all");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  All Negative Hold Users
                </h3>
              )}
              {permissions?.blocked_users && (
                <h3
                  onClick={() => {
                    navigate("/blocked-users");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Blocked Users
                </h3>
              )}
              {permissions?.pending_kyc && (
                <h3
                  onClick={() => {
                    navigate("/pending-kyc");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Pending KYC
                </h3>
              )}
              {permissions?.reject_kyc && (
                <h3
                  onClick={() => {
                    navigate("/reject-kyc");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Reject KYC
                </h3>
              )}
              {permissions?.verified_kyc && (
                <h3
                  onClick={() => {
                    navigate("/verified-kyc");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Verified KYC
                </h3>
              )}
            </div>
          )}
          {(permissions?.all_games ||
            permissions?.new_games ||
            permissions?.cancelled_games ||
            permissions?.completed_games ||
            permissions?.running_games ||
            permissions?.drop_games ||
            permissions?.conflict_games) && (
            <p
              className="mobileMenuLink"
              onClick={() => SetChallangeManagerMenu(!challangeManagerMenu)}
            >
              <Row align={"middle"} gutter={8}>
                <Col className="menuRowLink">Challenge Manager</Col>
                <Col>
                  <img
                    src={challangeManagerMenu ? UpArrow : ArrowIcon}
                    alt="arrow"
                  />
                </Col>
              </Row>
            </p>
          )}

          {challangeManagerMenu && (
            <div className="subMenuContainer">
              {permissions?.all_games && (
                <h3
                  onClick={() => {
                    navigate("/all-challenges");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  All
                </h3>
              )}
              {permissions?.completed_games && (
                <h3
                  onClick={() => {
                    navigate("/completed-challenges");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Completed Challenge
                </h3>
              )}
              {permissions?.conflict_games && (
                <h3
                  onClick={() => {
                    navigate("/conflict-challenges");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Conflict Challenge
                </h3>
              )}
              {permissions?.cancelled_games && (
                <h3
                  onClick={() => {
                    navigate("/cancelled-challenges");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Cancelled Challenge
                </h3>
              )}
              {permissions?.running_games && (
                <h3
                  onClick={() => {
                    navigate("/running-challenges");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Running Challenge
                </h3>
              )}
              {permissions?.new_games && (
                <h3
                  onClick={() => {
                    navigate("/new-challenges");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  New Challenge
                </h3>
              )}
              {permissions?.drop_games && (
                <h3
                  onClick={() => {
                    navigate("/drop-challenges");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Drop Challenge
                </h3>
              )}{" "}
              {permissions?.conflict_games && (
                <h3
                  onClick={() => {
                    navigate("/check-challenge");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Check Challenge
                </h3>
              )}
            </div>
          )}
          {(permissions?.panelty_and_bonus ||
            permissions?.deposit_history ||
            permissions?.bonus_history ||
            permissions?.withdrawal_history ||
            permissions?.withdrawal_request) && (
            <p
              className="mobileMenuLink"
              onClick={() => setTransactionManagerMenu(!transactionManagerMenu)}
            >
              <Row align={"middle"} gutter={8}>
                <Col className="menuRowLink">Transaction Manager</Col>
                <Col>
                  <img
                    src={transactionManagerMenu ? UpArrow : ArrowIcon}
                    alt="arrow"
                  />
                </Col>
              </Row>
            </p>
          )}

          {transactionManagerMenu && (
            <div className="subMenuContainer">
              {permissions?.panelty_and_bonus && (
                <h3
                  onClick={() => {
                    navigate("/penalty-bonus");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Penalty & Bonus
                </h3>
              )}

              {permissions?.deposit_history && (
                <h3
                  onClick={() => {
                    navigate("/deposit-history");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Deposit History
                </h3>
              )}
              {permissions?.deposit_history && (
                <h3
                  onClick={() => {
                    navigate("/redeem-history");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Redeem History
                </h3>
              )}
              {permissions?.bonus_history && (
                <h3
                  onClick={() => {
                    navigate("/bonus-history");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Bonus History
                </h3>
              )}

              {permissions?.withdrawal_history && (
                <h3
                  onClick={() => {
                    navigate("/withdrawal-history");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Withdrawal History
                </h3>
              )}
              {permissions?.withdrawal_request && (
                <h3
                  onClick={() => {
                    navigate("/withdrawal-request");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Withdrawal Request
                </h3>
              )}
            </div>
          )}
          {(permissions?.deposit_report ||
            permissions?.bonus_report ||
            permissions?.penalty_report ||
            permissions?.withdrawal_report) && (
            <p
              className="mobileMenuLink"
              onClick={() => setReportsMenu(!reportsMenu)}
            >
              <Row align={"middle"} gutter={8}>
                <Col className="menuRowLink">Reports</Col>
                <Col>
                  <img src={reportsMenu ? UpArrow : ArrowIcon} alt="arrow" />
                </Col>
              </Row>
            </p>
          )}

          {reportsMenu && (
            <div className="subMenuContainer">
              {permissions?.deposit_report && (
                <h3
                  onClick={() => {
                    navigate("/report-deposit");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Deposit
                </h3>
              )}
              {permissions?.bonus_report && (
                <h3
                  onClick={() => {
                    navigate("/report-bonus");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Bonus
                </h3>
              )}

              {permissions?.penalty_report && (
                <h3
                  onClick={() => {
                    navigate("/report-penalty");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Penalty
                </h3>
              )}
              {permissions?.withdrawal_report && (
                <h3
                  onClick={() => {
                    navigate("/report-withdraw");
                    setOpenDrawer(false);
                  }}
                  className="subLink"
                >
                  Withdrawal
                </h3>
              )}
            </div>
          )}
          {permissions?.contact && (
            <p
              className="mobileMenuLink"
              onClick={() => {
                navigate("/contacts");
                setOpenDrawer(false);
              }}
            >
              Contacts
            </p>
          )}
          {permissions?.notification && (
            <p
              className="mobileMenuLink"
              onClick={() => {
                navigate("/notification");
                setOpenDrawer(false);
              }}
            >
              Notification
            </p>
          )}
          {permissions?.site_setting && (
            <p
              onClick={() => {
                navigate("/site-setting");
                setOpenDrawer(false);
              }}
              className="mobileMenuLink"
            >
              Site Settings
            </p>
          )}
          <p
            className="mobileMenuLink logoutLink"
            onClick={() => {
              setOpenDrawer(false);
              handleLogout();
            }}
          >
            Logout
          </p>
        </Drawer>
      </div>
    </>
  );
};
export default CustomLayout;
