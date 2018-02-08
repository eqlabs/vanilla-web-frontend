import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardHeader, CardBody } from "reactstrap";

import { FullSpinner } from "../../components/Loading";
import { retrieveOrder } from "../../controllers/Orders";

import "./OrderView.css";

export function OrderCard({ order }) {
  return (
    <Card>
      <CardHeader>Order ID: {order.orderId}</CardHeader>
      <CardBody className="order-card-order-instructions">
        INSTRUCTIONS TO SEND ETH
      </CardBody>
      <CardBody className="order-card-order-progress">ORDER PROGRESS</CardBody>
      <CardBody className="order-card-order-details">ORDER DETAILS</CardBody>
    </Card>
  );
}

export default class OrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: null, loading: true };
  }

  async componentWillMount() {
    this.setState({
      order: await retrieveOrder(this.props.match.params.orderId),
      loading: false
    });
  }

  render() {
    const { loading, order } = this.state;

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
            <OrderCard order={order} />
          </Col>
        </Row>
      </Container>
    );
  }
}
