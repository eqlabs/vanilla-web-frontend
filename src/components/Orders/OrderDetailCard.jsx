import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import { _ } from "../../components/Localize";

export function OrderDetailCard({ order, orderStatus, proxyAddress }) {
  return (
    <Card>
      <CardHeader>Order ID: {order.orderId}</CardHeader>
      <CardBody className="order-card-order-instructions">
        {proxyAddress
          ? `Send your moneyz to ${proxyAddress}`
          : "Waiting for proxy wallet..."}
      </CardBody>
      <CardBody className="order-card-order-progress">
        Progress: <br />
        {orderStatus}
      </CardBody>
      <CardBody className="order-card-order-details">
        <h4>Order Details</h4>
        <p>
          {new Date(order.dateCreated).toString()} <br />
          {_(order.currencyPair)} <br />
          {_(order.leverage)} <br />
          {_(order.duration)} <br />
          {_(order.longshort)}
        </p>
      </CardBody>
    </Card>
  );
}
