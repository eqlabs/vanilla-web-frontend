import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardHeader, CardBody } from "reactstrap";

import { FullSpinner } from "../../components/Loading";
import {
  retrieveOrder,
  getProxyWalletForOrder
} from "../../controllers/Orders";

import "./OrderView.css";

export function OrderCard({ order, proxyAddress }) {
  return (
    <Card>
      <CardHeader>Order ID: {order.orderId}</CardHeader>
      <CardBody className="order-card-order-instructions">
        {proxyAddress
          ? `Send your moneyz to ${proxyAddress}`
          : "Waiting for proxy wallet..."}
      </CardBody>
      <CardBody className="order-card-order-progress">ORDER PROGRESS</CardBody>
      <CardBody className="order-card-order-details">ORDER DETAILS</CardBody>
    </Card>
  );
}

export default class OrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: null, loading: true, proxyAddress: null };
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

  render() {
    const { loading, order, proxyAddress } = this.state;

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
            <OrderCard order={order} proxyAddress={proxyAddress} />
          </Col>
        </Row>
      </Container>
    );
  }
}
