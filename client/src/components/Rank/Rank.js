import React from 'react';

const Rank = ({ user }) => {
  console.log('user', user);
  return (
    <div>
      <div className="white f3">{`${user.name}, your current rank is ...`}</div>
      <div className="white f1">{`#${user.entries}`}</div>
    </div>
  );
};

export default Rank;
