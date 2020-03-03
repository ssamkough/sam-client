import React from "react";
import PersonSummary from "./PersonSummary";

const PersonList = ({ people }) => {
  return (
    <div className="entity-list container">
      {people &&
        people.map(person => {
          return <PersonSummary person={person} key={person.id} />;
        })}
    </div>
  );
};

export default PersonList;
