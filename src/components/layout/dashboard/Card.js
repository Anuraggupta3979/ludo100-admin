import React from "react";
import { Col } from "antd";
function Card({ name, amount }) {
  return (
    <Col xs={24} sm={12} lg={6}>
      <div className="dashboardCard">
        <p className="heading">{name}</p>
        <p className="amount">{amount}</p>
      </div>
    </Col>
  );
}

export default Card;
