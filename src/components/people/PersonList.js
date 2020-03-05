import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PersonSummary from "./PersonSummary";

const PersonList = ({ people }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>People</h3>
        </Col>
      </Row>
      {people &&
        people.map(person => {
          return (
            <Row key={person.id}>
              <Col key={person.id}>
                <PersonSummary key={person.id} person={person} /> <br />{" "}
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default PersonList;
