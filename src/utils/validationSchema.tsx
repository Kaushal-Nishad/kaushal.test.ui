import React from 'react';
import UserForm from '../components/UserForm';
import { createUser } from '../api/userService';


const CreateUser: React.FC = () => {
  const handleSuccess = () => {
    alert('User created successfully!');
  };

  return <UserForm onSubmit={createUser} onSuccess={handleSuccess} />;
};

export default CreateUser;
