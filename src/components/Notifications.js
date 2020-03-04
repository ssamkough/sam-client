import React from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Notifications = props => {
  const { notifications } = props;
  return (
    <Card>
      <Card.Header>
        <h3>Notifications</h3>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {notifications &&
            notifications.map(notification => {
              return (
                <ListGroup.Item key={notification.id}>
                  <Card.Title>{notification.type}</Card.Title>
                  <Card.Text>
                    <span className="font-weight-bold">Title:</span>{" "}
                    {notification.title}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-weight-bold">Date:</span>{" "}
                    {notification.date}
                  </Card.Text>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Notifications;
