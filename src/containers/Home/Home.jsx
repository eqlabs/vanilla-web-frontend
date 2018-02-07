import React from "react";
import { Container, Row, Col } from "reactstrap";

import { TemplateListView } from "../Templates";

import "./Home.css";

export function Home() {
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
