import React from "react";
import ReactDOM from "react-dom/client";
import { UserCard } from "./UserCard";

<p style={{ color: 'burlywood' }}>
Author: Aryan Rao <br />
ISU Netid : aryanrao@iastate.edu <br />
Date : MARCH 25TH, 2023
</p>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <UserCard
      name="Elton John"
      amount={3000}
      married={true}
      points={[100, 101.1, 202, 2]}
      address={{ street: "123 Bellmont Rd.", city: "Ames",state: "Iowa" }}
    />
    <UserCard
      name="John Travolta"
      amount={3500}
      married={false}
      points={[1, 2, 3, 4]}
      address={{ street: "5010 Av Some", city: "Tempe", state: "AZ" }}
    />
  </div>
);