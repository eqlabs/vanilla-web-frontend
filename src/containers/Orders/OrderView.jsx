import React from "react";
import { Container, Row, Col } from "reactstrap";

import { FullSpinner } from "../../components/Loading";
import { OrderDetailCard } from "../../components/Orders";
import { retrieveOrder, getOrderStatus } from "../../controllers/Orders";

import "./OrderView.css";

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
            <OrderDetailCard
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
