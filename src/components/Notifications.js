import React from "react";

const Notifications = props => {
  const { notifications } = props;
  return (
    <div className="notifications-box">
      <div className="card black">
        <div className="card-content">
          <span className="card-title white-text">
            <b>Notifications</b>
          </span>
          <div className="notifications-list white-text">
            {notifications &&
              notifications.map(notification => {
                return (
                  <div className="notification" key={notification.id}>
                    <p>
                      <b>Type</b>: {notification.type}
                    </p>
                    <p>
                      <b>Title</b>: {notification.title}
                    </p>
                    <p>
                      <b>Date</b>: {notification.date}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
