import React from "react";
import ServiceSummary from "./ServiceSummary";

const ServiceList = ({ services }) => {
  return (
    <div className="entity-list container">
      {services &&
        services.map(service => {
          return <ServiceSummary service={service} key={service.id} />;
        })}
    </div>
  );
};

export default ServiceList;
