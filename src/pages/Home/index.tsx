import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Welcome to the User Crud Project</h1>
      <Link to="/users" className="btn btn-primary mt-3">View Users</Link>
      <Link to="/create-user" className="btn btn-success mt-3 ms-2">Create User</Link>
    </div>
  );
};

export default Home;
