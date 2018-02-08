import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardHeader, CardBody } from "reactstrap";

import { _ } from "../../components/Localize";
import { FullSpinner } from "../../components/Loading";
import {
  retrieveOrder,
  getOrderStatus,
  getProxyWalletForOrder
} from "../../controllers/Orders";

import "./OrderView.css";

export function OrderCard({ order, orderStatus, proxyAddress }) {
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

export default class OrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      loading: true,
      proxyAddress: null,
      intervalId: null
    };
  }

  componentWillMount() {
    retrieveOrder(this.props.match.params.orderId).then(order => {
      this.setState({
        order,
        loading: false
      });
    });

    getProxyWalletForOrder(this.props.match.params.orderId).then(
      proxyAddress => {
        this.setState({ proxyAddress });
      }
    );
  }

  componentDidMount() {
    const intervalId = setInterval(this.timer.bind(this), 1000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer() {
    const { order } = this.state;
    getOrderStatus(order.orderId).then(orderStatus =>
      this.setState({ orderStatus })
    );
  }

  render() {
    const { loading, order, orderStatus, proxyAddress } = this.state;

    if (loading) return <FullSpinner />;

    if (!order)
      return (
        <Container fluid={true}>
          <Row>
            <Col>
              <p>Order with id {this.props.match.params.orderId} not found.</p>
            </Col>
          </Row>
        </Container>
      );

    return (
      <Container fluid={false}>
        <Row>
          <Col>
            <OrderCard
              order={order}
              proxyAddress={proxyAddress}
              orderStatus={orderStatus}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
