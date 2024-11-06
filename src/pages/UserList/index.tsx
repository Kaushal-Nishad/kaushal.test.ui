import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../api/userService';
import { User } from '../../types';
import { Link } from 'react-router-dom';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Description</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td><img src={`http://localhost:3033/uploads/${user.avatar}`} alt='user image' width={70} height={70}/></td>
              <td>{user.name}</td>
              <td>{user.description}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/user/edit/${user._id}`} className="btn btn-warning btn-sm">
                  Edit
                </Link>
                <button onClick={() => user._id && handleDelete(user._id)} className="btn btn-danger btn-sm ms-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
