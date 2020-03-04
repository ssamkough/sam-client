import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { destroyService } from "./../../store/actions/serviceActions";

const ServiceSummary = props => {
  const { service } = props;
  return (
    <Card className="entity-card text-center">
      <Card.Body>
        <Card.Title>{service.title}</Card.Title>
        <Card.Text>{service.snippet}</Card.Text>
        <Button as={Link} to={"/services/" + service.path} variant="primary">
          View Details
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Container fluid>
          <Row>
            <Col>
              {service.tags &&
                service.tags.map(tag => {
                  return (
                    <span service-tag={tag} key={tag.toString()}>
                      {tag}{" "}
                    </span>
                  );
                })}
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Button
                as={Link}
                to={{
                  pathname: "/updateservice/" + service.path,
                  state: service
                }}
                variant="outline-dark"
              >
                Update
              </Button>
            </Col>
            <Col md={6}>{service.date}</Col>
            <Col md={3}>
              <Button
                onClick={() => props.destroyService(service)}
                variant="outline-dark"
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    destroyService: service => dispatch(destroyService(service))
  };
};

export default connect(null, mapDispatchToProps)(ServiceSummary);
