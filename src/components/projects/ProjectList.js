import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProjectSummary from "./ProjectSummary";

const ProjectList = ({ projects }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Projects</h3>
        </Col>
      </Row>
      {projects &&
        projects.map(project => {
          return (
            <Row>
              <Col>
                <ProjectSummary project={project} key={project.id} /> <br />{" "}
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default ProjectList;
