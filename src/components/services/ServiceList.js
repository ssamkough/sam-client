import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ServiceSummary from "./ServiceSummary";

const ServiceList = ({ services }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Services</h3>
        </Col>
      </Row>
      {services &&
        services.map(service => {
          return (
            <Row key={service.path}>
              <Col key={service.path}>
                <ServiceSummary key={service.path} service={service} /> <br />{" "}
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default ServiceList;
