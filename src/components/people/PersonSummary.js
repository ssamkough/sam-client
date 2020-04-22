import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { destroyPerson } from "../../store/actions/personActions";

const PersonSummary = props => {
  const { person } = props;
  return (
    <Card className="entity-card text-center">
      <Card.Body>
        <Card.Title>
          {person.first_name} {person.last_name}
        </Card.Title>
        <Card.Text>{person.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Container fluid>
          <Row>
            <Col>
              {person.tags &&
                person.tags.map(tag => {
                  return (
                    <span person-tag={tag} key={tag.toString()}>
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
                  pathname: "/updateperson/" + person.id,
                  state: person
                }}
                variant="outline-dark"
              >
                Update
              </Button>
            </Col>
            <Col md={6}>{person.date}</Col>
            <Col md={3}>
              <Button
                onClick={() => props.destroyPerson(person)}
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
    destroyPerson: person => dispatch(destroyPerson(person))
  };
};

export default connect(null, mapDispatchToProps)(PersonSummary);
