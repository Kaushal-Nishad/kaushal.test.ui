import React, { useEffect, useState } from 'react';
import UserForm from '../../components/UserForm';
import { updateUser, getUsers } from '../../api/userService';
import { useParams } from 'react-router-dom';
import { User } from '../../types';

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [existingUser, setExistingUser] = useState<User | null>(null);

  const handleSuccess = () => {
    alert('User updated successfully!');
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        console.error('User ID is undefined');
        return;
      }

      try {
        const response = await getUsers(); 
        const user = response.data.find((user) => user._id === id); 
        setExistingUser(user || null);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!id) {
    return <div>Error: User ID is required.</div>;
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateUser(id!, formData);
      handleSuccess();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return existingUser ? (
    <UserForm 
      existingUser={existingUser} 
      onSubmit={handleSubmit} 
      onSuccess={handleSuccess} 
    />
  ) : (
    <div>Loading...</div>
  );
};

export default UpdateUser;
