import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { destroyProject } from "./../../store/actions/projectActions";

const ProjectSummary = props => {
  const { project } = props;
  return (
    <Card className="entity-card text-center">
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>{project.snippet}</Card.Text>
        <Button as={Link} to={"/projects/" + project.path} variant="primary">
          View Details
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Container fluid>
          <Row>
            <Col>
              {project.tags &&
                project.tags.map(tag => {
                  return (
                    <span project-tag={tag} key={tag.toString()}>
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
                  pathname: "/updateproject/" + project.path,
                  state: project
                }}
                variant="outline-dark"
              >
                Update
              </Button>
            </Col>
            <Col md={6}>{project.date}</Col>
            <Col md={3}>
              <Button
                onClick={() => props.destroyProject(project)}
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
    destroyProject: project => dispatch(destroyProject(project))
  };
};

export default connect(null, mapDispatchToProps)(ProjectSummary);
