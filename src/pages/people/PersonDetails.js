import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PersonDetails = props => {
  const { person, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (person) {
    return (
      <Container>
        <br />
        <Row className="justify-content-center">
          <Col md={8}>
            <h3>{person.title}</h3>
            <div>{person.content}</div>
            <hr />
            <div>
              {person.tags &&
                person.tags.map(tag => {
                  return (
                    <span person-tag={tag} key={tag.toString()}>
                      {tag}{" "}
                    </span>
                  );
                })}
            </div>
            <div>{person.date}</div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <p>Loading person...</p>
          </Col>
        </Row>
      </Container>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path;
  const people = state.firestore.data.people;
  const person = people ? people[path] : null;
  return {
    person: person,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "people" }])
)(PersonDetails);
