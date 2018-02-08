import React from "react";
import { Container, Row, Col } from "reactstrap";

import TemplateListView from "../Templates/TemplateListView";

export default function Home() {
  return (
    <Container fluid={true}>
      <Row>
        <Col>
          <TemplateListView />
        </Col>
      </Row>
    </Container>
  );
}
