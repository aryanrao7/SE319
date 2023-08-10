import React from 'react';

<p style={{ color: 'burlywood' }}>
Author: Aryan Rao <br />
ISU Netid : aryanrao@iastate.edu <br />
Date : MARCH 25TH, 2023
</p>

const UserCard = ({ name, amount, married, points, address }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Amount:💲{amount} </p>
      <p>Married: {married ? 'Yes' : 'No'}</p>
      <p>Points: {points.join(', ')}</p>
      <p>
        Address: {address.street}, {address.city}, {address.state}
      </p>
      
    </div>
  );
};

export { UserCard };