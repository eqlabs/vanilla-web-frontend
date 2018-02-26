import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

import { _ } from "../Localize";

export function OrderListItem(order) {
  return (
    <ListGroupItem key={order.orderId}>
      <Link to={`/orders/${order.orderId}`}>{order.orderId}</Link>
      <br />
      {_(order.longshort)} {_(order.currencyPair)} {_(order.leverage)}{" "}
      {_(order.duration)}
    </ListGroupItem>
  );
}

export function OrderList({ orders }) {
  return <ListGroup children={orders.map(OrderListItem)} />;
}
