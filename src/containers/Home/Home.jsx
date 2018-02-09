import React from "react";
import { Container, Row, Col } from "reactstrap";

import TemplateListView from "../Templates/TemplateListView";
import OpenOrdersView from "../Orders/OpenOrdersView";

export default function Home() {
  return (
    <Container fluid={true}>
      <Row>
        <Col xs="3">
          <h5>Open orders</h5>
          <OpenOrdersView />
        </Col>
        <Col xs="9">
          <h5>Current order templates</h5>
          <TemplateListView />
        </Col>
      </Row>
    </Container>
  );
}
