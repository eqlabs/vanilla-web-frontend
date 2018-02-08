import React from "react";
import { Container, Row, Col } from "reactstrap";

import { FullSpinner } from "../../components/Loading";
import { retrieveOrder } from "../../controllers/Orders";

export class OrderView extends React.Component {
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
      <Container fluid={true}>
        <Row>
          <Col>ORDER #{order.orderId}</Col>
        </Row>
      </Container>
    );
  }
}
